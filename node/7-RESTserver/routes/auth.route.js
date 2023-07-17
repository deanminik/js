const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

router.post('/login', [
    check('email','The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateInputs
],login);

router.post('/google', [
    check('id_token', 'The id_token is required').not().isEmpty(),
    validateInputs
],googleSignIn);

module.exports = router;