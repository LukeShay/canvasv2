import { updateUser } from './user/mutations';
import { viewer } from './user/queries';
import { states } from './state/queries';
import { signUp, signIn, signOut } from './authentication/mutations';

export default {
  Query: {
    viewer,
    states,
  },
  Mutation: {
    signUp,
    signIn,
    signOut,
    updateUser,
  },
};
