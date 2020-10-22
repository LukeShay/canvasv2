import { AuthenticationError } from 'apollo-server-micro';
import { UserRole } from '../types';
import { Context } from './graphql/types';

export function authenticated({ user }: Context) {
  if (!user) {
    throw new AuthenticationError('');
  }

  return user;
}

export function admin({ user }: Context) {
  if (user?.role !== UserRole.ADMIN) {
    throw new AuthenticationError('');
  }

  return user;
}
