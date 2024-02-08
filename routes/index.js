//* Imports:
const router = require("express").Router();
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { PATH_NOT_FOUND_ERROR } = require('../utils/errors');

//* Re-routing:
router.use("/users", userRouter);
router.use("/items", clothingItemsRouter);
router.use((req, res) =>
  res.status(PATH_NOT_FOUND_ERROR).send({ message: "Requested resource not found." }),
);

//* Exports:
module.exports = router;
