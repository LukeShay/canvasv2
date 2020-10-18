import { connectKnex } from './domain';
import { constants } from './secrets';

export function connect() {
  if (process.env.NODE_ENV === 'development') {
    connectKnex({
      client: 'sqlite3',
      connection: { filename: 'dev.sqlite3' },
      useNullAsDefault: true,
    });
  } else {
    connectKnex({
      client: 'mysql',
      connection: {
        host: constants().sqlHost,
        user: constants().sqlUser,
        password: constants().sqlPassword,
        database: constants().sqlDatabase,
        port: parseInt(constants().sqlPort, 10) || 3306,
      },
    });
  }
}
