const logoutUser = async (req, res) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = logoutUser;
