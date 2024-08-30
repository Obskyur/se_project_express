/* eslint-disable no-console */
//* Imports:
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} = require("../utils/errors");

const MONGO_SERVER_ERROR = 11000;

//* Methods (Controllers):

// Used to add a new user to the database
const addUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      avatar,
      email,
      password: hash,
    })
      .then((user) =>
        res.status(201).send({
          name: user.name,
          avatar: user.avatar,
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
          next(new ConflictError("A user with this e-mail already exists!"));
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

const findUserByCredentials = (email, password) =>
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError("User not found."));
      }
      return bcrypt.compare(password, user.password).then((match) => {
        if (!match)
          return Promise.reject(
            new UnauthorizedError("Incorrect E-mail or Password."),
          );
        return user;
      });
    });

const login = (req, res, next) => {
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
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
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
