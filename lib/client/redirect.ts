import { NextPageContext } from 'next';
import { getSession } from 'next-auth/client';
import Router from 'next/router';
import { IUser, UserRole } from '../types';
import { atLeastAdmin, atLeastOrgAdmin, atLeastPowerUser } from './authenticator';

export async function getServerSideRedirect(
  context: NextPageContext,
  redirect: string,
  role?: UserRole
) {
  const redirectFunc = () => {
    if (typeof window === 'undefined') {
      context.res?.writeHead(307, { Location: redirect });
      context.res?.end();
    } else {
      Router.replace(redirect);
    }
  };

  const session = await getSession(context);

  let viewer: IUser | null = null;

  if (session) {
    console.log('log');
    viewer = (session.user as unknown) as IUser;
  }

  if (viewer) {
    switch (role) {
      case UserRole.BASIC:
        break;
      case UserRole.POWER_USER:
        if (!atLeastPowerUser(viewer)) {
          redirectFunc();
        }
        break;
      case UserRole.ORG_ADMIN:
        if (!atLeastOrgAdmin(viewer)) {
          redirectFunc();
        }
        break;
      case UserRole.ADMIN:
        if (!atLeastAdmin(viewer)) {
          redirectFunc();
        }
        break;
      default:
        redirectFunc();
        break;
    }
  } else if (role) {
    redirectFunc();
  }

  return { props: { viewer } };
}
