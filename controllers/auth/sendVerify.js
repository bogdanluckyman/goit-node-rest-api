const sendVerificationEmail = require("../../config");
const User = require("../../model/users");

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    await sendVerificationEmail(user.email, user.verificationToken);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Error resending verification email:", error);
    next(error);
  }
};

module.exports = resendVerificationEmail;
