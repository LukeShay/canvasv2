import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { IUser, Optional } from '../types';

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
      firstName
      lastName
      city
      zip
      role
      stateId
      address1
      address2
      state {
        id
        code
        abbreviation
        name
      }
    }
  }
`;

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
