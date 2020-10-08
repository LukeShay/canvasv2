const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

console.log(process.env.SQL_DATABASE);

module.exports = {
  test: {
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: { filename: 'test.sqlite3' },
  },
  local: {
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: { filename: 'dev.sqlite3' },
  },
  development: {
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: { filename: 'dev.sqlite3' },
  },
  remote: {
    client: 'mysql',
    connection: {
      database: process.env.SQL_DATABASE,
      host: process.env.SQL_HOST,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      port: parseInt(process.env.SQL_PORT),
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
