const express = require('express');
const {addInvoice, getInvoice, getTotalGrossAmount} = require('../controllers/GenerateInvoice');
const router = express.Router();

router.post('/addInvoice', addInvoice);
router.get('/getInvoice', getInvoice);
router.get('/totalgrossamount', getTotalGrossAmount);

module.exports = router;
