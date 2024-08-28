//* Imports:
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { AUTH_NOT_FOUND_ERROR, UnauthorizedError } = require("../utils/errors");

/* eslint-disable consistent-return */
module.exports.authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer"))
    next(new UnauthorizedError("Authorization required"));
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }
  req.user = payload;
  next();
};
