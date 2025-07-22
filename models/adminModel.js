const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    role : {
        type : String,
        default : "admin",
    },
    
    phone : {
        type : Number,
        required : true,
    },

    googleId : {
        type : String
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("admin", AdminSchema);