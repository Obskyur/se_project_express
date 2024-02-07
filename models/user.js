// Imports:
const validator = require('validator');
const { Schema, model } = require('mongoose');

// Constants:
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name field is required."],
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator: value => validator.isURL(value),
      message: "URL given is invalid.",
    }
  }
})

// Exports:
module.exports = model("user", userSchema);