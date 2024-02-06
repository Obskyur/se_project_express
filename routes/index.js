//* Imports:
const router = require('express').Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingItems');

//* Re-routing:
router.use('/users', userRouter);
router.use('/items', clothingItemsRouter);
router.use((req, res) =>
  res.status(500).send({ message: "Requested resource not found." })
);

//* Exports:
module.exports = router;