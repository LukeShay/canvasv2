import { useQuery } from '@apollo/client';
import React from 'react';
import { IUser, Optional } from '../types';
import { viewerVar } from './cache';
import { ViewerQuery } from './graphql/server/queries';

export function useViewer() {
  const [viewer, setViewer] = React.useState<Optional<IUser>>();
  const { loading, data, error } = useQuery(ViewerQuery);

  React.useEffect(() => {
    if (data?.viewer) {
      setViewer(data.viewer);
      viewerVar(data.viewer);
    }
  }, [data, loading, error]);

  return { viewer, loading, data, error };
}