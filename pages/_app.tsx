import '../styles/main.css';
import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { Integrations } from '@sentry/tracing';
import { ToastContainer, Slide } from 'react-toastify';
import * as Sentry from '@sentry/node';
import React from 'react';
import { useApollo } from '../lib/client';
import NavBar from '../components/NavBar';
import { ViewerProvider } from '../components/AuthProvider';

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
      <ViewerProvider>
        <div className="min-h-screen">
          <NavBar />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-center"
            transition={Slide}
            draggablePercent={60}
            hideProgressBar
            autoClose={false}
            pauseOnHover
          />
        </div>
      </ViewerProvider>
    </ApolloProvider>
  );
}

export default App;
