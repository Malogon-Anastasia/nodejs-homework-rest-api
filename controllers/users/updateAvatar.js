const {User} = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async(req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const { _id: id } = req.user;
    const avatarName = `${id}_${originalname}`;
    try {
        const resultUpload = path.join(avatarsDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const avatarUrl = path.join("public", "avatars", avatarName);
        await User.findByIdAndUpdate(req.user._id, {avatarUrl});
        res.status(201).json({avatarUrl});
        } catch (error) {
            await fs.unlink(tempUpload);
            throw error;
}

};

module.exports = updateAvatar;

 