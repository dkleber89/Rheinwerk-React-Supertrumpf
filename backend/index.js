const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const server = express();

server.use(fileUpload());
server.use(bodyParser.json());
server.use(cors());

server.use('/card', (req, res, next) => {
  if (req.method === 'POST') {
    const file = req.files.image;
    const name = req.body.name.replace(' ', '_');
    const image = `${name}.png`;

    file.mv(`${__dirname}/../public/${image}`);
    req.body.image = image;
  }

  next();
});

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
