const { OAuth2Client } = require('google-auth-library');
const Provider = require('../models/providerModel');


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let provider = await Provider.findOne({ email });

    if (!provider) {
      provider = await Provider.create({
        name,
        email,
        image: picture,
        isGoogleUser: true,
        serviceType: 'Unassigned',
        phone: '0000000000'  
      });
    }

    const authToken = jwt.sign({ id: provider._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      message: 'Google login successful',
      token: authToken,
      provider
    });

  } catch (err) {
    res.status(400).json({ error: 'Google login failed', details: err.message });
  }
};

module.exports = { googleLogin };