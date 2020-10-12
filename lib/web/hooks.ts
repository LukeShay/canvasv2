import { useQuery } from '@apollo/client';
import React from 'react';
import { IUser, Optional } from '../types';
import { ViewerQuery } from './queries';

export function useViewer() {
  const [viewer, setViewer] = React.useState<Optional<IUser>>();
  const { loading, data, error } = useQuery(ViewerQuery);

  React.useEffect(() => {
    if (data?.viewer) {
      setViewer(data.viewer);
    }
  }, [data]);

  return { viewer, loading, data, error };
}