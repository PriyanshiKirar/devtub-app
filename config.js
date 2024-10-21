const passport = require("passport")
require('dotenv').config() // Load environment variables from .env file

const GoogleStrategy = require("passport-google-oauth20").Strategy
const Channel = require("@models/Channel") // Import the Channel model
const { createUniqueHandle } = require("@lib/utils");
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Google client ID from environment variable
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google client secret from environment variable
            callbackURL: "/api/auth/google/callback", // Callback URL after Google authentication
        },
        async (accessToken, refreshToken, profile, cb) => {
            try {
                // Find a channel by email
                let channel = await Channel.findOne({ email: profile.emails[0].value })