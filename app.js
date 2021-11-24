const express = require('express');
const cards = require('./routes/cards'); // importing router
const users = require('./routes/users'); // importing router

const app = express();
const { PORT = 3000 } = process.env;

app.use('/', cards); // starting cards router
app.use('/', users); // starting users router
app.get('*', (req, res) => {
  res.status(404).send({ message: 'An error has occurred on the server' });
});

app.listen(PORT);
