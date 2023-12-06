const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getAllBooks, addBook, getOneBook, updateBook, deleteBook } = require("../controllers/books");

router.route("/")
.get(getAllBooks)
.post(addBook);
router.route("/:id")
.get(getOneBook)
.put(updateBook)
.delete(deleteBook);

module.exports = router