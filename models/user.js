const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(\w{3}\.)?.+\.com.*$/gim.test(v);
      },
      message: 'Link is not valid!',
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
