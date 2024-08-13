//* Imports:
const ClothingItem = require("../models/clothingItem");
const {
  ValidationError,
  RequestForbiddenError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errors");
const errorHandler = require("../middlewares/error-handler");

//* Methods (Controllers):

// Used to retrieve all clothing items from database
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(errorHandler);
};

// Used to add a new clothing item to the database
const addItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError")
        next(
          new ValidationError("Item has invalid name, weather, or imageUrl."),
        );
      next(err);
    });
};

// Used to remove a clothing item from the database
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        next(
          new RequestForbiddenError(
            "User does not have ownership of this card.",
          ),
        );
      }
      return ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then(() => res.status(200).send(item))
        .catch(next);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError")
        next(new NotFoundError("Item ID not found."));
      if (err.name === "CastError")
        next(new BadRequestError("Invalid Item ID."));
      next(err);
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
      if (err.name === "DocumentNotFoundError")
        next(new NotFoundError("Item ID not found."));
      if (err.name === "CastError")
        next(new BadRequestError("Invalid Item ID."));
      next(err);
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
        next(new NotFoundError("Item ID not found."));
      if (err.name === "CastError")
        next(new BadRequestError("Invalid Item ID."));
      next(err);
    });
};

//* Exports:
module.exports = { getItems, addItem, deleteItem, addLike, deleteLike };
