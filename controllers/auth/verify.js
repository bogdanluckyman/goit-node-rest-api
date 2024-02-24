const User = require("../../model/users");

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    if (!verificationToken) {
      return res.status(400).json({ message: "Missing verification token" });
    }

    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Email already verified" });
    }

    user.verificationToken = null;
    user.verify = true;

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    return res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyEmail;
