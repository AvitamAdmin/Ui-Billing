const express = require('express');
const {
  updateCashFlow,
  getTotalCashFlow,
  updateGrandTotal,
  getGrandTotal,
  getBorrowingCash, // Corrected the function name
  updateTodayIncome,
  updateClosingAmount,
  getTodayIncome, // Add missing import for getting today's income
} = require('../controllers/CashFlow');
const router = express.Router();

router.post('/updateCashFlow', updateCashFlow);
router.get('/getTotalCashFlow', getTotalCashFlow);
router.post('/updateGrandTotal', updateGrandTotal);
router.get('/getGrandTotal', getGrandTotal);
router.get('/getBorrowingCash', getBorrowingCash); // Corrected the route and function name
router.post('/updateIncome', updateTodayIncome); // Consistent naming
router.get('/getTodayIncome', getTodayIncome); // Add route for getting today's income
router.post('/updateClosingAmount', updateClosingAmount);

module.exports = router;