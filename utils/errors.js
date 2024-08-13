//* Error Status Codes:
const CAST_ERROR = 400;
const VALIDATION_ERROR = 400;
const USER_NOT_FOUND_ERROR = 401;
const AUTH_NOT_FOUND_ERROR = 401;
const REQ_FORBIDDEN = 403;
const DOCUMENT_NOT_FOUND_ERROR = 404;
const PATH_NOT_FOUND_ERROR = 404;
const MONGO_DB_DUPLICATE_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
const MONGO_SERVER_ERROR = 11000;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class RequestForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequestForbiddenError";
    this.statusCode = 403;
  }
}

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
    this.statusCode = 409;
  }
}

//* Exports:
module.exports = {
  BadRequestError,
  DuplicateError,
  NotFoundError,
  RequestForbiddenError,
  ValidationError,
  CAST_ERROR,
  VALIDATION_ERROR,
  DOCUMENT_NOT_FOUND_ERROR,
  PATH_NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
  MONGO_DB_DUPLICATE_ERROR,
  MONGO_SERVER_ERROR,
  USER_NOT_FOUND_ERROR,
  AUTH_NOT_FOUND_ERROR,
  REQ_FORBIDDEN
};
