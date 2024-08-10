const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

const register = asyncHandler( async(req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(422);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await  userModel.findOne({email});
    if(userAvailable){
        res.status(422);
        throw new Error("User Already Register!");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const reqister = await userModel.create({
        username, email, password: passwordHash
    });
    if(reqister){
        res.status(200).json({message: 'Register Successfully'});
    }
    res.status(400);
    throw new Error("Something Went wrong!");
});


const login = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(422);
        throw new Error("All fields are mandatory!");
    }
    const user = await userModel.findOne({email});
    if(!user){
        res.status(422);
        throw new Error('No User Found');
    }
    if(user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                }
            }, process.env.Access_token,
            {expiresIn: '15m'}
        );
        res.status(200).json({accessToken: accessToken,message: 'Login Successfully'});
    } else {
        res.status(400);
        throw new Error("Passwords do not match! Authentication failed.");
    }
});

const currentUser = asyncHandler( async(req, res) => {
    const user = await userModel.findOne({email : req.user.email});
    res.status(200).json({user: user});
})



module.exports = {register, login, currentUser};