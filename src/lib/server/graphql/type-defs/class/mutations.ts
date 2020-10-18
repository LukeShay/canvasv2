import { gql } from '@apollo/client';

export default gql`
  input CreateClassInput {
    adminId: String!
    building: String
    code: String!
    description: String
    name: String!
    room: String
  }

  type CreateClassPayload {
    class: ClassSchema!
  }

  extend type Mutation {
    createClass(input: CreateClassInput!): CreateClassPayload!
  }
`;
