//* Imports:
const User = require("../models/user");

//* Methods:

// Used to retrieve all users from database
const getUsers = (req, res) => {
  User.find({})
    .then(users =>
      res.status(200).send(users)
    )
    .catch(err => {
      console.error(err);
      return res.status(err.status).send({ message: err.message });
    });
};

// Used to retrieve user at specified path from database
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then(users =>
      res.status(200).send(users)
    )
    .catch(err => {
      console.error(err);
      if (err.name == "DocumentNotFoundError")
        return res.status(400).send({ message: err.message });
      else if (err.name == "CastError")
        return res.status(404).send({ message: err.message });
      return res.status(err.status).send({ message: err.message });
    });
};

// Used to add a new user to the database
const addUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then(user =>
      res.status(201).send(user)
    )
    .catch(err => {
      console.error(err);
      return res.status(err.status).send({ message: err.message });
    });
};

//* Exports:
module.exports = { getUsers, getUser, addUser };