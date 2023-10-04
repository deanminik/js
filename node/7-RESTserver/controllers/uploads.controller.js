const { response } = require('express');//To help us with the typing->tipado 
const path = require('path');//Remember path comes already from Node
const fs = require('fs');//Remember path comes already from Node fs-> File system
const { v4: uuidv4 } = require('uuid');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');



const loadFiles = async (req, resp = response) => {

    try {
        const name = await uploadFile(req.files, ['txt', 'md'], 'myFolder');
        resp.json({ name });

    } catch (msg) {
        resp.status(400).json({ msg });
    }



}

const updateImage = async (req, resp = response) => {

    const { id, collection } = req.params;
    let model;
    //Here we validated the users or products 
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return resp.status(400).json({
                    msg: `There is not a user with this ID: ${id} `
                });
            }

            break;
        case 'products':
            model = await Product.findById(id);
            if (!model) {
                return resp.status(400).json({
                    msg: `There is not a product with this ID: ${id} `
                });
            }

            break;

        default:
            return resp.status(500).json({ msg: 'I forgot to validate this' });
    }

    // Clean preview images
    if (model.img) {//See if the property img exists
        //Delete the image from the server
        const pathImagen = path.join(__dirname, '../uploads', collection, model.img);//collection -> to see if this is a users directory, products etc

        //If the file exists, then delete it 
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen);
        }


    }

    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    resp.json(model);
}

const showImage = (req, resp = response) => {
    
    const { id, collection } = req.params;

    resp.json({
        id,
        collection
    })
};

module.exports = {
    loadFiles,
    updateImage,
    showImage
}