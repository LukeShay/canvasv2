import { authenticated } from '../../../authenticator';
import { UserModel } from '../../../domain';
import { Context } from '../../types';

export async function classes(_, __, context: Context) {
  const iUser = authenticated(context);

  const user = await UserModel.query().findById(iUser.id);

  const studentClasses = await user.$relatedQuery('studentClasses');
  const assistantClasses = await user.$relatedQuery('assistantClasses');
  const adminClasses = await user.$relatedQuery('adminClasses');

  return { studentClasses, assistantClasses, adminClasses };
}
