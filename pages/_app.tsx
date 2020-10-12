import '../styles/tailwind.css';
import React from 'react';
import * as Sentry from '@sentry/node';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Integrations } from '@sentry/tracing';
import NavBar from '~/components/NavBar';
import { useApollo } from '~/lib/web/apollo';

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: true,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1,
  });
}

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
