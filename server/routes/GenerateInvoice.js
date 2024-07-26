const express = require('express');
const { addInvoice, getInvoice } = require('../controllers/GenerateInvoice');
const router = express.Router();

router.post('/addInvoice', addInvoice);
router.get('/getInvoice', getInvoice);

module.exports = router;
