const express = require("express");
const mongoose = require("mongoose");

// Your child schema
const childSchema = new mongoose.Schema({
  productId: { type: String },
  productName: { type: String,},
  sellingPrice: { type: Number, },
  quantity: { type: Number, },
  totalPrice: { type: Number, },
  bag: { type: Number, },
});

// Your parent schema with the nested array
const billInvoice = new mongoose.Schema({
  ShopName: {type:String,required:true},
  shopAddress: {type:String,required:true},
  mobNum1: {type: String, required: true},
  mobNum2: {type: String, required: true},
  creator: { type: String, required: true },
  creationTime: { type: Date, default: Date.now },
  lastModified: { type: Date, default: Date.now },
  _class: { type: String, default: 'com.avitam.billing.model.Customer' },
  customerName: { type: String, required: true },
  paid: { type: String },
  pendingAmount: { type: String },
  grossAmount: { type: String },
  totalAmount: { type: String },
  Invoice: [childSchema], // Renamed 'device' to 'devices'
});

const GenerateInvoice = mongoose.model('invoice', billInvoice);

module.exports = GenerateInvoice;




