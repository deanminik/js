const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch } = require('../controllers/users.controller');
const { validate } = require('../models/user');



const router = Router();

// router.get('/', (req, res) => {
//     // res.json('Hello World');//send -> return a json data 

//     //Normally we send an object like router:
//     res.json({
//         msg: 'get API'
//     });
// });

router.get('/', usersGet); //usersGet why without (), because I am sending the reference, not executing 

router.put('/:id', usersPut);

// router.post('/', usersPost);

validateInputsMiddleware = [check('email', 'The email is not valid').isEmail()];
router.post('/', validateInputsMiddleware, usersPost);
// the middleware goes between the path / and controller and inside an array in case there are more validations 

router.delete('/', usersDelete);

router.patch('/', usersPatch);


module.exports = router;