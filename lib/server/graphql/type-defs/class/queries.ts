import { gql } from 'apollo-server-micro';

export default gql`
  type ClassesPayload {
    adminClasses: [ClassSchema]!
    assistantClasses: [ClassSchema]!
    studentClasses: [ClassSchema]!
  }

  extend type Query {
    classes: ClassesPayload!
  }
`;
