//* Imports:
const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const { authorize } = require('../middleware/auth');
// const userRouter = require("./users");
const { getUser, getCurrentUser, addUser, login } = require("../controllers/users");
const { PATH_NOT_FOUND_ERROR } = require('../utils/errors');

//* Re-routing:
router.post("/signin", login);
router.post("/signup", addUser);
router.get("/:id", authorize, getUser);
router.get("/users/me", authorize, getCurrentUser);
router.patch("/users/me", authorize, getCurrentUser);
router.use("/items", clothingItemsRouter);
router.use((req, res) =>
  res.status(PATH_NOT_FOUND_ERROR).send({ message: "Requested resource not found." }),
);

//* Exports:
module.exports = router;
