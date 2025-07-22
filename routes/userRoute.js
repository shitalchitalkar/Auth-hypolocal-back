const express = require('express');
const router = express.Router();
const user = require("../models/userModel.js");

//create a new entry
router.post('/add', async(req, res) => {
    try {
        const us= new user(req.body);
        await us.save() // saves the data which the user is requesting in the body 
         res.status(201).json({
            success : true,
            message : "User successfully Added.",
            
         });
    } catch (error) {
        res.status(500).json({
            error : error.message
        })
    }
});


//to get user details by id

router.get('/getone/:id', async(req,res) => {
    try {
        const u = await user.findById(req.params.id);
    if(!user) return res.status(404).json({error : "User not Found."})
        res.json(u);
    } catch (error) {
         res.status(500).json({
            error : error.message
        })
    }
});

//to update the details of user
router.put('/update/:id', async (req, res) => {
    try {
        const update = await user.findByIdAndUpdate(req.params.id,{address: req.body.address}, {new: true, runValidators: true});
        res.status(201).json({
            success : true,
            message : "User Address Updated Successfully.",
            update
        });
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})

module.exports = router;