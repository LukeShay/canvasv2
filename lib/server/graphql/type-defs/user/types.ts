import { gql } from 'apollo-server-micro';

export default gql`
  type UserSchema {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    address1: String
    address2: String
    city: String
    stateId: String
    zip: String
    role: String!
    picture: String
    state: StateSchema
  }
`;
