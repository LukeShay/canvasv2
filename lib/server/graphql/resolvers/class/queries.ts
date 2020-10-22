import { authenticated } from '../../../authenticator';
import { Context } from '../../types';

export async function classes(_, __, context: Context) {
  const user = authenticated(context);

  const studentClasses = await user.$relatedQuery('studentClasses');
  const assistantClasses = await user.$relatedQuery('assistantClasses');
  const adminClasses = await user.$relatedQuery('adminClasses');

  return { studentClasses, assistantClasses, adminClasses };
}
