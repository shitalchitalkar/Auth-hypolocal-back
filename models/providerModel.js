const mongoose =require('mongoose');
const providerSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    serviceType:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },

    //add for google Qauth img
    image:{
        type:String,
    },
     isGoogleUser:{
        type:Boolean,
        default:false
     },

    experience:{
        type:Number,
        default:0
    },
    available:{
        type:Boolean,
        default:true
    }
    },
      {
        timestamps:true
      });

      module.exports=mongoose.model('Provider',providerSchema);