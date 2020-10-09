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
      <div className="w-screen h-screen bg-gray-100">
        <NavBar />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default App;
