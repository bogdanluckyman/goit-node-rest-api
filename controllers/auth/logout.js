const logoutUser = async (req, res, next) => {
  try {
    const user = req.user;
    user.token = null;
    await user.save();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = logoutUser;
