const { response } = require('express');
const { User } = require('../models');
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
        resp.json({
            results: (user) ? [user] : []
        });
    }
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
            break;
        case 'products':
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