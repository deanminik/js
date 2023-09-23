const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

/**
 * {{url}}/api/categories
 */

router.get('/',(req, res) => {
    res.json("This is just to test our route | everything ok");
})

module.exports = router;