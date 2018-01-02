const co = require('co');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const api = require('./api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: './frontend'
});
const handle = app.getRequestHandler();

// Require env files
require('dotenv').config({ path: '.env' }); //eslint-disable-line

co(function* build() {
  yield app.prepare();

  // Create a new server
  const server = express();

  // Allow json requests and use /api for the api
  server.use(bodyParser.json());
  server.use('/api', api);

  // Handle other requests using next
  server.get('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;

  // Listen on the port
  server.listen(PORT, () => console.log(`rhino listening on ${PORT}`));
}).catch(err => console.error(err));
