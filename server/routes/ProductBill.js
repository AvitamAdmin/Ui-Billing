const express = require('express');
const { shopBillCreate } = require('../controllers/ProductBill');
const router = express.Router();

router.post('/shopbillcreate', shopBillCreate);

module.exports = router;
