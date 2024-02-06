//* Imports:
const ClothingItem = require("../models/clothingItem");

//* Methods (Controllers):

// Used to retrieve all clothing items from database
const getItems = (req, res) => {
  ClothingItem.find({})
    .then(items =>
      res.status(200).send(items)
    )
    .catch(err => {
      console.error(err);
      return res.status(err.status).send({ message: err.message });
    });
};

// Used to add a new clothing item to the database
const addItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .then(item =>
      res.status(201).send(item)
    )
    .catch(err => {
      console.error(err);
      return res.status(err.status).send({ message: err.message });
    });
};

// Used to remove a clothing item from the database
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then(item =>
      res.status(200).send(item)
    )
    .catch(err => {
      console.error(err);
      return res.status(err.status).send({ message: err.message });
  })
};

//* Exports:
module.exports = { getItems, addItem, deleteItem };