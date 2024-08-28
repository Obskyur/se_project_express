//* Imports:
const router = require('express').Router();
const { getItems, addItem, deleteItem, addLike, deleteLike } = require('../controllers/clothingItems');
const { authorize } = require('../middlewares/auth');
const { validateClothingItem, validateId } = require('../middlewares/validation');

//* Clothing Item routes:
router.get('/', getItems);
router.post('/', validateClothingItem, authorize,  addItem);
router.delete('/:itemId/likes', validateId, authorize,  deleteLike);
router.delete('/:itemId', validateId, authorize, deleteItem);
router.put('/:itemId/likes', validateId, authorize, addLike);

//* Exports:
module.exports = router;