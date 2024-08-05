const express = require("express");
const {getGrandTotal, getTotalCashFlow, updateCashFlow } = require("../controllers/CashFlow");




const router = express.Router();


router.post('/updateCashFlow', updateCashFlow);
router.get('/grandTotal', getGrandTotal);
router.get('/getTotalCashFlow', getTotalCashFlow);

module.exports = router;