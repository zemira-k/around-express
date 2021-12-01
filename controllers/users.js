const User = require('../models/user');

const costumErrorCatch = (err, res) => {
  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Invalid user id' });
  } else if (err.statusCode === 404) {
    res.status(404).send({ message: err.message });
  } else {
    res.status(500).send({ message: err.message || 'internal server error' });
  }
};

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || 'internal server error' });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: 'new', about: 'new' },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: false, // if the user entry wasn't found, it will be created
    },
  )
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar:
        'https://images.unsplash.com/photo-1638035966446-b2954fdf3525?ixlib.jpg',
    },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: false, // if the user entry wasn't found, it will be created
    },
  )
    .orFail(() => {
      const error = new Error('user not found');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      costumErrorCatch(err, res);
    });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};
