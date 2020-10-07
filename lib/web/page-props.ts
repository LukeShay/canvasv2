import { IUser, Optional } from '../types';

export interface PageProps {
  authenticated: boolean;
  viewer: Optional<IUser>;
}
