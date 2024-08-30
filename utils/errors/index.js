const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const NotFoundError = require('./NotFoundError');
const UnauthorizedError = require('./UnauthorizedError');
const ValidationError = require('./ValidationError');

module.exports = {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError
};