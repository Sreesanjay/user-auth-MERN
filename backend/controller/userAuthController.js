const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel')

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) =>{
    return jwt.sign({userId : id}, process.env.JWT_SECRET,{expiresIn:maxAge})
}
const hashPassword = async (originalPassword) => {
    const hashedPassword = await bcrypt.hash(originalPassword, 10);
    return hashedPassword;
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            const match = await bcrypt.compare(password, userExist.password);
            if (match) {
                const token = createToken(userExist._id)
                const {password, ...user} = userExist._doc
                res.status(200).json({
                    success: true,
                    message: "user loged in successfully",
                    data : {
                        user 
                    },
                    token
                })
            } else {
                res.status(409).json({
                    success: false,
                    message: "Password not matched", 
                })
            }
        } else {
            res.status(409).json({
                success: false,
                message: "user not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//user registration
const registerUser = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            res.status(409).json({
                success: false,
                message: 'Usre already exist'
            })
        } else {
            const password = await hashPassword(req.body.password)
            const user = {
                ...req.body,
                password: password
            }
            await User.create(user)
            res.status(200).json({
                success: true,
                message: "user registered successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
module.exports = {
    userLogin,
    registerUser
}