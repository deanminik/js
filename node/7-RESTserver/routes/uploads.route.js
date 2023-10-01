const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validate-inputs');
const { loadFiles } = require('../controllers/uploads.controller');

const router = Router();

router.post('/', loadFiles);

module.exports = router;