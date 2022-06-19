const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { name, email, password, subscription } = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw new Conflict(`User with ${email} already exist`);
    }
    const avatarURL = gravatar.url(email);
    const newUser = new User({name, email, subscription, avatarURL});
    newUser.setPassword(password);
    newUser.save();
    
        res.status(201).json({  
            message: "success",
            code: 201,
            data: {
                user: { 
                    name,
                    email,
                    subscription,
                    avatarURL
                },
            },
            
    });
}

module.exports = register; 