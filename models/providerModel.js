const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
      
    },
    email: {
      type: String,
      required: true, 
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true, 
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  /*googleId:String,
  image:String,*/

    category: {
      type: String,
      required: true, 
    },
   },
  { timestamps: true }
);

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;