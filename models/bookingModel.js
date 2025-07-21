const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    provider:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Provider",
        required:true
    },
    serviceDate:{
        type: Date,
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},
{
    timestamps:true
});

module.exports= mongoose.model("Booking",bookingSchema);