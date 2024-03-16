//* Imports:
const router = require('express').Router();
const { authorize } = require("../middlewares/auth");
const {
  getUser,
  getUsers,
  getCurrentUser,
  addUser,
  updateCurrentUser,
} = require("../controllers/users");

//* User routes:
router.get('/', getUsers);
router.post('/', addUser);
router.get("/me", authorize, getCurrentUser);
router.patch("/me", authorize, updateCurrentUser);
router.get('/:userId', getUser);

//* Exports:
module.exports = router;