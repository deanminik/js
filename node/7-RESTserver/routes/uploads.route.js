const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs, validateFileUpload } = require('../middlewares');//I'm calling like this because we have an index file in the middleware directory 
const { loadFiles, updateImage } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateFileUpload, loadFiles);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'The id should be a Mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateInputs
], updateImage)

module.exports = router;


/*
allowedCollections -> This will be our helper

Inside I'm going to send the collection, represented by -> c , sending by the put method, this is my first argument

The second argument, will be an array [], with users and products. If I need to define more I can add them inside the array


*/