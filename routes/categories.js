const express = require("express");
const { getAllCategories, addCategory, getOneCategory, updateCategory, deleteCategory } = require("../controllers/categories");
const router = express.Router();

router.route("/")
.get(getAllCategories)
.post(addCategory)
router.route("/:id")
.get(getOneCategory)
.put(updateCategory)
.delete(deleteCategory);

module.exports = router;