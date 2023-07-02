const { validationResult } = require('express-validator');

const validateInputs = (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);//json(errors); shows the errors from express validator in user.route.js
    }

    next();//If we can arrive here, please go to next middleware for example in user.route we see this | check('email', 'The email is not valid').isEmail() so if everything is ok go next to this    check('name', 'The name is required').not().isEmpty() etc...
    //When there are not more middlewares then execute the controller, for example usersPost 
}


module.exports = {
    validateInputs
}