const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require('body-parser');


const UserRegister = require("./routes/UserRegister");
const UserLogin = require("./routes/UserLogin");
const GetProduct = require("./routes/Product");
const ProductBill = require("./routes/ShopaddreddbillSchema");
const CustomerDetails = require("./routes/CustomerDetails");
const GenerateInvoice = require("./routes/GenerateInvoice");
const stockUpdate = require("./routes/stockUpdate");



// Server setup and connect
app.listen(5000, () => {
  console.log("Server connected");
});

// MongoDB database setup and connect
const MONGOURL = process.env.MONGODB;
mongoose
  .connect(MONGOURL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));


  // Increase the limit for the body parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("/auth",UserRegister)
app.use("/auth",UserLogin)
app.use("/auth/product",GetProduct)
app.use("/api/bill",ProductBill)
app.use("/api/customer",CustomerDetails)
app.use("/api/invoice",GenerateInvoice)
app.use("/stock",stockUpdate)


