// Imports:
const validator = require('validator');
const { Schema, model } = require('mongoose');

// Constants:
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name field is required.'],
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, 'The avatar field is required.'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'URL provided is invalid.',
    },
  },
  email: {
    type: String,
    required: [true, 'An E-mail address is required.'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'E-mail address provided is invalid.',
    },
  },
  password: {
    type: String,
    required: [true, 'A password is required.'],
    select: false,
    validate: {
      validator: (value) => validator.isStrongPassword(value),
      message: 'Password provided is invalid.',
    },
  },
});

// Exports:
module.exports = model('user', userSchema);
