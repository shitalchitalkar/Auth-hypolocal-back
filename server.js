const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const providerRoutes = require('./routes/providerRoutes');

const serviceRoute = require('./routes/serviceRoute');
const adminRoutes =require('./routes/adminRoutes');




dotenv.config(); 

const app = express();

// JSON data parser middleware
app.use(express.json());

// MongoDB Connect

mongoose.connect(process.env.MONGO_URI,{
    //optional keywords
    //useNewUrlParser : true,
    //useUnifiedTopology : true,
})


.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB error:', err));

//  Routes
app.use('/api/providers', providerRoutes);
//services model
app.use('/api/services', serviceRoute);

//admin
app.use('/api/admin',adminRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port:5000'));