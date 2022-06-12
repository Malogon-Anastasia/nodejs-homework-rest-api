const {User} = require("../../models");
const {Conflict} = require("http-errors");

const register = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(user){
        throw new Conflict(`User with ${email} already exist`)
    }
    const result = await User.create({email, password});
    res.status(201).json({  
        status: "success",
        code: 201,
        data: {
            user: { 
                email: result.email,
                password: result.password,
                subsctiption: result.subsctiption 
            }
        }

    })
}

module.exports = register; 