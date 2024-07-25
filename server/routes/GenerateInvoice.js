const express = require('express');
const { addInvoice } = require('../controllers/GenerateInvoice');
const router = express.Router();

router.post('/addInvoice', addInvoice);

module.exports = router;
