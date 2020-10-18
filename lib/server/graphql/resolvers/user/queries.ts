import { AuthenticationError } from 'apollo-server-micro';
import { UserModel } from '../../../domain';
import { Context } from '../../types';

export async function viewer(_, __, context: Context, info) {
  if (!context.user) {
    throw new AuthenticationError('Authentication token is invalid, please log in');
  }

  let user = context.user as UserModel;

  if (
    info.operation.selectionSet.selections.filter((selection) => selection.name.value === 'state')
  ) {
    user = await user.$fetchGraph('state');
  }

  return user;
}
