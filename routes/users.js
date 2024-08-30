//* Imports:
const router = require("express").Router();
const { authorize } = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");

//* User routes:
router.get("/me", authorize, getCurrentUser);
router.patch("/me", validateUserUpdate, authorize, updateCurrentUser);

//* Exports:
module.exports = router;
