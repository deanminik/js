const { response } = require('express');//To help us with the typing->tipado 
const { Category } = require('../models');


const createCategory = async (req, resp = response) => {

    //we read name that is coming from the body and capitalize
    const name = req.body.name.toUpperCase();

    //If there a category with that name, send an error
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
        return resp.status(400).json({
            msg: `The category ${categoryDB.name}, already exists`
        });
    }

    //Generate the data to save 
    const data = {
        name,
        user: req.user._id //this should have to be a user from mongo, the jwt has the data to now that in the payload 

    }

    //create the new category
    const category = new Category(data);
    //save DB
    await category.save();

    //send us a response to now that everything is ok 
    resp.status(201).json(category);

}

const getCategories = async (req, resp = response) => {
    /* his should have pagination 
    * Total of the pagination
    * Create an object called populate this belongs to mongoose, useful to indicate who saved 
    */

    //--------------------------------Pagination 

    // Return all categories from mongo 
    const { limit = 5, from = 0 } = req.query;

    const query = { state: true }; // bring me only with the state active


    const [first_promises_total, second_promise_categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    resp.json({    
        first_promises_total,
        second_promise_categories
    });


}

const getCategoryByID = async (req, resp = response) => {
    //Extract the ID that is coming from the request 
    const {id} = req.params;
    const category = await Category.findById(id).populate('user','name');

    resp.json(category);
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryByID
}