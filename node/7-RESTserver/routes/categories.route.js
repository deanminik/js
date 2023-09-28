const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createCategory,
    getCategories,
    getCategoryByID,
    updateCategory } = require('../controllers/categories.controllers');
const { existsCategoryById } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/categories
 */

// Endpoint to get all categories - Public 
router.get('/', getCategories);

//Endpoint to get just one category by id - Public
router.get('/:id', [
    check('id', 'This is not a MONGO ID').isMongoId(),
    check('id').custom(existsCategoryById),
    validateInputs
], getCategoryByID);

//Endpoint to create a new category - private -> Only someone with a valid token 
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateInputs
], createCategory);

//Endpoint to update a register using an id - private -> Only someone with a valid token 
router.put('/:id', [
    validateJWT,
    check('name', 'The name is mandatory').not().isEmpty(),
    check('id').custom(existsCategoryById),
    validateInputs
], updateCategory);

//Endpoint to delete a category using an id - Only Admin can call this endpoint 
router.delete('/:id', (req, res) => {
    res.json('this is a delete -> we do not delete, just update the state ');
});
module.exports = router;