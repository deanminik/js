const { response } = require('express');
const { User, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
];

const searchUsers = async (term = '', resp = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const user = await User.findById(term);
        return resp.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i'); //this means -> be case insensitive so it doesn't matter if this is A or a 

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    const total = await User.count({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    resp.json({
        results: total, users
    });
}

const searchCategories = async (term = '', resp = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const category = await Category.findById(term);
        return resp.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i'); //this means -> be case insensitive so it doesn't matter if this is A or a 

    const category = await Category.find({ name: regex, state: true }); // In this case we only search by the name because in the category model, name is the only important property

    const total = await Category.count({ name: regex, state: true });

    resp.json({
        results: total, category
    });
}

const searchProducts = async (term = '', resp = response) => {
    const isMongoID = ObjectId.isValid(term);
    if (isMongoID) {
        const product = await Product.findById(term)
            .populate('category', 'name');
        return resp.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i'); //this means -> be case insensitive so it doesn't matter if this is A or a 

    const product = await Product.find({ name: regex, state: true }) // In this case we only search by the name because in the category model, name is the only important property
        .populate('category', 'name');
    const total = await Product.count({ name: regex, state: true });

    resp.json({
        results: total, product
    });
}
const search = (req, resp = response) => {

    const { collection_you_want, terms_you_want } = req.params;

    if (!allowedCollections.includes(collection_you_want)) {
        return resp.status(400).json({
            msg: `The collections allowed are: ${allowedCollections}`
        });
    }

    switch (collection_you_want) {
        case 'users':
            searchUsers(terms_you_want, resp);
            break;
        case 'categories':
            searchCategories(terms_you_want, resp);
            break;
        case 'products':
            searchProducts(terms_you_want, resp);
            break;

        default:
            resp.status(500).json({
                msg: ' I forgot to make this search'
            });
    }

    // resp.json({ msg: 'Search....'});
    // resp.json({
    //     collection_you_want, terms_you_want
    // });
}

module.exports = {
    search
}