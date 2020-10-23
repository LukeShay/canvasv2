import React from 'react';
import { gql, useQuery } from '@apollo/client';
import ChildrenProps from './ChildrenProps';
import { IUser, Optional } from '../lib/types';

const ViewerContext = React.createContext<{ viewer: Optional<IUser>; loading: boolean }>({
  viewer: undefined,
  loading: true,
});

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

function ViewerProvider({ children }: ChildrenProps) {
  const { loading, data } = useQuery(ViewerQuery);

  return (
    <ViewerContext.Provider value={{ viewer: data?.viewer, loading }}>
      {children}
    </ViewerContext.Provider>
  );
}

const useViewerContext = () => React.useContext(ViewerContext);

export { ViewerProvider, useViewerContext };
