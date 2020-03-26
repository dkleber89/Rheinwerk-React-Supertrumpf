const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const cors = require('cors');

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'secret') {
    res.json(true);
  } else {
    res.json(false);
  }
});

server.use(jsonServer.router('data.json'));

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Server ist listening on Port 3001');
});
