const express = require('express');
require('express-async-errors');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');

const router = require('./routes');

const app = express();
app.use(express.json());
app.use(cors);
app.use(router);
app.use(errorHandler);

app.listen(3333, () =>
  console.log('🚀 server is runnig at http://localhost:3333')
);
