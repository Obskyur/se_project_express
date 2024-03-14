//* Imports:
const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const { authorize } = require("../middlewares/auth");
const {
  getUser,
  getCurrentUser,
  addUser,
  login,
  updateCurrentUser,
} = require("../controllers/users");
const { PATH_NOT_FOUND_ERROR } = require("../utils/errors");

//* Re-routing:
router.post("/signin", login);
router.post("/signup", addUser);
router.get("/users/me", authorize, getCurrentUser);
router.patch("/users/me", authorize, updateCurrentUser);
router.use("/items", clothingItemsRouter);
router.get("/:id", authorize, getUser);
router.use((req, res) =>
  res
    .status(PATH_NOT_FOUND_ERROR)
    .send({ message: "Requested resource not found." }),
);

//* Exports:
module.exports = router;
