const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockUpdateSchema = new Schema({
  stock: { type: Number, required: true },
  purchase: { type: Number, required: true },
  sales: { type: Number, required: true },
  productName: { type: String, required: true },
  creator: { type: String, required: true },
  status: { type: Boolean, default: true },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: "com.avitam.billing.model.StockUpdate" }
});

const StockUpdate = mongoose.model('StockUpdate', stockUpdateSchema);

module.exports = StockUpdate;
