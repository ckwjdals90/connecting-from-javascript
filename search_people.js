
const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: true
  }
});

const cmdinput = process.argv[2];

knex.select('*')
  .from('famous_people')
  .where('first_name', '=', cmdinput)
  .orWhere('last_name', '=', cmdinput)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    let row = rows[0]
    console.log(row.id + ':', row.first_name, row.last_name, 'born', row.birthdate);
  });