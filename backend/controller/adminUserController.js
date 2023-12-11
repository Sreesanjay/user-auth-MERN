const User = require('../models/userModel');

const getAllUsers = async (req, res, next) => {
    const users = await User.find({ accountStatus: true });
    res.status(200).json({
        success: true,
        message: 'All user fetched successfully',
        data: { users }
    });
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: { user }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }

}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) throw new Error
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
        if (user) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully'
            })
        }
        else {
            throw new Error()
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
}