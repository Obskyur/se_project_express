// Imports:
const router = require('express').Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');

// Re-routing:
router.use('/users', userRouter);
router.use('/items', clothingItemsRouter);

// Exports:
module.exports = router;