const express = require('express');

const AccountRouter = require('./AccountRouter');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) =>{
  res.send("Yep, this is working")
});


module.exports = server;