import { connectKnex } from './domain';

export function connect() {
  if (process.env.NODE_ENV === 'development') {
    connectKnex({
      client: 'sqlite3',
      connection: { filename: '../../dev.sqlite3' },
      useNullAsDefault: true,
    });
  }
}
