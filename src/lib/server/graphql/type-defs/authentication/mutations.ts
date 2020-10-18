import { gql } from '@apollo/client';

export default gql`
  input SignInInput {
    email: String!
    password: String!
  }

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
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    signUp(input: SignUpInput!): SignUpPayload!
  }
`;
