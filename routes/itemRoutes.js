const express = require("express");

const router = express.Router();
const itemController = require("./../controllers/itemController");

router.route("/").post(itemController.addItem).get(itemController.getAllItems);
router
  .route("/:id")
  .get(itemController.getItem)
  .delete(itemController.deleteItem)
  .patch(itemController.updateItem);

module.exports = router;
