const validate_Inputs = require('../middlewares/validate-inputs');
const validate_JWT = require('../middlewares/validate-jwt');
const validate_Roles = require('../middlewares/validate-roles');
const validate_File  = require('../middlewares/validate-file');

//The name of this const can be different, it doesn't matter because we are exporting all using this (...) 


module.exports = {
    ...validate_Inputs,
    ...validate_JWT,
    ...validate_Roles,
    ...validate_File
}

//This file is called INDEX because node, can detect this file using by default index name as a first file to read