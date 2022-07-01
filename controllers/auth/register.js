const { User } = require("../../models");
const { Conflict } = require("http-errors");
const {nanoid} = require("nanoid");
const gravatar = require("gravatar");
const sendEmail = require("../../helpers");

const register = async (req, res) => {
    const { name, email, password, subscription } = req.body;
    const user = await User.findOne({email});
    if (user) {
        throw new Conflict(`User with ${email} already exist`);
    }

    const verificationToken = nanoid();
    const avatarURL = gravatar.url(email);
    const newUser = new User({name, email, subscription, avatarURL, verificationToken});
    newUser.setPassword(password);
    await newUser.save();
    const mail = {
        to: email,
        subject: "Подтверджение email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердить email</a>`
    };
    
    await sendEmail(mail);    
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