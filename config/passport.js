import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Provider from '../models/providerModel.js';
import jwt from 'jsonwebtoken';
//import { Profiler } from 'react';

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:`${process.env.BACKEND_URL}/api/auth/oauth/google/callback`,

        
    },
    async(profile,done)=>{
        try{
            let provider =await Provider.findOne({email: profile.emails[0].value});//email : array of object whenever the google responds us back
            if(!provider)
            {
                provider =await Provider.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:'outh_placeholder',
                    role:'provider'
                });
            }
            const token = jwt.sign({id: provider._id},process.env.JWT_SECRET,{expiresIn:'6h'});
            provider.token=token
            return done(null,provider)//null says that there has occured no error 
        }catch(error){
           return(error,null);
        }

    }
)
)