const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client
  .connect()
  .then(() => console.log('🚀 connected successfuly to database!'))
  .catch((error) => console.log(`❌ failed to connect to database!, ${error}`));

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
