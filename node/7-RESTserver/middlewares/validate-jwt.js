const { response, request } = require('express');
const jwt = require('jsonwebtoken');

/*Remember: this middleware validateJWT and other middlewares execute with three arguments
* req
* res   -> to have the typing -tipado using the (response)
* next -> to indicate to someone that is executing this middleware, that you can continue with the next middleware
*/
const validateJWT = (req = request, res = response, next) => {
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

        req.uid = uid;


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