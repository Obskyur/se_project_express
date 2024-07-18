//* Imports:
const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes");

//* Constants:
const app = express();
const { PORT = 3001 } = process.env;

//* Connect to database:
connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("\nConnected to Database.\n"))
  .catch(console.error);

//* Begin listening for requests:
app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}.`);
});

//* Handle requests:
app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
