import { UserInputError } from 'apollo-server-micro';
import { IUser, UserRole } from '../../../../types';
import { authenticated } from '../../../authenticator';
import { ClassModel, UserModel } from '../../../domain';
import { Context, MutationArgs } from '../../types';

export async function classes(_, __, context: Context) {
  const iUser = authenticated(context);

  const user = await UserModel.query().findById(iUser.id);

  const studentClasses = await user.$relatedQuery('studentClasses');
  const assistantClasses = await user.$relatedQuery('assistantClasses');
  const adminClasses = await user.$relatedQuery('adminClasses');

  return { studentClasses, assistantClasses, adminClasses };
}

export async function clas(_, { input: { id } }: MutationArgs<{ id: string }>, context: Context) {
  const user = authenticated(context);

  const clas = await ClassModel.query().findById(id);

  if (!clas) {
    throw new UserInputError(`No class with id ${id}`);
  }

  if (user.role === UserRole.ADMIN || clas.id === id) {
    return clas;
  }

  const student = (await clas.$relatedQuery('students').findById(id)) as UserModel;

  if (student) {
    return clas;
  }

  const assistant = (await clas.$relatedQuery('assistants').findById(id)) as UserModel;

  if (assistant) {
    return clas;
  }

  throw new UserInputError(`No class with id ${id}`);
}
