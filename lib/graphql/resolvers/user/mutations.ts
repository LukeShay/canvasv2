import { AuthenticationError } from 'apollo-server-micro';
import { Context } from 'vm';
import { StateModel, User } from '~/lib/api/domain';
import { IUser, UserRole } from '~/lib/types';
import { MutationArgs } from '../../types';

export async function updateUser(_, { input: user }: MutationArgs<IUser>, context: Context) {
  console.log(user);
  if (!context.user) {
    throw new AuthenticationError('Authentication token is invalid, please log in');
  }

  const currentUser = new User(context.user as IUser);

  const stateId = user.stateId
    ? (await StateModel.query().findOne('code', user.stateId)).id
    : undefined;

  currentUser.update({ ...currentUser, ...user, stateId });

  if (context.user?.role === UserRole.ADMIN) {
    currentUser.role = user.role || currentUser.role;
  }

  await currentUser.save();
  return currentUser;
}
