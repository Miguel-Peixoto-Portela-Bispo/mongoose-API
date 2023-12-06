require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const booksRoute = require("./routes/books");
const categoriesRoute = require("./routes/categories");
const port = process.env.PORT||5000;

app.use(express.json());
app.use("/books", booksRoute);
app.use("/categories", categoriesRoute);
app.use("*", express.static("public"));

mongoose.connect(process.env.ATLAS_URI);

app.listen(port);