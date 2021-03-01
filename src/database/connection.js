const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
      host : 'localhost',
      database: 'gestaoprods',
      user:     'postgres',
      password: '4063020'
  },
  useNullAsDefault: true
})

module.exports = connection;




