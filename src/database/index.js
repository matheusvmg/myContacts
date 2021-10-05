const { Client } = require('pg');

const client = new Client({
  host: 'postgres-db',
  port: 5432,
  user: 'matheusvmg',
  password: '0105vasco',
  database: 'mycontacts',
});

setTimeout(
  () =>
    client
      .connect()
      .then(() => console.log('🚀 connected successfuly to database!'))
      .catch((error) =>
        console.log(`❌ failed to connect to database!, ${error}`)
      ),
  20000
);

exports.query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};
