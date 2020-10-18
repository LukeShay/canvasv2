import { gql } from '@apollo/client';
import authentication from './authentication';
import user from './user';

const base = gql`
  type Mutation {
    fake: Boolean!
  }
  type Query {
    fake: Boolean!
  }
`;

export default [base, ...user, ...authentication];
