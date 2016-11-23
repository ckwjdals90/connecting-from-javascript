
const pg = require("pg");
const settings = require("./setting"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var cmdinput = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE (first_name = '${cmdinput}' OR last_name = '${cmdinput}') GROUP BY id, first_name`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const r = result.rows[0];
    console.log(r.id + ":", r.first_name, r.last_name, "born", r.birthdate); //output: 1
    client.end();
  });
});