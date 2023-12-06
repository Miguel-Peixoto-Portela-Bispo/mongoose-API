const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    pagesNumber: {
        type: Number,
        required: true,
        validate: {
            validator: v=>v>0,
            message: "Pages number cannot be less than 1."
        }
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
})

module.exports = mongoose.model("books", bookSchema);