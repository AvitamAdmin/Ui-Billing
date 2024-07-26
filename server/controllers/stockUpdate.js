const StockUpdate = require("../models/Stockupdate");

// Fetch stock data for a specific product
exports.getStockData = async (req, res) => {
  try {
    const { productId } = req.params;
    const stockData = await StockUpdate.findOne({ productId });

    if (stockData) {
      return res.send({ status: "ok", data: stockData });
    }
    return res.status(404).json({ message: 'Stock data not found' });
  } catch (error) {
    console.error('Error fetching stock data:', error); // Detailed error logging
    res.status(500).json({ message: 'Error fetching stock data', error: error.message });
  }
};




// Update stock data for a specific product
exports.updateStockData = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId,"ggggg");
    const { currentStock, totalPurchase, totalSales } = req.body;

    const stockData = await StockUpdate.findOneAndUpdate(
      { productId },
      {currentStock, totalPurchase, totalSales, lastUpdated: Date.now() },
      { new: true, upsert: true }
    );

    res.json(stockData);
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock data', error });
  }
};

