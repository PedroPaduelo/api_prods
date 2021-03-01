// Update with your config settings.
module.exports = {
  client: 'pg',
  connection: {
      host : 'localhost',
      database: 'nommand',
      user:     'postgres',
      password: '4063020'
  },
  migrations: {
    directory: "./src/database/migrations"
  },
  useNullAsDefault: true
}