const express = require("express");
const mongoose = require("mongoose");

// Child schema
const childSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  sellingPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  bag: { type: Number, required: true },
});

// Parent schema with the nested array and bill number
const billInvoice = new mongoose.Schema({
  ShopName: { type: String, required: true },
  shopAddress: { type: String, required: true },
  mobNum1: { type: String, required: true },
  mobNum2: { type: String, required: true },
  creator: { type: String, required: true },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: 'com.avitam.billing.model.Customer' },
  customerName: { type: String, required: true },
  paidstatus: { type: String },
  paidamount: { type: String },
  pendingAmount: { type: String },
  grossAmount: { type: String },
  totalAmount: { type: String },
  Invoice: [childSchema], // Renamed 'device' to 'devices'
  billNo: { type: String, unique: true }, 
});

// Pre-save middleware to generate a unique bill number
// billInvoice.pre('save', async function(next) {
//   const invoice = this;
//   if (invoice.isNew) {
//     try {
//       const lastInvoice = await GenerateInvoice.findOne().sort({ creationTime: -1 });
//       const lastBillNo = lastInvoice ? parseInt(lastInvoice.billNo.split('-')[1], 10) : 0;
//       invoice.billNo = `${lastBillNo + 1}`;
//     } catch (error) {
//       return next(error);
//     }
//   }
//   next();
// });

const GenerateInvoice = mongoose.model('invoice', billInvoice);

module.exports = GenerateInvoice;
