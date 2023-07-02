const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch } = require('../controllers/users.controller');
const { validate } = require('../models/user');
const { validateInputs } = require('../middlewares/validate-inputs');// remember a middleware if just a function to execute before a controller 

const Role = require('../models/role');


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

validateInputsMiddlewares = [
    check('email', 'The email is not valid').isEmail(),
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The password is required and more than 6 letters').isLength({ min: 6 }).not().isEmpty(),
    // check('rol', 'This rol is not valid').isIn(['ADMIN_ROLE','USER_ROLE']).not().isEmpty(),
    check('rol').custom(async (rol = '') => {
        const exitsRol = await Role.findOne({rol});
        if (!exitsRol) {
            throw new Error(`The role ${rol} is not registered in the database`);
        }
    }),
    validateInputs// if this middleware approve the checks then execute the controller example: usersPost if not then do not execute the controller 

];
router.post('/', validateInputsMiddlewares, usersPost);
// the middleware goes between the path / and controller and inside an array in case there are more validations 

router.delete('/', usersDelete);

router.patch('/', usersPatch);


module.exports = router;