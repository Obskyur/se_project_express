/* eslint-disable no-console */
//* Imports:
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  VALIDATION_ERROR,
  MONGO_SERVER_ERROR,
  NotFoundError,
  BadRequestError,
  ValidationError,
  DuplicateError,
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
        res.status(201).send({
          name: user.name,
          avatarUrl: user.avatarUrl,
          email: user.email,
        }),
      )
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError")
          next(
            new ValidationError("User has invalid name, email, or password."),
          );
        if (err.code === MONGO_SERVER_ERROR)
          next(new DuplicateError("A user with this e-mail already exists!"));
        next(err);
      }),
  );
};

// Used to retrieve the logged-in user data
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found.");
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError")
        next(new BadRequestError("The ID string is in an invalid format."));
      next(err);
    });
};

// const getCurrentUser = (req, res,) => {
//   User.findById(req.user._id)
//     .orFail()
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       console.error(err);
//       return res
//         .status(INTERNAL_SERVER_ERROR)
//         .send({ message: "An error has occurred on the server." });
//     });
// };

const findUserByCredentials = (email, password) =>
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError("User not found."));
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          return Promise.reject(new Error("Incorrect E-mail or Password."));
        return user;
      });
    });

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    next(new ValidationError("E-mail and password are required."));
  return findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(() => {
      next(new NotFoundError("Incorrect E-mail or Password."));
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
      if (err.name === "DocumentNotFoundError")
        next(new NotFoundError("User ID not found."));
      if (err.name === "ValidationError")
        next(new ValidationError(err.message));
      next(err);
    });
};

//* Exports:
module.exports = {
  getCurrentUser,
  addUser,
  login,
  updateCurrentUser,
};
