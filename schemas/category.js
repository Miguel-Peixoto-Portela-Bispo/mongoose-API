const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    booksNumber: {
        type: Number,
        required: true,
        default: ()=>0,
        validate: {
            validator: v=>v>=0,
            message: "Books number cannot be less than 0."
        }
    }
});

module.exports = mongoose.model("categories", categorySchema);