import { InMemoryCache, makeVar } from '@apollo/client';
import { IUser } from '../types';

export const viewerVar = makeVar<IUser | null>(null);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clientViewer: {
          read() {
            return viewerVar();
          },
        },
      },
    },
  },
});
