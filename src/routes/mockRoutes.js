const express = require('express');
const { getMockProducts } = require('../controllers/mockController');

const router = express.Router();

router.get('/mockingproducts', getMockProducts);

module.exports = router;