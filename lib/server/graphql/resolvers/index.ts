import * as authMutations from './authentication/mutations';
import * as statesQueries from './state/queries';
import * as userMutations from './user/mutations';
import * as userQueries from './user/queries';
import * as classMutations from './class/mutations';
import * as classQueries from './class/queries';

export default {
  Query: {
    ...userQueries,
    ...statesQueries,
    ...classQueries,
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
    ...classMutations,
  },
};
