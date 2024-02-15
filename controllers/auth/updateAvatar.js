const path = require("path");
const jimp = require("jimp");
const fs = require("fs").promises;

const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatar = await jimp.read(req.file.path);
    await avatar.resize(250, 250).writeAsync(req.file.path);

    const fileName = `${req.user.id}-${Date.now()}${path.extname(
      req.file.originalname
    )}`;

    const avatarPath = path.join(__dirname, "../../public/avatars", fileName);
    await fs.rename(req.file.path, avatarPath);

    req.user.avatarURL = `/avatars/${fileName}`;
    await req.user.save();

    res.status(200).json({ avatarURL: req.user.avatarURL });
  } catch (error) {
    console.error("Avatar update error:", error);
    next(error);
  }
};

module.exports = updateAvatar;
