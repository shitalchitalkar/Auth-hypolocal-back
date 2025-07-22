const express = require('express');
//const passport = require ('passport');
//require('../config/passport');
const {
  registerProvider,
  loginProvider,
  getAllProviders,
} = require('../controllers/providerController');

const { protectProvider } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerProvider);
router.post('/login', loginProvider);
router.get('/all', getAllProviders); // Public 

//google login
/*router.get('/google/callback',passport.authenticate('provider-google',{
  successRedirect:'/provider/dashboard',
  failureRedirect:'/login'})

);
*/


module.exports = router;