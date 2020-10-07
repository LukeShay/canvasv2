import { AuthenticationError, UserInputError } from "apollo-server-micro";

import { removeTokenCookies, setTokenCookies } from "../api/cookie";
import { StateModel, User } from "../api/domain";
import { getNewUserProperties, signInUser } from "../api/service/users-service";
import { IUser, UserRole } from "../types";

export default {
  Query: {
    async viewer(_parent, _args, context, _info) {
      if (context.user) {
        return context.user;
      }
      throw new AuthenticationError(
        "Authentication token is invalid, please log in"
      );
    },
  },
  Mutation: {
    async signUp(_parent, args, context, _info) {
      const user = args.input;

      const state = await StateModel.query().findOne("code", user.state);

      const newUserProperties = await getNewUserProperties(user.password);
      const newUser = new User({ ...user, ...newUserProperties, stateId: state.id } as IUser);

      if (context.user?.role === UserRole.ADMIN) {
        newUser.role = user.role || UserRole.BASIC;
      }

      await newUser.save();
      return { user: newUser };
    },

    async signIn(
      _parent,
      { input: { email, password, remember } },
      context,
      _info
    ) {
      const signIn = await signInUser(email, password, remember);

      if (signIn) {
        setTokenCookies(
          context.res,
          signIn.authorization,
          signIn.refresh || ""
        );
        return signIn;
      }

      throw new UserInputError("Invalid email and password combination");
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookies(context.res);
      return true;
    },
  },
};
