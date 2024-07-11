const express = require('express');
const { customerCreate, getCustomerDetails } = require('../controllers/CustomerDetails');
const router = express.Router();

router.post('/customercreate', customerCreate);
router.get('/getcustomerdetails', getCustomerDetails);

module.exports = router;
