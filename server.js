require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const session = require('express-session');
const passport = require('passport');
require('./passport.js');

const app = express();
app.use(express.json());   //to
//  fetch data from server in json like format
app.use('/user', userRoute)

mongoose.connect(process.env.MONGO_URI,{
    //optional keywords
    //useNewUrlParser : true,
    //useUnifiedTopology : true,
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));

app.use(express.json());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
   console.log( `Server is running on port ${PORT}`)
})