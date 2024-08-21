//* Imports:
const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { addUser, login } = require("../controllers/users");
const { PATH_NOT_FOUND_ERROR } = require("../utils/errors");

//* Crash testing:
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

//* Re-routing:
router.post("/signin", login);
router.post("/signup", addUser);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.use((req, res) =>
  res
    .status(PATH_NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found." }),
);

//* Exports:
module.exports = router;
