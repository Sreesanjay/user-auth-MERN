const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ adminId: id }, process.env.JWT_SECRET, { expiresIn: maxAge })
}


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
       
        res.status(200).json({
            success: true,
            message: "loged in successfully",
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