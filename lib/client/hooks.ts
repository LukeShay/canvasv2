import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import React from 'react';
import { IUser, Optional, UserRole } from '../types';
import { ViewerQuery } from './graphql/server/queries';
import { Paths } from './paths';

export function useViewer() {
  const [viewer, setViewer] = React.useState<Optional<IUser>>();
  const { loading, data, error } = useQuery(ViewerQuery);

  React.useEffect(() => {
    if (data?.viewer) {
      setViewer(data.viewer);
    }
  }, [data, loading, error]);

  return { viewer, loading, data, error };
}
