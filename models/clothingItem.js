//* Imports:
const validator = require('validator');
const { Schema, model } = require('mongoose');

//* Constants:
const clothingItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name field is required."],
    minlength: 2,
    maxlength: 30
  },
  weather: {
    type: String,
    required: [true, "The weather field is required."],
    enum: ['hot', 'warm', 'cold'],
  },
  imageUrl: {
    type: String,
    required: [true, "The imageUrl field is required."],
    validate: {
      validator: value => validator.isURL(value),
      message: "URL given is invalid.",
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "The owner field is required."],
    ref: 'owner'
  },
  likes: {
    type: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    default: [],
    ref: 'user'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

//* Exports:
module.exports = model("clothingItem", clothingItemSchema);