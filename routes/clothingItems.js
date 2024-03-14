//* Imports:
const router = require('express').Router();
const { getItems, addItem, deleteItem, addLike, deleteLike } = require('../controllers/clothingItems');
const { authorize } = require('../middlewares/auth');

//* Clothing Item routes:
router.get('/', getItems);
router.post('/', authorize, addItem);
router.delete('/:itemId/likes', authorize, deleteLike);
router.delete('/:itemId', authorize, deleteItem);
router.put('/:itemId/likes', authorize, addLike);

//* Exports:
module.exports = router;