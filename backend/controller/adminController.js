const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {createToken} = require('../utils/generateTokens')


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        const compare = await bcrypt.compare(password, admin.password);
        if (!compare) {
            return res.status(409).json({
                success: false,
                message: 'password or username mismatch'
            })
        }

        const token = createToken(admin._id);
        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60
        })
       
        res.status(200).json({
            success: true,
            message: "loged in successfully",
            user:admin,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}
module.exports = {
    login
}