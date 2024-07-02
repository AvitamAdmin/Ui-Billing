const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();



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





