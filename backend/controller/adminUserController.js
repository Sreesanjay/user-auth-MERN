const { query } = require('express');
const User = require('../models/userModel');

const getAllUsers = async (req, res, next) => {
    console.log(req.cookies)
    try{
    let filter={
        accountStatus:true
    };
    if(req.query.searchKey!==''){
        filter.name = { $regex: new RegExp(req.query.searchKey, 'i') };
    }
    
    const users = await User.find(filter);
    res.status(200).json({
        success: true,
        message: 'All user fetched successfully',
        users 
    });
    }catch(error){
        console.log(error)
        res.status(500).json({
            status :500,
            message : "Internal server error"
        })
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            user
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
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