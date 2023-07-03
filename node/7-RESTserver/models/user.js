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

UserSchema.methods.toJSON = function () {
    //It is important to user function instead () => arrow function, because we need to use the object "this"
    // the arrow function keep "this" out side of itself. So use "function" to make a reference to the instance created 

    const { __v, password, ...user } = this.toObject();
    return user;

    /**
     * what is this? __v, password, ...user
     * I am taking __v, password outside and the all variables like name, email etc are saving inside the new variable called ...user 
     */


}

module.exports = model('User', UserSchema);// this is to create the entity in mongodb, User will becomes in users adding the (s)