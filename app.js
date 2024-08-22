//* Imports:
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes");
const { errorHandler } = require("./middlewares/error-handler");

require("dotenv").config();

//* Constants:
const app = express();
const { PORT = 3001 } = process.env;

//* Connect to database:
connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("\nConnected to Database.\n"))
  .catch(console.error);

//* Crash testing:
/* app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
}); */

//* Begin listening for requests:
app.use(cors());
app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}.`);
});

//* Handle requests:
app.use(express.json());

// Log requests:
app.use(requestLogger);

// Routes:
app.use("/", mainRouter);

// Handle errors:
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
