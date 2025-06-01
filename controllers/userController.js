const asyncHandler = require('express-async-handler')
const User = require('./../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//@desc Get All contacts
//@route GET /api/contacts

const registerContact = asyncHandler(async (req, res)=> {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    let hashedPassword = await bcrypt.hash(password, 10)
    const userAvailable = await User.findOne({email})
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }
    const user = await User.create({
            username,
            email,
            password: hashedPassword
    })
    res.status(200).json(user)
})

const LoginUser = asyncHandler(async(req, res)=> {
    const {email, password} = req.body
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken  = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"})
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("Email or password is not valid")
    }
})

const currentUser = asyncHandler(async(req, res)=> {
    res.json({ message: 'Current user information' })
})

module.exports = {registerContact, currentUser, LoginUser}