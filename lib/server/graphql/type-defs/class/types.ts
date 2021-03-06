import { gql } from 'apollo-server-micro';

export default gql`
  type ClassSchema {
    id: ID!
    adminId: String!
    building: String
    code: String!
    description: String
    name: String!
    room: String
  }
`;
