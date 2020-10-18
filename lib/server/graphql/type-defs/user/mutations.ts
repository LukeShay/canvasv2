import { gql } from '@apollo/client';

export default gql`
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

  type UpdateUserPayload {
    user: UserSchema!
  }

  extend type Mutation {
    updateUser(input: UpdateUserInput!): UpdateUserPayload!
  }
`;
