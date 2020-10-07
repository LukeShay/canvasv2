import { genSaltSync, hash, compare } from 'bcryptjs';
import { v4 } from 'uuid';
import Iron from '@hapi/iron';
import { IUser, Optional, UserRole, JWTPayload, CanvasV2Error, OptionalPromise } from '../../types';
import { UserModel } from '../domain';
import { StatusCodes } from '../http-status-codes';
import { constants } from '../secrets';

const SALT = genSaltSync();

function b64Encode(str: string): string {
  return Buffer.from(str, 'utf-8').toString('base64');
}

async function encodeAndEncrypt(password: string) {
  try {
    return await hash(b64Encode(password), SALT);
  } catch (error) {
    console.error(error);
    console.error(error.message);
    throw new CanvasV2Error({
      message: 'An unexpected error occured.',
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

async function doEncryptedStringsMatch(unencrypted: string, encrypted: string) {
  try {
    return await compare(b64Encode(unencrypted), encrypted);
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }

  return false;
}

function generateJwtPayload(user: IUser, type: 'AUTHORIZATION' | 'REFRESH'): JWTPayload {
  return {
    email: user.email,
    sessionId: v4(),
    type,
    userId: user.id,
    createdAt: Date.now(),
    expiresIn: parseInt(
      type === 'AUTHORIZATION' ? constants().authorizationExpiresIn : constants().refreshExpiresIn,
      10
    ),
  };
}

function generateToken(user: IUser, type: 'AUTHORIZATION' | 'REFRESH') {
  const payload = generateJwtPayload(user, type);
  return Iron.seal(
    payload,
    type === 'AUTHORIZATION' ? constants().authorizationSecret : constants().refreshSecret,
    Iron.defaults
  );
}

function generateAuthorizationToken(user: IUser) {
  return generateToken(user, 'AUTHORIZATION');
}

function generateRefreshToken(user: IUser) {
  return generateToken(user, 'REFRESH');
}

function getPayload(token: string, type: 'AUTHORIZATION' | 'REFRESH') {
  return Iron.unseal(
    token,
    type === 'AUTHORIZATION' ? constants().authorizationSecret : constants().refreshSecret,
    Iron.defaults
  );
}

function getAuthorizationJwtPayloadIgnoreExpiration(token: string) {
  return getPayload(token.replace('Bearer ', ''), 'AUTHORIZATION') as OptionalPromise<JWTPayload>;
}

async function getAuthorizationJwtPayload(token: string) {
  const payload = await getAuthorizationJwtPayloadIgnoreExpiration(token);
  return payload && Date.now() >= payload.createdAt + payload.expiresIn ? payload : null;
}

function getRefreshJwtPayload(token: string) {
  return getPayload(token, 'REFRESH') as OptionalPromise<JWTPayload>;
}

function payloadIsValid(payload: JWTPayload) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return payload.email && payload.sessionId && payload.type && payload.userId;
}

function authorizationPayloadIsValid(payload: JWTPayload) {
  return payload.type === 'AUTHORIZATION' && payloadIsValid(payload);
}

function refreshPayloadIsValid(payload: JWTPayload) {
  return payload.type === 'REFRESH' && payloadIsValid(payload);
}

export async function authorizeUser(authorization: string, refresh: Optional<string>) {
  const returned: {
    user: UserModel | null;
    authorization: string;
    refresh: Optional<string>;
  } = {
    user: null,
    authorization,
    refresh,
  };

  try {
    const authorizationPayload = await getAuthorizationJwtPayload(authorization);
    const expiredAuthorizationPayload = await getAuthorizationJwtPayloadIgnoreExpiration(
      authorization
    );
    const refreshPayload = refresh ? await getRefreshJwtPayload(refresh) : null;

    if (authorizationPayload && authorizationPayloadIsValid(authorizationPayload)) {
      returned.user = await UserModel.query()
        .findOne('id', authorizationPayload.userId)
        .where('email', authorizationPayload.email);
    } else if (
      refreshPayload &&
      refreshPayloadIsValid(refreshPayload) &&
      expiredAuthorizationPayload &&
      authorizationPayloadIsValid(expiredAuthorizationPayload)
    ) {
      returned.user = await UserModel.query()
        .findOne('id', expiredAuthorizationPayload.userId)
        .where('email', expiredAuthorizationPayload.email);
      returned.authorization = await generateAuthorizationToken(returned.user);
    }
    // eslint-disable-next-line no-empty
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }

  return returned;
}

export async function signInUser(email: string, password: string, remember: boolean) {
  try {
    const user = await UserModel.query().findOne('email', email);

    if (!user || !(await doEncryptedStringsMatch(password, user.password))) {
      throw new CanvasV2Error({
        message: 'Your email or password is incorrect.',
        status: StatusCodes.BAD_REQUEST,
      });
    }

    const authorization = `Bearer ${await generateAuthorizationToken(user)}`;
    const refresh = remember ? `Bearer ${await generateRefreshToken(user)}` : undefined;

    return { authorization, refresh, user };
  } catch (error) {
    console.error(error);
    console.error(error.message);
  }

  return null;
}

export async function getNewUserProperties(
  password: string
): Promise<{ password: string; id: string; role: UserRole }> {
  const encryptedPassword = await encodeAndEncrypt(password);
  const id = v4();
  const role = UserRole.BASIC;

  return {
    id,
    password: encryptedPassword,
    role,
  };
}

export async function isEmailUnique(email: string) {
  try {
    return !(await UserModel.query().findOne('email', email));
  } catch (error) {
    return true;
  }
}
