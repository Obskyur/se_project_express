//* Imports:
const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const userRouter = require("./users");
const { addUser, login } = require("../controllers/users");
const { PATH_NOT_FOUND_ERROR, NotFoundError } = require("../utils/errors");
const { validateLogin, validateUser } = require("../middlewares/validation");

//* Re-routing:
router.post("/signin", validateLogin, login);
router.post("/signup", validateUser, addUser);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.use((req, res, next) =>
  next(new NotFoundError("Requested resource not found.")),
);

//* Exports:
module.exports = router;
