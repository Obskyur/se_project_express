/* eslint-disable no-console */
//* Imports:
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  DOCUMENT_NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,
  MONGO_DB_DUPLICATE_ERROR,
  MONGO_SERVER_ERROR,
  USER_NOT_FOUND_ERROR,
} = require("../utils/errors");

//* Methods (Controllers):

// Used to add a new user to the database
const addUser = (req, res) => {
  const { name, avatarUrl, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name: name,
      avatarUrl,
      email,
      password: hash,
    })
      .then((user) =>
        res
          .status(201)
          .send({ name: user.name, avatarUrl: user.avatarUrl, email: user.email }),
      )
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res.status(VALIDATION_ERROR).send({
            message: err.message,
          });
        }
        if (err.code === MONGO_SERVER_ERROR) {
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

// Used to retrieve the logged-in user data
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const findUserByCredentials = (email, password) =>
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("User not found."));
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          return Promise.reject(new Error("Incorrect E-mail or Password."));
        return user;
      });
    });

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(VALIDATION_ERROR)
      .send({ message: "E-mail and password are required." });
  }
  return findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(USER_NOT_FOUND_ERROR)
        .send({ message: "Incorrect email or password." });
    });
};

const updateCurrentUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatarUrl: req.body.avatarUrl },
    { new: true, runValidators: true },
  )
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(DOCUMENT_NOT_FOUND_ERROR)
          .send({ message: "User ID not found." });
      }
      if (err.name === "ValidationError") {
        return res.status(VALIDATION_ERROR).send({
          message: err.message,
        });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

//* Exports:
module.exports = {
  getCurrentUser,
  addUser,
  login,
  updateCurrentUser,
};
