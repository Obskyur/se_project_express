/* eslint-disable no-console */
//* Imports:
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const { JWT_SECRET } = require('../utils/config');
const {
  DOCUMENT_NOT_FOUND_ERROR,
  CAST_ERROR,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  MONGO_DB_DUPLICATE_ERROR,
  USER_NOT_FOUND_ERROR,
} = require("../utils/errors");

//* Methods (Controllers):

// Used to add a new user to the database
const addUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res.status(VALIDATION_ERROR).send({
            message: "User has invalid name, avatar, email, or password.",
          });
        }
        if (err.status === MONGO_DB_DUPLICATE_ERROR) {
          return res
            .status(MONGO_DB_DUPLICATE_ERROR)
            .send({ message: "A user with this e-mail already exists!" });
        }
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ message: "An error has occurred on the server." });
      }),
  );
};

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
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "User ID not found." });
      }
      if (err.name === "CastError") {
        return res.status(CAST_ERROR).send({ message: "Invalid User ID." });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const findUserByCredentials = (email, encPassword) => {
  User.findOne({ email }).then((user) => {
    if (!user) return Promise.reject(new Error("User not found."));
    return bcrypt.compare(encPassword, user.password).then((match) => {
      if (!match)
        return Promise.reject(new Error("Incorrect E-mail or Password."));
      return user;
    });
  });
}

const login = (req, res) => {
  const { email, password } = req.params;
  return bcrypt.hash(password, 10).then((hash) =>
    findUserByCredentials(email, hash)
      .then((user) => {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d", });
        res.send({ token });
      })
      .catch((err) => {
        console.error(err);
        res.status(USER_NOT_FOUND_ERROR).send("User not found.");
      }),
  );
};

//* Exports:
module.exports = {
  getUsers,
  getUser,
  addUser,
  login,
};
