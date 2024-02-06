//* Imports:
const router = require('express').Router();
const { getItems, addItem, deleteItem } = require('../controllers/clothingItems');

//* Clothing Item routes:
router.get('/', getItems);
router.post('/', addItem);
router.delete('/:itemId', deleteItem);

//* Exports:
module.exports = router;