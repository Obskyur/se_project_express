//* Imports:
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { AUTH_NOT_FOUND_ERROR } = require("../utils/errors");

/* eslint-disable consistent-return */
module.exports.authorize = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer"))
    return res.status(AUTH_NOT_FOUND_ERROR).send({ message: "Authorization required." });
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(AUTH_NOT_FOUND_ERROR).send({ message: "Authorization required" });
  }
  req.user = payload;
  next();
};
