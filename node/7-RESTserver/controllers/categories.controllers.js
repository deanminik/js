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


module.exports = {
    createCategory
}