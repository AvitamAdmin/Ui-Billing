const CashFlow = require("../models/CashFlow");

exports.updateCashFlow = async (req, res) => {
  const { amount, type } = req.body;

  try {
    if (!amount || !type) {
      return res.status(400).json({ status: "error", error: "Missing amount or type" });
    }

    let cashFlow = await CashFlow.findOne();

    if (!cashFlow) {
      cashFlow = new CashFlow({ incomingCash: 0, outgoingCash: 0, borrowingCash: 0 });
    }

    if (type === "incoming") {
      cashFlow.incomingCash += amount;
    } else if (type === "outgoing") {
      cashFlow.outgoingCash += amount;
    } else if (type === "borrowing") {
      cashFlow.borrowingCash += amount;
    }

    await cashFlow.save();

    const grandTotal = cashFlow.incomingCash - cashFlow.outgoingCash + cashFlow.borrowingCash;

    res.json({
      status: "ok",
      cashFlow: {
        totalIncoming: cashFlow.incomingCash,
        totalOutgoing: cashFlow.outgoingCash,
        totalBorrowing: cashFlow.borrowingCash,
        incomingCashPerDay: cashFlow.incomingCash / 30, // Example calculation
        grandTotal: grandTotal,
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
        totalIncoming: cashFlow.incomingCash,
        totalOutgoing: cashFlow.outgoingCash,
        totalBorrowing: cashFlow.borrowingCash,
        incomingCashPerDay: cashFlow.incomingCash / 30, // Example calculation
      },
    });
  } catch (error) {
    console.error("Error fetching total cash flow:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};

exports.getGrandTotal = async (req, res) => {
  try {
    const cashFlow = await CashFlow.findOne();

    if (!cashFlow) {
      return res.status(404).json({ status: "error", error: "Cash flow not found" });
    }

    const grandTotal = cashFlow.incomingCash - cashFlow.outgoingCash + cashFlow.borrowingCash;
    
    res.json({
      status: "ok",
      grandTotal: grandTotal,
    });
  } catch (error) {
    console.error("Error fetching grand total:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};