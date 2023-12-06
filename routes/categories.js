const express = require("express");
const router = express.Router();
const CategoryModel = require("../schemas/category");
const mongoose = require("mongoose");

router.route("/")
.get(async (req, res)=>
{
    res.json(await CategoryModel.find());
})
.post(async (req, res)=>
{
    const { name, booksNumber } = req.body;

    const category = new CategoryModel({ name, booksNumber });

    res.json(await category.save());
})
router.route("/:id")
.get(async (req, res)=>
{
    if(!(mongoose.Types.ObjectId.isValid(req.params.id))||!(await CategoryModel.exists({_id: req.params.id})))
    {
        return res.json({error: `Couldn't find category with id: ${req.params.id}`});
    }

    res.json(await CategoryModel.findById(req.params.id));
})
.put(async (req, res)=>
{
    if(!(mongoose.Types.ObjectId.isValid(req.params.id))||!(await CategoryModel.exists({_id: req.params.id})))
    {
        return res.json({error: `Couldn't update category with id: ${req.params.id}`});
    }

    const { name, booksNumber } = req.body;

    const category = await CategoryModel.findById(req.params.id);

    category.name = name||category.name;
    category.booksNumber = booksNumber||category.booksNumber;

    res.json(await category.save());
})
.delete(async (req, res)=>
{
    if(!(mongoose.Types.ObjectId.isValid(req.params.id))||!(await CategoryModel.exists({_id: req.params.id})))
    {
        return res.json({error: `Couldn't delete category with id: ${req.params.id}`});
    }

    res.json(await CategoryModel.deleteOne({ _id: req.params.id }));
});

module.exports = router;