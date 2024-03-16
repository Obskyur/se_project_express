//* Imports:
const router = require("express").Router();
const { authorize } = require("../middlewares/auth");
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

//* User routes:
router.get("/me", authorize, getCurrentUser);
router.patch("/me", authorize, updateCurrentUser);

//* Exports:
module.exports = router;
