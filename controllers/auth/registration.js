const bcrypt = require("bcrypt");
const User = require("../../model/users");
const { registrationSchema } = require("../../schemas/userSchemas");
const gravatar = require("gravatar");
require("dotenv").config();
const uuid = require("uuid");
const sendVerificationEmail = require("../../config");

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
    const verificationToken = uuid.v4();

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      avatarURL: gravatar.url(req.body.email, {
        s: "100",
        r: "x",
        d: "retro",
      }),
      verificationToken: verificationToken,
    });

    await newUser.save();

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};

module.exports = registration;
