const GenerateInvoice = require("../models/GenerateInvoice");
const StockUpdate = require("../models/Stockupdate");

// exports.addInvoice = async (req, res) => {
//   const {
//     ShopName,
//     shopAddress,
//     mobNum1,
//     mobNum2,
//     creator,
//     selectedCustomer,
//     findpendingamt,
//     totalProductPriceNum,
//     totalamount,
//     billAmount,
//     paidstatus,
//     products,
//   } = req.body;

//   console.log(req.body, "Request Body");

//   try {
//     // Fetch the next bill number
//     const invoiceCount = await GenerateInvoice.countDocuments();
//     const nextBillNo = invoiceCount === 0 ? 1 : invoiceCount + 1;

//     const newInvoice = new GenerateInvoice({
//       ShopName,
//       shopAddress,
//       mobNum1,
//       mobNum2,
//       creator,
//       customerName: selectedCustomer,
//       pendingAmount: findpendingamt,
//       grossAmount: totalProductPriceNum,
//       totalAmount: totalamount,
//       paidstatus,
//       paidamount: billAmount,
//       billNo: `${nextBillNo}`, // Ensure billNo is set correctly
//       Invoice: products,
//     });

//     await newInvoice.save();

//     console.log("Invoice added successfully");
//     res.send({ status: "ok", data: newInvoice });
//   } catch (error) {
//     console.error("Error from addInvoice:", error);
//     res.status(500).send({ status: "Error", error: error.message });
//   }
// };
exports.addInvoice = async (req, res) => {
  const {
    ShopName,
    shopAddress,
    mobNum1,
    mobNum2,
    creator,
    selectedCustomer,
    findpendingamt,
    totalProductPriceNum,
    totalamount,
    billAmount,
    paidstatus,
    products,
  } = req.body;

  console.log(req.body, "Request Body");

  try {
    // Fetch the next bill number
    const invoiceCount = await GenerateInvoice.countDocuments();
    const nextBillNo = invoiceCount === 0 ? 1 : invoiceCount + 1;

    const newInvoice = new GenerateInvoice({
      ShopName,
      shopAddress,
      mobNum1,
      mobNum2,
      creator,
      customerName: selectedCustomer,
      pendingAmount: findpendingamt,
      grossAmount: totalProductPriceNum,
      totalAmount: totalamount,
      paidstatus,
      paidamount: billAmount,
      billNo: `${nextBillNo}`, // Ensure billNo is set correctly
      Invoice: products,
    });

    // Update the stock for each product in the invoice
    for (const product of products) {
      const { productId, quantity } = product;
      const stockUpdate = await StockUpdate.findOne({ productId });

      if (stockUpdate) {
        stockUpdate.currentStock -= Number(quantity); // Ensure quantity is a number
        stockUpdate.totalSales += Number(quantity); // Ensure quantity is a number
        stockUpdate.lastUpdated = new Date();
        await stockUpdate.save();
      } else {
        console.error(`Stock record not found for product ID: ${productId}`);
      }
    }

    await newInvoice.save();

    console.log("Invoice added successfully");
    res.send({ status: "ok", data: newInvoice });
  } catch (error) {
    console.error("Error from addInvoice:", error);
    res.status(500).send({ status: "Error", error: error.message });
  }
};


  exports.getInvoiceCount = async (req, res) => {
    try {
      const invoiceCount = await GenerateInvoice.countDocuments();
      res.send({ status: "ok", data: invoiceCount  });
    } catch (error) {
      console.error("getInvoice failed:", error);
      res.status(500).json({ error: "Internal server error from getInvoice" });
    }
  };
  exports.getInvoice = async (req, res) => {
    try {
      const invoiceCount = await GenerateInvoice.find();
      res.send({ status: "ok", data: invoiceCount  });
    } catch (error) {
      console.error("getInvoice failed:", error);
      res.status(500).json({ error: "Internal server error from getInvoice" });
    }
  };
  


  exports.getTotalGrossAmount = async (req, res) => {
    try {
      const invoices = await GenerateInvoice.find({}, 'grossAmount'); // Fetch all invoices with only the grossAmount field
      const totalGrossAmount = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.grossAmount || 0), 0);
      res.send({ status: "ok", totalGrossAmount });
    } catch (error) {
      console.error("Failed to get total gross amount:", error);
      res.status(500).json({ error: "Internal server error while calculating total gross amount" });
    }
  };


  exports.getIncomingCashPerDay = async (req, res) => {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); // Set to midnight of the current day
  
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day
  
      // Find invoices paid today
      const todayInvoices = await GenerateInvoice.find({
        paidstatus: "Paid",
        creationTime: { $gte: startOfDay, $lte: endOfDay },
      }, 'paidamount');
  
      const incomingCashPerDay = todayInvoices.reduce((sum, invoice) => sum + parseFloat(invoice.paidamount || 0), 0);
  
      res.send({ status: "ok", incomingCashPerDay });
    } catch (error) {
      console.error("Failed to get incoming cash per day:", error);
      res.status(500).json({ error: "Internal server error while calculating incoming cash per day" });
    }
  };


  exports.getTotalPaidAmount = async (req, res) => {
    try {
      const invoices = await GenerateInvoice.find({ paidstatus: "Paid" }, 'paidamount');
      const totalPaidAmount = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.paidamount || 0), 0);
      res.send({ status: "ok", totalPaidAmount });
    } catch (error) {
      console.error("Failed to get total paid amount:", error);
      res.status(500).json({ error: "Internal server error while calculating total paid amount" });
    }
  };