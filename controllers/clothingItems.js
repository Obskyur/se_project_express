//* Imports:
const ClothingItem = require("../models/clothingItem");
const {
  DOCUMENT_NOT_FOUND_ERROR,
  CAST_ERROR,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  REQ_FORBIDDEN,
} = require("../utils/errors");

//* Methods (Controllers):

// Used to retrieve all clothing items from database
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// Used to add a new clothing item to the database
const addItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError")
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "Item has invalid name, weather, or imageUrl." });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// Used to remove a clothing item from the database
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return res
          .status(REQ_FORBIDDEN)
          .send({ message: "User does not have ownership of this card." });
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then(() => res.status(200).send(item))
        .catch((err) => {next(err);})
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError")
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Item ID not found." });
      if (err.name === "CastError")
        return res.status(CAST_ERROR).send({ message: "Invalid Item ID." });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// Used to add a like to a card if the card is not already liked by this user
const addLike = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError")
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Item ID not found." });
      if (err.name === "CastError")
        return res.status(CAST_ERROR).send({ message: "Invalid Item ID." });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// Used to remove a like from a card if the user has it liked
const deleteLike = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError")
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "Item ID not found." });
      if (err.name === "CastError")
        return res.status(CAST_ERROR).send({ message: "Invalid Item ID." });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

//* Exports:
module.exports = { getItems, addItem, deleteItem, addLike, deleteLike };
