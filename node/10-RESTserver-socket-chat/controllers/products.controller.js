const { response } = require('express');//To help us with the typing->tipado 
const { Product } = require('../models');


const createProduct = async (req, resp = response) => {

    //here we are going to take out or ignore the state and user, because they cannot change. 
    const { state, user, ...body } = req.body;

    //If there a product with that name, send an error
    const productDB = await Product.findOne({ name: body.name });
    if (productDB) {
        return resp.status(400).json({
            msg: `The product ${productDB.name}, already exists`
        });
    }

    //Generate the data to save 
    const data = {
        ...body, // here we have the name, price etc 
        name: body.name.toUpperCase(),
        user: req.user._id //this should have to be a user from mongo, the jwt has the data to now that in the payload 

    }

    //create the new category
    const product = new Product(data);
    //save DB
    await product.save();

    //send us a response to now that everything is ok 
    resp.status(201).json(product);

}

const getProducts = async (req, resp = response) => {
    /* his should have pagination 
    * Total of the pagination
    * Create an object called populate this belongs to mongoose, useful to indicate who saved 
    */

    //--------------------------------Pagination 

    // Return all Products from mongo 
    const { limit = 5, from = 0 } = req.query;

    const query = { state: true }; // bring me only with the state active


    const [first_promises_total, second_promise_products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    resp.json({
        first_promises_total,
        second_promise_products
    });


}

const getProductByID = async (req, resp = response) => {
    //Extract the ID that is coming from the request 
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('user', 'name');

    resp.json(product);
}

const updateProduct = async (req, resp = response) => {
    //Here we already now that we have an ID from an validated object 
    const { id } = req.params;
    /*
    Maybe someone is trying to send the state and user properties to update. Those
    values could come in the request, and those will be accepted because we have 
    in our models those fields.
    So we need to avoid that 
    */
    const { state, user, ...data } = req.body;
    //Save the name of the product 
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id; //Now stablish the user, so we can keep the last user detected 
    const product = await Product.findByIdAndUpdate(id, data, { new: true }); // This {new:true} is useful if you want to see the new change on the answer

    resp.json(product);// If we get the message from here, it means we got an excellent result;

}

const deleteProduct = async (req, resp = response) => {
    //Here we just need the ID to see which elements can we delete 
    const { id } = req.params;
    const productDeleted = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

    resp.json(productDeleted);
}

module.exports = {
    createProduct,
    getProducts,
    getProductByID,
    updateProduct,
    deleteProduct
}