const express = require('express');
const { createbankaccount, Getbankdetails, updateAccountType } = require('../controllers/BankAccount');
const router = express.Router();

router.post('/createbankacc', createbankaccount);
router.get('/getbankdetails', Getbankdetails);
router.post('/updateaccounttype', updateAccountType);
// router.delete('/:id',deleteProduct)

module.exports = router;
