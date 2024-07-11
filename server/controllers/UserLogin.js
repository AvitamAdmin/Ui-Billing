const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRegister = require("../models/UserRegister");
const SECRET_KEY = "wfgksdfninqkfofnndakfw325";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserRegister.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      SECRET_KEY,
      // { expiresIn: "1h" }
    );

    res.status(200).json({ token,email });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
