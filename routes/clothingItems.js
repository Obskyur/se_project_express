//* Imports:
const router = require("express").Router();
const {
  getItems,
  addItem,
  deleteItem,
  addLike,
  deleteLike,
} = require("../controllers/clothingItems");
const { authorize } = require("../middlewares/auth");
const {
  validateClothingItem,
  validateId,
} = require("../middlewares/validation");

//* Clothing Item routes:
router.get("/", getItems);
router.post("/", authorize, validateClothingItem, addItem);
router.delete("/:itemId/likes", authorize, validateId, deleteLike);
router.delete("/:itemId", authorize, validateId, deleteItem);
router.put("/:itemId/likes", authorize, validateId, addLike);

//* Exports:
module.exports = router;
