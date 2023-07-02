const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    //role-> has to be the same name from the collection in mongo 
    role: {
        type: String,
        required: [true, 'The role is required']
    }

});


module.exports = model('Role', RoleSchema);