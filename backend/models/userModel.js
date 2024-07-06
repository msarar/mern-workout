const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

//static login method
userSchema.statics.login = async function(email, password){
    //validation
    if(!email || !password){
        throw new Error('Email and password are required');
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }

    const user = await this.findOne({email});
    if(!user){
        throw new Error('User with this email does not exist');
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        throw new Error('Password is incorrect');
    }

    return user;
}


//static signup method (cant be an arrow function because we need to use 'this')
userSchema.statics.signup = async function (email, password){
    //validation
    if(!email || !password){
        throw new Error('Email and password are required');
    }
    if(!validator.isEmail(email)){
        throw new Error('Email is not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Password is not strong enough');
    }
    
    const exists = await this.findOne({email});
    if(exists){
        throw new Error('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({email: email, password: hashedPassword});

    return user;
}

userSchema.statics.googleLogin = async function (email, name, photoURL){
    //validation
    // if(!email){
    //     throw new Error('Email is required');
    // }
    // if(!validator.isEmail(email)){
    //     throw new Error('Email is not valid');
    // }

    // const user = await this.findOne({email});
    // if(!user){
    //     const newUser = await this.create({email: email, password: 'google'});
    //     return newUser;
    // }
    // return user;
}

module.exports = mongoose.model('User', userSchema);