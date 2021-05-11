const express = require('express');
require('express-async-errors');

const router = require('./routes');

const app = express();
app.use(express.json());
app.use(router);
app.use((error, request, response, next) => {
  console.log('❌ Error handler ❌');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3333, () =>
  console.log('🚀 server is runnig at http://localhost:3333')
);
