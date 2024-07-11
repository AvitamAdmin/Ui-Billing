const CustomerDetails = require("../models/CustomerDetails");

exports.customerCreate = async (req, res) => {
    try {
      const { customerName,mobileNumber,address,creator } = req.body;
  
      // Check if the Product already exists or not
      const existingShop = await CustomerDetails.findOne({ customerName });
  
      if (existingShop) {
        console.log('customer already registered:', shopName);
        return res.status(400).json({ message: 'customer already registered' });
      }
  
      // Create a new document using the Products
      const newCustomer = new CustomerDetails({
        customerName,mobileNumber,address,creator
      });
  
      // Save the new user to the database
      await newCustomer.save();
  
      res.status(201).json({ message: 'customer registered successfully' });
    } catch (error) {
      console.error('customer registration failed:', error);
      res.status(500).json({ error: 'Internal server error from customer' });
    }
  };


  exports.getCustomerDetails = async (req, res) => {
    try {
      const getallcustomerdetails = await CustomerDetails.find();
      res.send({ status: "ok", data: getallcustomerdetails });
      console.log(getallcustomerdetails, "getcustomer details");
    } catch (error) {
      console.error("getcustomer details failed:", error);
      res.status(500).json({ error: "Internal server error from getcustomer" });
    }
  };