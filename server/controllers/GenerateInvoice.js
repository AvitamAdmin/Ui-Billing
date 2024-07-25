const GenerateInvoice = require("../models/GenerateInvoice");

exports.addInvoice = async (req, res) => {
    const {
        ShopName,
        shopAddress,
        mobNum1,
        mobNum2,
        creator,
        customerName,
        fetchPendingAmount,
        totalProductPriceNum,
        totalamount,
        paid,
        Customerfrombill
    } = req.body;
  
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
            customerName,
            pendingAmount:fetchPendingAmount,
            grossAmount:totalProductPriceNum,
            totalAmount:totalamount,
            paid,
          Invoice: [Customerfrombill], // Initialize devices array
        });
    //   }
  
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