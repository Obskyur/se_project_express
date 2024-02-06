//* Imports:
const User = require("../models/user");
const {
  DOCUMENT_NOT_FOUND_ERROR,
  CAST_ERROR,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
} = require("../utils/errors");

//* Methods (Controllers):

// Used to retrieve all users from database
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// Used to retrieve user at specified path from database
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      if (err.name == "DocumentNotFoundError")
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "User ID not found." });
      else if (err.name == "CastError")
        return res.status(CAST_ERROR).send({ message: "Invalid User ID." });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

// Used to add a new user to the database
const addUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name == "ValidationError")
        return res
          .status(VALIDATION_ERROR)
          .send({ message: "User has invalid name or avatar." });
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

//* Exports:
module.exports = { getUsers, getUser, addUser };
