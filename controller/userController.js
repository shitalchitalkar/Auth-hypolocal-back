const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');

//function to register the user
exports.register = async(req, res) => {
    try {
        const {firstName, lastName, email, password, contact, address} = req.body;
        const exist = await user.findOne({email});
        if(exist) return res.status(400).json({
            message : "You already have an account."
        });
        const SALT = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, SALT);
        const us = await user.create({firstName, lastName, email, password: hashed, contact, address});
        res.status(201).json({
            message : "User Registered successfully",
            us
        });
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
};

//function to login user
exports.login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const us = await user.findOne({email});
        if(!us) return res.status(400).json({
            message : "Invalid Credentials"
        });
        const match = await bcrypt.compare(password, us.password);
        if(!match) return res.status(400).json({
            message : "Invalid Credentials"
        });
        const token = jwt.sign({id : us._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({
            message : "Login successfull",
            token
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

