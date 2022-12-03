const bcrypt = require('bcrypt')
const UserModel = require('../Models/UserModel.js')
// register new User

const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new UserModel(req.body)

    const { email } = req.body


    try {

        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            return res.status(400).json({ message: "user is already registered" })
        }

        const user = await newUser.save();
        res.status(200).json({isUser:true})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email })

        if (user) {
            const validity = await bcrypt.compare(password, user.password);
            
            validity ? res.status(200).json({ isUser:true}) : res.status(400).json({message:"Wrong Password",isUser:false})

        } else {
            res.status(400).json({message:"user does not exist", isUser:false});
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message , isUser:false})
    }
}

module.exports = {
    registerUser,
    loginUser
}