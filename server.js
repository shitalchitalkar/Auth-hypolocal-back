require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/userRoute')

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

app.use('/auth', authRoute);

const PORT = process.env.PORT;

app.listen(PORT,() => {
   console.log( `Server is running on port ${PORT}`)
})