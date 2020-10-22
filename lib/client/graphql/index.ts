import { gql } from '@apollo/client';

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
