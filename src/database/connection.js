const knex = require('knex');

const connection = knex({
  client: 'pg',
  connection: {
        host : "localhost",
        // port: 21633,
        user : "postgres",
        password : "4063020",
        database : "gestaoprods",
  },
  useNullAsDefault: true
})

module.exports = connection;




