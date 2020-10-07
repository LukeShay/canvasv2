import { gql } from '@apollo/client';

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
  }

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
    role: String!
  }

  type SignUpPayload {
    user: UserSchema!
  }

  type SignInPayload {
    user: UserSchema!
  }

  type Query {
    user: UserSchema
    viewer: UserSchema
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
  }
`;
