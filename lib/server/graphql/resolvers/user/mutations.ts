import { IUser, UserRole } from '../../../../types';
import { authenticated } from '../../../authenticator';
import { StateModel, User } from '../../../domain';
import { MutationArgs, Context } from '../../types';

export async function updateUser(_, { input: user }: MutationArgs<IUser>, context: Context) {
  authenticated(context);

  const currentUser = new User(context.user as IUser);

  const stateId = user.stateId
    ? (await StateModel.query().findOne('code', user.stateId))?.id
    : undefined;

  currentUser.update({ ...currentUser, ...user, stateId });

  if (context.user?.role === UserRole.ADMIN) {
    currentUser.role = user.role || currentUser.role;
  }

  await currentUser.save();
  return { user: currentUser };
}
