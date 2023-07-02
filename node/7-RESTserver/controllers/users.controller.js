/**
 * Here we just create functions and export them 
 */
const { response } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/user');
// const { validationResult } = require('express-validator');

const usersGet = (req = request, res = response) => {

    // const queryParamsValues = req.query;
    const { q = "The is not q", name = "Not name", apikey = "Not apikey" } = req.query;

    res.json({
        msg: 'get API - controller',
        // queryParamsValues
        q,
        name,
        apikey
    });
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
    });
}

const usersPost = async (req, res = response) => {

    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     return res.status(400).json(errors);//json(errors); shows the errors from express validator in user.route.js
    // }

    const { name, email, password, rol } = req.body
    const user = new User({ name, email, password, rol }); // if we send from the client parameters that don't already added in the model, mongoose will ignore them for us 

    //Check if the email exists
    const existEmail = await User.findOne({email});
    if(existEmail){
        return res.status(400).json({
            msg: 'The email is already registered'
        })
    }


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

const usersDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controller'
    });
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