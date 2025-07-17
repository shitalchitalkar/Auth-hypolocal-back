const express = require('express');
const router = express.Router();
const {register, login} = require('../controller/userController');
const passport = require('passport');  // ✅ CORRECT way to import

router.post('/register', register);

router.post('/login', login);

router.get('/oauth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

module.exports = router;