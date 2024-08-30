class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "RequestForbiddenError";
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
