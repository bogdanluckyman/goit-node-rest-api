const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/users");
const { loginSchema } = require("../../schemas/userSchemas");
require("dotenv").config();

const login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!user.verify) {
      return res.status(403).json({ message: "Email is not verified" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

module.exports = login;
