

const mongoose = require('mongoose');

const cashFlowSchema = new mongoose.Schema({

  outgoingCash: { type: Number, default: 0 },
  borrowingCash: { type: Number, default: 0 },
  todaysIncome: { type: Number, default: 0 },
  closingAmount: { type: Number, default: 0 }
});

const CashFlow = mongoose.model('CashFlow', cashFlowSchema);

module.exports = CashFlow;