import React from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-cycle
import { useViewerContext } from '../../components/AuthProvider';
import { UserRole } from '../types';
import { atLeastAdmin, atLeastOrgAdmin, atLeastPowerUser } from './authenticator';

export function useRedirect(redirect: string, role?: UserRole) {
  const { viewer, loading } = useViewerContext();
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && viewer) {
      switch (role) {
        case UserRole.BASIC:
          break;
        case UserRole.POWER_USER:
          if (!atLeastPowerUser(viewer)) {
            router.push(redirect);
          }
          break;
        case UserRole.ORG_ADMIN:
          if (!atLeastOrgAdmin(viewer)) {
            router.push(redirect);
          }
          break;
        case UserRole.ADMIN:
          if (!atLeastAdmin(viewer)) {
            router.push(redirect);
          }
          break;
        default:
          router.push(redirect);
          break;
      }
    } else if (!loading) {
      router.push(redirect);
    }
  }, [viewer, loading]);

  return { viewer, loading };
}
