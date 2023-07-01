const { Router } = require('express');
const { usersGet,
     usersPut,
    usersPost,
    usersDelete,
    usersPatch } = require('../controllers/users.controller');

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

router.post('/', usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);


module.exports = router;