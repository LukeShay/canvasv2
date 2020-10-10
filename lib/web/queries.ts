import { gql } from '@apollo/client';

export const ViewerQuery = gql`
  query Viewer {
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
    }
  }
`;
