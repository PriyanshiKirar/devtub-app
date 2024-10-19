const passport = require("passport")
require('dotenv').config() // Load environment variables from .env file

const GoogleStrategy = require("passport-google-oauth20").Strategy
const Channel = require("@models/Channel") // Import the Channel model
const { createUniqueHandle } = require("@lib/utils")