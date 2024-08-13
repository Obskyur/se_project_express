module.exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  // Set default status code to 500:
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server." : message,
  });
}