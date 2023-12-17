const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.isAdminLogedIn = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.accessToken;
    // console.log(token);
    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            async (err, decodedToken) => {
                if (err) {
                    console.log(err)
                    res.status(401).json({
                        message: "unautherized access restricted"
                    })
                } else {
                    next();
                }
            }
        );
    } else {
        console.log("token missibg")
        res.status(401).json({
            message: "unautherized access restricted"
        })
    }
}

    module.exports.isUserLogedIn = (req, res, next) => {
        console.log("got")
        const token = req.cookies.accessToken;
        console.log(token)
        if (token) {
            jwt.verify(
                token,
                process.env.JWT_SECRET,
                async (err, decodedToken) => {
                    if (err) {
                        res.status(401).json({
                            status: 401,
                            message: "Unauthorized access restricted",
                        })
                    } else {
                        next();
                    }
                }
            );
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized access restricted",
            })
        }
};