//* Imports:
const router = require('express').Router();
const { getItems, addItem, deleteItem, addLike, deleteLike } = require('../controllers/clothingItems');

//* Clothing Item routes:
router.get('/', getItems);
router.post('/', addItem);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', addLike);
router.delete('/:itemId/likes', deleteLike);

//* Exports:
module.exports = router;