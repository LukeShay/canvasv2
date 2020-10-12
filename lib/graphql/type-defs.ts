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

  type SignUpPayload {
    user: UserSchema!
  }

  type SignInPayload {
    user: UserSchema!
  }

  type UpdateUserPayload {
    user: UserSchema!
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
    role: String
  }

  input UpdateUserInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String
    address1: String
    address2: String
    city: String
    stateId: String
    zip: String
    role: String
  }

  type Mutation {
    signUp(input: SignUpInput!): SignUpPayload!
    signIn(input: SignInInput!): SignInPayload!
    signOut: Boolean!
    updateUser(input: UpdateUserInput!): UpdateUserPayload!
  }

  type Query {
    viewer: UserSchema
    states: [StateSchema]
  }
`;
