//* Imports:
const express = require("express");
const { connect } = require("mongoose");
const mainRouter = require("./routes");

//* Constants:
const app = express();
const { PORT = 3001 } = process.env;
const addFakeUser = (req, res, next) => {
  req.user = {
    _id: "65c2b3f22d48aed96347e6c0",
  };
  next();
};

//* Connect to database:
connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("\nConnected to Database.\n"))
  .catch(console.error);

//* Begin listening for requests:
app.listen(PORT, () => {
  console.log(`\nServer running on port ${PORT}.`);
});

//* Handle requests:
app.use(express.json());
app.use("/", addFakeUser, mainRouter);


