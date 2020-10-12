import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';
import schema from '~/lib/graphql/schema';
import { context } from '~/lib/graphql/apollo';
import { connect } from '~/lib/api/db';
import { constants } from '~/lib/api/secrets';

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
