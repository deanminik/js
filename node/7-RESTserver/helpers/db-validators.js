const Role = require('../models/role');
const User = require('../models/user');

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

module.exports = {
    isRoleValid,
    emailExists
}