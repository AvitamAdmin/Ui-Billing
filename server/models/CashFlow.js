const mongoose = require('mongoose');

const cashFlowSchema = new mongoose.Schema({
  incomingCash: { type: Number, default: 0 },
  outgoingCash: { type: Number, default: 0 },
  borrowingCash: { type: Number, default: 0 },
});



const CashFlow = mongoose.model('CashFlow', cashFlowSchema);

module.exports = CashFlow;