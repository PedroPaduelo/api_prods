const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
        host : "postgresql-21633-0.cloudclusters.net",
        port: 21633,
        user : "postgres",
        password : "4063020",
        database : "gestaoprods",
  },
  useNullAsDefault: true
})

module.exports = connection;




