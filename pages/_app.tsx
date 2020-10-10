import '../styles/tailwind.css';
import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import NavBar from '../components/NavBar';
import { useApollo } from '../lib/web/apollo';

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps?.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <NavBar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default App;
