import { signUp, signIn, signOut } from './authentication/mutations';
import { states } from './state/queries';
import { updateUser } from './user/mutations';
import { viewer } from './user/queries';

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
