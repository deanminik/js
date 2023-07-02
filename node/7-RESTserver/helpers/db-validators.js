const Role = require('../models/role');

const isRoleValid = async (rol = '') => {
    const exitsRol = await Role.findOne({ rol });
    if (!exitsRol) {
        throw new Error(`The role ${rol} is not registered in the database`);
    }
}


module.exports = {
    isRoleValid
}