const co = require('co');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');

const api = require('./api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev
});
const handle = app.getRequestHandler();

co(function* build() {
  yield app.prepare();

  const server = express();

  server.use(bodyParser.json());
  server.use('/api', api);

  server.get('*', (req, res) => handle(req, res));

  const PORT = process.env.PORT || 3000;

  server.listen(PORT);
  console.log(`express-mongo-next-boilerplate listening on ${PORT}`);
}).catch(err => console.error(err));
