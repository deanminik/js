const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

/**
 * {{url}}/api/categories
 */

// Endpoint to get all categories - Public 
router.get('/',(req, res) => {
    res.json('this is a get');
});

//Endpoint to get just one category by id - Public
router.get('/:id',(req, res) => {
    res.json('this is a get by ID');
});

//Endpoint to create a new category - private -> Only someone with a valid token 
router.post('/',(req, res) => {
    res.json('this is a post');
});

//Endpoint to update a register using an id - private -> Only someone with a valid token 
router.put('/:id',(req, res) => {
    res.json('this is a put');
});

//Endpoint to delete a category using an id - Only Admin can call this endpoint 
router.delete('/:id',(req, res) => {
    res.json('this is a delete -> we do not delete, just update the state ');
});
module.exports = router;