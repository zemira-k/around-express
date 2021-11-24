const router = require('express').Router(); // creating a router

const fsPromises = require('fs').promises;

const path = require('path');

const filepath = path.join(__dirname, '../data/users.json');

router.get('/users', (req, res) => {
  fsPromises
    .readFile(filepath, { encoding: 'utf8' })
    .then((users) => {
      res.status(200).send(JSON.parse(users));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

router.get('/users/:id', (req, res) => {
  fsPromises
    .readFile(filepath, { encoding: 'utf8' })
    .then((users) => {
      const parsedUsersData = JSON.parse(users);
      const userId = parsedUsersData.find((user) => user._id === req.params.id);
      if (!userId) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send(userId);
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

module.exports = router; // exporting the router
