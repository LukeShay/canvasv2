import { gql } from 'apollo-server-micro';

export default gql`
  extend type Query {
    viewer: UserSchema
    states: [StateSchema]
  }
`;
