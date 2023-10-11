const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');
const { createProduct,
    getProducts,
    getProductByID,
    updateProduct,
    deleteProduct } = require('../controllers/products.controller');
const { existsCategoryById, existsProductById } = require('../helpers/db-validators');
const { isAdminRole } = require('../middlewares');


const router = Router();

/**
 * {{url}}/api/products
 */

// Endpoint to get all products - Public 
router.get('/', getProducts);

//Endpoint to get just one product by id - Public
router.get('/:id', [
    check('id', 'This is not a MONGO ID').isMongoId(),
    check('id').custom(existsProductById),
    validateInputs
], getProductByID);

//Endpoint to create a new product - private -> Only someone with a valid token 
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'This is not a MONGO ID').isMongoId(),
    check('category').custom(existsCategoryById),
    validateInputs
], createProduct);

//Endpoint to update a register using an id - private -> Only someone with a valid token 
router.put('/:id', [
    validateJWT,
    // check('category', 'This is not a MONGO ID').isMongoId(),
    check('id').custom(existsProductById),
    validateInputs
], updateProduct);

//Endpoint to delete a product using an id - Only Admin can call this endpoint 
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'This is not a MONGO ID').isMongoId(),
    check('id').custom(existsProductById),
    validateInputs
], deleteProduct);


module.exports = router;