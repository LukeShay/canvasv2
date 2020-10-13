import { IUser, UserRole } from '@lib/types';
import { StateModel, User } from '@lib/server/domain';
import { UserInputError } from 'apollo-server-micro';
import { getNewUserProperties, signInUser } from '@lib/server/service/users-service';
import { setTokenCookies, removeTokenCookies } from '@lib/server/cookie';
import { MutationArgs, Context } from '../../types';

export async function signUp(_, args: MutationArgs<IUser>, context: Context, ____) {
  const user = args.input;

  const stateId = user.stateId
    ? (await StateModel.query().findOne('code', user.stateId))?.id
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