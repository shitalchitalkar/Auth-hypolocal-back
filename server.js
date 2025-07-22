const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const providerRoutes = require('./routes/providerRoutes');
const serviceRoutes =require('./routes/serviceRoutes');

const bookingRoutes= require('./routes/bookingRoutes');







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


//google


//  Routes
app.use('/api/providers', providerRoutes);
//service route
app.use('/api/service',serviceRoutes);
//booking
app.use('/api/bookings',bookingRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port:5000'));