/**
 * Here we just create functions and export them 
 */
const { response } = require('express');

const usersGet = (req = request, res = response) => {

    // const queryParamsValues = req.query;
    const {q = "The is not q", name = "Not name", apikey = "Not apikey"} = req.query;

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

const usersPost = (req, res = response) => {

    // const body = req.body

    // res.json({
    //     msg: 'post API - controller',
    //     body
    // });

    const { name, age } = req.body
    /*Destructuring  */

    res.json({
        msg: 'post API - controller',
        name,
        age
    });
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