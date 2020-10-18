import { ApolloError } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';
import { CanvasV2Error, Optional } from '../../types';
import { StatusCodes } from '../http-status-codes';
import { UserModel } from '../domain';
import { authorizeUser } from '../service/users-service';
import { constants } from '../secrets';
import { getAuthorizationCookie, getRefreshCookie, setTokenCookies } from '../cookie';

export async function context(ctx: { req: NextApiRequest; res: NextApiResponse }) {
  const authorization = getAuthorizationCookie(ctx.req) || ctx.req.headers.authorization;
  const refresh = getRefreshCookie(ctx.req) || ctx.req.headers.refresh;

  let user: UserModel | null = null;

  if (authorization && authorization !== '') {
    const authorized = await authorizeUser(authorization, refresh as Optional<string>);
    Object.defineProperty(ctx.req, 'user', {
      get() {
        return user;
      },
    });

    user = authorized.user;

    setTokenCookies(ctx.res, authorized.authorization, authorized.refresh || '');
  }

  return {
    ...ctx,
    rid: v4(),
    user,
  };
}

export function formatError(err: ApolloError) {
  if (constants().development) delete err.extensions?.exception?.stacktrace;

  if (err.originalError instanceof CanvasV2Error) {
    return new ApolloError(err.originalError.message, err.originalError.status.toString(), {
      errors: err.originalError.errors,
      trace: err.extensions?.exception?.stacktrace,
    });
  }
  if (err.message === 'Argument Validation Error') {
    const errors: { [id: string]: string } = {};

    err.extensions?.exception?.validationErrors?.forEach(
      ({ property, constraints }: { property?: string; constraints?: { isEmail?: string } }) => {
        if (property && constraints) {
          let message = '';
          if (constraints.isEmail) {
            message = `${constraints.isEmail.charAt(0).toUpperCase()}${constraints.isEmail.slice(
              1
            )}.`;
          }
          errors[property] = message;
        }
      }
    );

    // eslint-disable-next-line no-param-reassign
    if (err.extensions) err.extensions.errors = errors;
    delete err.extensions?.exception;
  }

  // eslint-disable-next-line no-param-reassign
  if (err.extensions) err.extensions.code = StatusCodes.INTERNAL_SERVER_ERROR.toString();

  return err;
}
