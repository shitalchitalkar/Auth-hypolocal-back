const express = require('express');
const router = express.Router();
const admin = require('../models/adminModel.js');

//add admin
router.post('/add', async(req, res) => {
    try {
        const ad = new admin(req.body);
        await ad.save();
        res.status(201).json({
            success : true,
            message : "Admin Successfully added.",
        });
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
});

//get profile of admin
router.get('/getprofile/:id', async(req, res) => {
    try {
        const a = await admin.findById(req.params.id);
        if(!admin) return res.status(404).json({error : "Admin Not Found."});
        res.json(a);
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
});

//update admin profile
router.put('/updateprofile/:id', async(req,res) => {
    try {
        const update_a = await admin.findByIdAndUpdate(req.params.id, {role : req.body.role}, {new : true, runValidators : true});
        res.json(201).json({
            success : true,
            message : "Admin Role Updated Successfully.",
            update_a
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
});

//delete admin
router.delete('/deleteprofile/:id', async(req,res) => {
    try {
        const del_ad = await admin.findByIdAndDelete(req.params.id);
    res.status(201).json({
        success : true,
        message : "Admin Deleted Successfully.",
         del_ad       
    })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})

module.exports = router;