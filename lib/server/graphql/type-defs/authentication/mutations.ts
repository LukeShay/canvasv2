import { gql } from 'apollo-server-micro';

export default gql`
  input SignUpInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    address1: String
    address2: String
    city: String
    stateId: String
    zip: String
    role: String
  }

  extend type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
  }
`;
