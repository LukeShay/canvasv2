import { gql } from '@apollo/client';

export default gql`
  type StateSchema {
    id: ID!
    abbreviation: String!
    code: String!
    name: String!
  }

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
