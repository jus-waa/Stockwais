import dotenv from 'dotenv';
dotenv.config();

import passport from "passport";
import pkg from "passport-google-oauth2"; //import 
const {Strategy: GoogleStrategy} = pkg;   //then extract strategy from pkg(passport-google-oauth2)

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});