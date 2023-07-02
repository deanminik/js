const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true //if we add more request with the same value, we will get an error

    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String

    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false

    }

});


module.exports = model('User', UserSchema);// this is to create the entity in mongodb, User will becomes in users adding the (s)