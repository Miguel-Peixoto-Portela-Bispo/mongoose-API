const express = require("express");
const app = express();
const mongoose = require("mongoose");
const booksRoute = require("./routes/books");
const categoriesRoute = require("./routes/categories");

app.use(express.json());
app.use("/books", booksRoute);
app.use("/categories", categoriesRoute);
app.use("*", express.static("public"));

mongoose.connect("mongodb://0.0.0.0/bookstore");

app.listen(5000)