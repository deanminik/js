const { Router } = require('express');
const { search } = require('../controllers/search.controller');

const router = Router();


router.get('/:collection_you_want/:terms_you_want', search);


module.exports = router;