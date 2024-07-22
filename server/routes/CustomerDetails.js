const express = require('express');
const { customerCreate, getCustomerDetails, updatePendingAmt } = require('../controllers/CustomerDetails');
const router = express.Router();

router.post('/customercreate', customerCreate);
router.post('/updatePendingAmt', updatePendingAmt);
router.get('/getcustomerdetails', getCustomerDetails);

module.exports = router;
