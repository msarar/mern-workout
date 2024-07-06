const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password);
        //create token
        const token = createToken(user._id);
        return res.status(200).json({email: user.email, token: token});
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}

//signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.signup(email, password);
        //create token
        const token = createToken(user._id);
        return res.status(200).json({email: user.email, token: token});

    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}

const googleLogin = async (req, res) => {
    const { email, name, photoURL } = req.body;
    try {
        const user = await User.googleLogin(email, name, photoURL);
        const token = createToken(user._id);
        return res.status(200).json({email: user.email, token: token});
    } catch (err) {
        return res.status(400).json({error: err.message});
    }
    
}

module.exports = {
    loginUser,
    signupUser
}