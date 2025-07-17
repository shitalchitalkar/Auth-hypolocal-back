import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import user from './models/userModel.js';
import jwt from 'jsonwebtoken';
// import { profile } from 'react';

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL : `${process.env.BACKEND_URL}/auth/oauth/google/callback`
    },
    async (provider, done) => {
        try {
        let us = await user.findOne({email : profile.emails[0].value});   //email: array of objects when google responses back [value : email@gmail.com, verified true]
            if(!us) {
                us = await user.create({
                    firstName : profilerofile.displayFirstName,
                    lastName : profilerofile.displayLastName,
                    email : profile.emails[0].value,
                    password : 'oauth_placeholder',
                    role : 'user'
                });
                const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
                us.token = token;
                return done(null, us)// says that there is no error while execution of the code
            }
        } catch (error) {
            return(error, null)//not provide any data in case of error
        }
    }
)
)