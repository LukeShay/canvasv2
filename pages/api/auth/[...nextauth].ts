import { NextApiRequest, NextApiResponse } from 'next';
import * as Sentry from '@sentry/node';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { UsersService, connect, UserModel } from '../../../lib/server';

process.env.NEXTAUTH_URL = process.env.VERCEL_URL;

connect();

const options = {
  providers: [
    Providers.Credentials({
      name: 'Sign in',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        let ret: UserModel | null;

        try {
          ret =
            (await UsersService.signInUser(credentials.email, credentials.password, false))?.user ??
            null;
        } catch (error) {
          ret = null;
        }

        return Promise.resolve(ret);
      },
    }),
  ],
  callbacks: {
    session: async (session, user) => {
      if (!session) {
        return {
          session,
          user,
        };
      }

      let userModel: UserModel | undefined;

      try {
        userModel = await UserModel.query().findOne('email', user.email);
      } catch (error) {
        Sentry.captureException(error);
      }

      return {
        session,
        user: userModel?.mapToIUser(),
      };
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
