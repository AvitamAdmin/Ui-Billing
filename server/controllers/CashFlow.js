const CashFlow = require("../models/CashFlow");





// Helper function to get or create a cash flow record
const getOrCreateCashFlow = async () => {
  let cashFlow = await CashFlow.findOne(); // Find an existing cash flow record
  if (!cashFlow) {
    cashFlow = new CashFlow(); // Create a new cash flow record if none exists
  }
  return cashFlow;
};

exports.updateCashFlow = async (req, res) => {
  const { amount, type } = req.body;

  try {
    if (amount == null || !type) {
      return res.status(400).json({ status: "error", error: "Missing amount or type" });
    }

    // Fetch the existing cash flow document
    let cashFlow = await CashFlow.findOne();
    if (!cashFlow) {
      cashFlow = new CashFlow(); // Create a new document if it doesn't exist
    }

    // Update the appropriate field
    if (type === "outgoing") {
      cashFlow.outgoingCash += amount;
    } else if (type === "borrowing") {
      cashFlow.borrowingCash += amount;
    } else {
      return res.status(400).json({ status: "error", error: "Invalid type" });
    }

    // Save the updated document
    await cashFlow.save();

    res.json({
      status: "ok",
      cashFlow: {
        grandTotal: cashFlow.todaysIncome + cashFlow.closingAmount,
        totalOutgoing: cashFlow.outgoingCash,
        totalBorrowing: cashFlow.borrowingCash,
        todaysIncome: cashFlow.todaysIncome,
        closingAmount: cashFlow.closingAmount,
      },
    });
  } catch (error) {
    console.error("Error updating cash flow:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};


exports.getTotalCashFlow = async (req, res) => {
  try {
    const cashFlow = await CashFlow.findOne();

    if (!cashFlow) {
      return res.status(404).json({ status: "error", error: "Cash flow not found" });
    }

    res.json({
      status: "ok",
      cashFlow: {
        
        totalOutgoing: cashFlow.outgoingCash,
        totalBorrowing: cashFlow.borrowingCash,
        todaysIncome: cashFlow.todaysIncome,
        closingAmount: cashFlow.closingAmount,
      },
    });
  } catch (error) {
    console.error("Error fetching total cash flow:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.updateGrandTotal = async (req, res) => {
  const { grandTotal } = req.body;

  try {
    if (grandTotal == null) {
      return res.status(400).json({ status: "error", error: "Grand total is missing" });
    }

    const cashFlow = await getOrCreateCashFlow();
    cashFlow.grandTotal = grandTotal;

    await cashFlow.save();

    res.json({
      status: "ok",
      grandTotal: cashFlow.grandTotal,
    });
  } catch (error) {
    console.error("Error updating grand total:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.getGrandTotal = async (req, res) => {
  try {
    const cashFlow = await CashFlow.findOne();

    if (!cashFlow) {
      return res.status(404).json({ status: "error", error: "Cash flow not found" });
    }

    res.json({
      status: "ok",
      grandTotal: cashFlow.grandTotal,
    });
  } catch (error) {
    console.error("Error fetching grand total:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.getBorrowingCash = async (req, res) => {
  try {
    const cashFlow = await CashFlow.findOne();

    if (!cashFlow) {
      return res.status(404).json({ status: "error", error: "Cash flow not found" });
    }

    res.json({
      status: "ok",
      borrowingCash: cashFlow.borrowingCash,
    });
  } catch (error) {
    console.error("Error fetching borrowingCash:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.updateTodayIncome = async (req, res) => {
  const { todayIncome } = req.body;

  try {
    if (todayIncome == null) {
      return res.status(400).json({ status: "error", error: "Today's income is missing" });
    }

    // Find or create the CashFlow document
    let cashFlow = await CashFlow.findOne();
    if (!cashFlow) {
      cashFlow = new CashFlow();
    }

    // Add the new income to the existing income
    cashFlow.todaysIncome += todayIncome;

    // Update the grand total
    cashFlow.grandTotal = cashFlow.todaysIncome + cashFlow.closingAmount;

    await cashFlow.save();

    res.json({
      status: "ok",
      todaysIncome: cashFlow.todaysIncome,
      grandTotal: cashFlow.grandTotal,
    });
  } catch (error) {
    console.error("Error updating today's income:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};


exports.getTodayIncome = async (req, res) => {
  try {
    const cashFlow = await CashFlow.findOne();

    if (!cashFlow) {
      return res.status(404).json({ status: "error", error: "Cash flow not found" });
    }

    res.json({
      status: "ok",
      todaysIncome: cashFlow.todaysIncome,
    });
  } catch (error) {
    console.error("Error fetching today's income:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.updateClosingAmount = async (req, res) => {
  const { closingAmount } = req.body;

  try {
    if (closingAmount == null) {
      return res.status(400).json({ status: "error", error: "Closing amount is missing" });
    }

    const cashFlow = await getOrCreateCashFlow();
    cashFlow.closingAmount = closingAmount;

    // Update grand total
    cashFlow.grandTotal = cashFlow.todaysIncome + cashFlow.closingAmount;

    await cashFlow.save();

    res.json({
      status: "ok",
      closingAmount: cashFlow.closingAmount,
      grandTotal: cashFlow.grandTotal,
    });
  } catch (error) {
    console.error("Error updating closing amount:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};