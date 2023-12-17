const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../utils/generateTokens')

const User = require('../models/userModel')

const hashPassword = async (originalPassword) => {
    const hashedPassword = await bcrypt.hash(originalPassword, 10);
    return hashedPassword;
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email: email, accountStatus: true });
        if (userExist) {
            const match = await bcrypt.compare(password, userExist.password);
            if (match) {
                const token = createToken(userExist._id)
                const { password, ...user } = userExist._doc
                res.status(200).json({
                    success: true,
                    message: "user loged in successfully",
                    user,
                    token
                })
            } else {
                const error = new Error("Incorrect password!")
                error.status = 401
                throw error;
            }
        } else {
            const error = new Error("User not found")
            error.status = 409
            throw error;
        }
    } catch (error) {
        res.status(error.status || 500).json({
            error: true,
            message: error.message
        })
    }
}


//user registration
const registerUser = async (req, res) => {

    try {
        const userExist = await User.findOne({ email: req.body.email });
        console.log("gott")
        if (userExist) {
            res.json({
                success: false,
                message: 'Usre already exist'
            })

        } else {
            console.log(req.body)
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
            error: true,
            message: error.message,
        })
    }
}

// update Profile image  
const updateProfile = async (req, res) => {
    try {
        if (!req.file) throw new Error('Internal server error');
        let user = await User.findById(req.params.id)
        user.profile = {
            filename: req.file.filename
        }
        user.save()
        res.json({
            success: true,
            message: 'Profile updated successfully',
            filename: req.file.filename
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    userLogin,
    registerUser,
    updateProfile
}