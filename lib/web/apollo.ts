/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import typeDefs from '../graphql/type-defs';
import resolvers from '../graphql/resolvers';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('../graphql/schema');
    return new SchemaLink({ schema });
  }
  const { HttpLink } = require('@apollo/client/link/http');
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    resolvers,
    typeDefs,
    cache: new InMemoryCache(),
    link: createIsomorphLink(),
  });
}

function initializeApollo(initialState: any) {
  const currentApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    currentApolloClient.cache.restore(initialState);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return currentApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = currentApolloClient;

  return currentApolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
