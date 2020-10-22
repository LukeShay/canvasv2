import { gql } from 'apollo-server-micro';

export default gql`
  type StateSchema {
    id: ID!
    abbreviation: String!
    code: String!
    name: String!
  }
`;
