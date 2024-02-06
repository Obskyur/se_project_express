// Imports:
const router = require('express').Router();
const userRouter = require('./users');

// Paths to handlers:
router.use('/users', userRouter);

// Exports:
module.exports = router;