import { authenticated } from '../../../authenticator';
import { UserModel } from '../../../domain';
import { Context } from '../../types';

export async function viewer(_, __, context: Context, info) {
  authenticated(context);

  let user = context.user as UserModel;

  if (
    info.operation.selectionSet.selections.filter((selection) => selection.name.value === 'state')
  ) {
    user = await user.$fetchGraph('state');
  }

  return user;
}
