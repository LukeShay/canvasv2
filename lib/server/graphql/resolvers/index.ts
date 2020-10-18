import * as authMutations from './authentication/mutations';
import * as statesQueries from './state/queries';
import * as userMutations from './user/mutations';
import * as userQueries from './user/queries';

export default {
  Query: {
    ...userQueries,
    ...statesQueries,
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
  },
};
