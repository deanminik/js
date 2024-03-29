const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs, validateFileUpload } = require('../middlewares');//I'm calling like this because we have an index file in the middleware directory 
const { loadFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', validateFileUpload, loadFiles);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'The id should be a Mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateInputs
], updateImageCloudinary);
// ], updateImage); 

router.get('/:collection/:id', [
    check('id', 'The id should be a Mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateInputs
], showImage);
module.exports = router;


/*
allowedCollections -> This will be our helper

Inside I'm going to send the collection, represented by -> c , sending by the put method, this is my first argument

The second argument, will be an array [], with users and products. If I need to define more I can add them inside the array

:collection/:id ?-> Waiting for the collection and ID inside the url request 

*/