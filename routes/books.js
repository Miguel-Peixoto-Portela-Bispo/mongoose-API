const express = require("express");
const router = express.Router();
const BookModel = require("../schemas/book");
const CategoryModel = require("../schemas/category");
const mongoose = require("mongoose");

router.route("/")
.get(async (req, res)=>
{
    res.json(await BookModel.find());
})
.post(async (req, res)=>
{
    const { title, pagesNumber, categoryId } = req.body;

    const book = new BookModel({ title, pagesNumber, categoryId });

    const category = await CategoryModel.findById(categoryId);

    if(!category)
    {
        return res.json({error: `Couldn't find category with id: ${categoryId}`});
    }

    category.booksNumber++;
    
    await category.save();

    res.json(await book.save());
});
router.route("/:id")
.get(async (req, res)=>
{
    if(!(mongoose.Types.ObjectId.isValid(req.params.id))||!(await BookModel.exists({_id: req.params.id})))
    {
        return res.json({error: `Couldn't find book with id: ${req.params.id}`});
    }

    res.json(await BookModel.findById(req.params.id));
})
.put(async (req, res)=>
{
    if(!(mongoose.Types.ObjectId.isValid(req.params.id))||!(await BookModel.exists({_id: req.params.id})))
    {
        return res.json({error: `Couldn't update book with id: ${req.params.id}`});
    }

    const { title, pagesNumber, categoryId } = req.body;

    const book = await CategoryModel.findById(req.params.id);

    book.title = title||book.title;
    book.pagesNumber = pagesNumber||book.pagesNumber;
    book.pagesNumber = categoryId||book.categoryId;

    res.json(await book.save());
})
.delete(async (req, res)=>
{
    if(!(mongoose.Types.ObjectId.isValid(req.params.id))||!(await BookModel.exists({_id: req.params.id})))
    {
        return res.json({error: `Couldn't delete book with id: ${req.params.id}`});
    }

    const book = await BookModel.findById(req.params.id);

    const category = await CategoryModel.findById(book.categoryId);

    category.booksNumber--;
    
    await category.save();

    res.json(await BookModel.deleteOne({ _id: req.params.id }));
});

module.exports = router