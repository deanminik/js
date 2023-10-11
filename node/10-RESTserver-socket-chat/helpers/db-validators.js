const Role = require('../models/role');
const {
    User,
    Category,
    Product } = require('../models');

const isRoleValid = async (rol = '') => {
    const exitsRol = await Role.findOne({ rol });
    if (!exitsRol) {
        throw new Error(`The role ${rol} is not registered in the database`);
    }
}

const emailExists = async (email = '') => {
    //Check if the email exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`The email: ${email} is already registered`);
    }
}

const existsUserById = async (id = '') => {
    //Check if the email exists
    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`The id: ${id} doesn't exist`);
    }
}

/**
 * 
 * **********************************************Custom validators of categories 
 */
const existsCategoryById = async (id = '') => {
    //Check if the email exists
    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`The id: ${id} doesn't exist`);
    }
}

const existsProductById = async (id = '') => {
    //Check if the email exists
    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`The id: ${id} doesn't exist`);
    }
}

/**
 * Validate allowed collections
 */

const allowedCollections = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`This collection ${collection} is not allowed. Here are the allowed collections: ${collections}`);
    }

    return true;
}

module.exports = {
    isRoleValid,
    emailExists,
    existsUserById,
    existsCategoryById,
    existsProductById,
    allowedCollections
}