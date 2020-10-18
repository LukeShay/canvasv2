import * as Sentry from '@sentry/node';
import { ApolloServer } from 'apollo-server-micro';
import { Integrations } from '@sentry/tracing';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { schema, context, connect, constants } from '../../lib/server';

connect();

if (process.env.SENTRY_DSN) {
  Sentry.init({
    enabled: true,
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1,
  });
}

const apolloServer = new ApolloServer({
  cacheControl: true,
  context,
  // formatError,
  introspection: constants().development,
  playground: true,
  schema,
  tracing: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

function sentryHandler(apiHandler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await apiHandler(req, res);
    } catch (error) {
      Sentry.captureException(error);
      return error;
    }
  };
}

export default sentryHandler(apolloServer.createHandler({ path: '/api/graphql' }));
