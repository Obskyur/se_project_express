// Imports:
const router = require('express').Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');

// Paths to handlers:
router.use('/users', userRouter);
router.use('/items', clothingItemsRouter);

// Exports:
module.exports = router;