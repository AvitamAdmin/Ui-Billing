const express = require('express');
const { GetProduct, deleteProduct, productPost } = require('../controllers/Product');
const router = express.Router();

router.post('/postproduct', productPost);
router.get('/getProduct', GetProduct);
router.delete('/:id',deleteProduct)

module.exports = router;
