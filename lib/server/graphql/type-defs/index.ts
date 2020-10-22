import { gql } from 'apollo-server-micro';
import authentication from './authentication';
import user from './user';
import state from './state';
import clas from './class';

const base = gql`
  type Mutation {
    fake: Boolean!
  }
  type Query {
    fake: Boolean!
  }
`;

export default [base, ...state, ...user, ...authentication, ...clas];
