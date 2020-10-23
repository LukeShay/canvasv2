import { IUser, UserRole } from '../../../../types';
import { StateModel, User } from '../../../domain';
import { getNewUserProperties } from '../../../service/users-service';
import { MutationArgs, Context } from '../../types';

export async function signUp(_, args: MutationArgs<IUser>, context: Context) {
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
