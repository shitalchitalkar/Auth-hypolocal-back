
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Step 1: Google login request
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google callback (redirects here after login)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Success redirect
    res.send(" Google Login Successful!");
  }
);

// Optional: Logout route
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.send('Logged out');
  });
});

module.exports = router;