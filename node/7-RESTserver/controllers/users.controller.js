/**
 * Here we just create functions and export them 
 */
const { response } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/user');
// const { validationResult } = require('express-validator');

const usersGet = async (req = request, res = response) => {

    // const queryParamsValues = req.query;
    // const { q = "The is not q", name = "Not name", apikey = "Not apikey" } = req.query;

    // Return all users from mongo 
    const { limit = 5, from = 0 } = req.query;

    const query = { state: true };

    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));

    // const total = await User.countDocuments(query);

    const [first_promises_total, second_promise_users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        // msg: 'get API - controller',
        // // queryParamsValues
        // q,
        // name,
        // apikey
        // total,
        // users
        // resp
        first_promises_total,
        second_promise_users
    });
}

const usersPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, email, ...allWithOut_password_and_google_email_id } = req.body;

    //Validate against database
    if (password) {
        //Encrypt or hash the password
        const salt = bcryptjs.genSaltSync();//genSaltSync() number of spins to make more complex the encryption | empty means that by default is 10 
        allWithOut_password_and_google_email_id.password = bcryptjs.hashSync(password, salt);
    }

    //Update this register
    const user = await User.findByIdAndUpdate(id, allWithOut_password_and_google_email_id);

    res.json(user);
}

const usersPost = async (req, res = response) => {

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);//json(errors); shows the errors from express validator in user.route.js
    // }

    const { name, email, password, rol } = req.body
    const user = new User({ name, email, password, rol }); // if we send from the client parameters that don't already added in the model, mongoose will ignore them for us 

    // //Check if the email exists
    // const existEmail = await User.findOne({email});
    // if(existEmail){
    //     return res.status(400).json({
    //         msg: 'The email is already registered'
    //     })
    // }


    //Encrypt or hash the password
    const salt = bcryptjs.genSaltSync();//genSaltSync() number of spins to make more complex the encryption | empty means that by default is 10 
    user.password = bcryptjs.hashSync(password, salt);

    //Save into the database
    await user.save(); //function from mongoose to save the content in mongo  

    res.json({
        // msg: 'post API - controller',
        user
    });

    // const { name, age } = req.body
    // /*Destructuring  */

    // res.json({
    //     msg: 'post API - controller',
    //     name,
    //     age
    // });
}

const usersDelete = async (req, res = response) => {
    const { id } = req.params;

    const uid = req.uid;

    //Deleted physically 
    // const user = await User.findByIdAndDelete(id);

    //Correct way to delete or des activate a record
    const user = await User.findByIdAndUpdate(id, { state: false });

    // res.json({
    //     // msg: 'delete API - controller'
    //     id
    // });
    res.json({ user, uid });
}

const usersPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controller'
    });
}



//We need to send many controllers, so in this case is better to export an object 
module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch


}