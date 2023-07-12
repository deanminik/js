const validate_Inputs = require('../middlewares/validate-inputs');
const validate_JWT = require('../middlewares/validate-jwt');
const validate_Roles = require('../middlewares/validate-roles');


module.exports = {
    ...validate_Inputs,
    ...validate_JWT,
    ...validate_Roles,
}

//This file is called INDEX because node, can detect this file using by default index name as a first file to read