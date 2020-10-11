import { ApolloServer } from 'apollo-server-micro';
import schema from '~/lib/graphql/schema';
import { context } from '~/lib/graphql/apollo';
import { connect } from '~/lib/api/db';
import { constants } from '~/lib/api/secrets';

connect();

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

export default apolloServer.createHandler({ path: '/api/graphql' });
