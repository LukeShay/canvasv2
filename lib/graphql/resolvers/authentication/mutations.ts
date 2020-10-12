import { UserInputError } from 'apollo-server-micro';
import { Context } from 'vm';
import { setTokenCookies, removeTokenCookies } from '~/lib/api/cookie';
import { StateModel, User } from '~/lib/api/domain';
import { getNewUserProperties, signInUser } from '~/lib/api/service/users-service';
import { IUser, UserRole } from '~/lib/types';
import { MutationArgs } from '../../types';

export async function signUp(_, args: MutationArgs<IUser>, context: Context, ____) {
  const user = args.input;

  const stateId = user.stateId
    ? (await StateModel.query().findOne('code', user.stateId)).id
    : undefined;

  const newUserProperties = await getNewUserProperties(user.password);
  const newUser = new User({ ...user, ...newUserProperties, stateId } as IUser);

  if (context.user?.role === UserRole.ADMIN) {
    newUser.role = user.role || UserRole.BASIC;
  }

  await newUser.save();
  return { user: newUser };
}

export async function signIn(
  _,
  { input: { email, password, remember } }: MutationArgs<IUser & { remember: boolean }>,
  context: Context,
  ____
) {
  const signIn = await signInUser(email, password, remember);

  if (signIn) {
    setTokenCookies(context.res, signIn.authorization, signIn.refresh || '');
    return signIn;
  }

  throw new UserInputError('Invalid email and password combination');
}

export async function signOut(_, __, context: Context, ____) {
  removeTokenCookies(context.res);
  return true;
}
