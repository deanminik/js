/**
 * Here we just create functions and export them 
 */
const { response } = require('express');

const User = require('../models/user');

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

    const body = req.body
    const user = new User(body); // if we send from the client parameters that don't already added in the model, mongoose will ignore them for us 

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