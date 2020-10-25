import { gql } from 'apollo-server-micro';

export default gql`
  type ClassesPayload {
    adminClasses: [ClassSchema]!
    assistantClasses: [ClassSchema]!
    studentClasses: [ClassSchema]!
  }

  input ClassInput {
    id: ID!
  }

  extend type Query {
    classes: ClassesPayload!
    clas(input: ClassInput!): ClassSchema!
  }
`;
