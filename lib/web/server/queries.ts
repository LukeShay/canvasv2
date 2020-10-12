import { gql } from '@apollo/client';

export const ViewerQuery = gql`
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

export const StatesQuery = gql`
  query StatesQuery {
    states {
      id
      abbreviation
      code
      name
    }
  }
`;
