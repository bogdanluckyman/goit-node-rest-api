const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Додано імпорт бібліотеки jsonwebtoken
const User = require("../model/users");
const { registrationSchema } = require("../schemas/userSchemas");
require("dotenv").config();

const registration = async (req, res, next) => {
  try {
    const { error } = registrationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    const secretKey = process.env.JWT_SECRET_KEY;

    const payload = {
      userId: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = registration;
