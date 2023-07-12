const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/*Remember: this middleware validateJWT and other middlewares execute with three arguments
* req
* res   -> to have the typing -tipado using the (response)
* next -> to indicate to someone that is executing this middleware, that you can continue with the next middleware
*/
const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    // console.log(token);

    if (!token) {
        return res.status(401).json({
            msg: 'There is not token in the request'
        });
    }
    try {

        //    const payload =  jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //    console.log(payload);

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Read the user that belongs to uid
        const user = await User.findById(uid);//There is a user, and everything is ok 

        req.user = user;


        next();//Go with the next middleware | For example this one  check('id', 'Is not a valid ID').isMongoId() etc
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'This token is not valid'
        });

    }

    
}

module.exports = {
    validateJWT
}