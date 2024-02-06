// Imports:
const validator = require('validator');
const { Schema, model } = require('mongoose');

// Constants:
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
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: [true, "The owner field is required."],
    ref: 'owner'
  },
  likes: {
    type: Schema.Types.ObjectId,
    required: [true, "The likes field is required."],
    ref: 'user'
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = model("clothingItem", clothingItemSchema);