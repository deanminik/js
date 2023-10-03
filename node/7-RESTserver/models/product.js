const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    //name-> has to be the same name from the collection in mongo 
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,// To make reference which category belongs | useful is we forget to send the category this sends a msg
        ref: 'Category',
        required: true
    },
    description: { type: String },
    available: { type: Boolean, default: true },
    img: { type: String },
});

ProductSchema.methods.toJSON = function () {
    //It is important to user function instead () => arrow function, because we need to use the object "this"
    // the arrow function keep "this" out side of itself. So use "function" to make a reference to the instance created 

    const { __v, state, ...data } = this.toObject();
    return data;

    /**
     * what is this? __v, state
     * I am taking __v, state outside and the all variables like name,  etc are saving inside the new variable called ...data 
     */


}

module.exports = model('Product', ProductSchema);