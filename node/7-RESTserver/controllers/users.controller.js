/**
 * Here we just create functions and export them 
 */
const { response } = require('express');

const usersGet = (req, res = response) => {

    res.json({
        msg: 'get API - controller'
    });
}

const usersPut = (req, res = response) => {

    res.json({
        msg: 'put API - controller'
    });
}

const usersPost = (req, res = response) => {

    res.json({
        msg: 'post API - controller'
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