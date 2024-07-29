const GenerateInvoice = require("../models/GenerateInvoice");

exports.addInvoice = async (req, res) => {
    const {
        ShopName,
        shopAddress,
        mobNum1,
        mobNum2,
        creator,
        selectedCustomer,
        fetchPendingAmount,
        totalProductPriceNum,
        totalamount,
        paid,
        products
    } = req.body;
  // console.log(req.body,"llllllll");
    try {
      // Check if the user exists
    //   const olduser = await GenerateInvoice.findOne({ ShopName });
    //   if (!olduser) {
    //     return res.send({ status: "User Not Match" });
    //   }
  
      // Find the device document for the given user
    //   let deviceDoc = await GenerateInvoice.findOne({ username });
  
    //   if (!deviceDoc) {
        // If the user doesn't have a device document, create a new one
        getinvoice = new GenerateInvoice({
            ShopName,
            shopAddress,
            mobNum1,
            mobNum2,
            creator,
            customerName:selectedCustomer,
            pendingAmount:fetchPendingAmount,
            grossAmount:totalProductPriceNum,
            totalAmount:totalamount,
            paid,
            Invoice:products, // Initialize devices array
        });
    //   }
  console.log(getinvoice,"getinvoice");
    // Add the new device to the devices array
    //   getinvoice.devices.push({
    //     Customerfrombill
    //   });
  
      // Save the updated document
      await getinvoice.save();
  
      console.log("getinvoice added successfully");
      res.send({ status: "ok", data: req.body });
    } catch (error) {
      console.error("Error from getinvoice:", error);
      res.status(500).send({ status: "Error", error: error.message });
    }
  };


  exports.getInvoice = async (req, res) => {
    try {
      const generateInvoice = await GenerateInvoice.find();
      res.send({ status: "ok", data: generateInvoice });
      // console.log(generateInvoice, "getcustomer details");
    } catch (error) {
      console.error("getcustomer details failed:", error);
      res.status(500).json({ error: "Internal server error from getcustomer" });
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