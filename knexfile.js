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
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.PASSWORD,
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
