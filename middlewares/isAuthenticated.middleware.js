const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/user.model');

const isAuthenticated = asyncHandler(async(req, res, next) => {
    // console.log('req.cookies.token', req.cookies.token);
    if (req.cookies.token){
        //! Verify the token
        const decoded = jwt.sign(req.cookies.token, process.env.JWT_SECRET);
        // console.log(decoded);
        // Add the user to the req object
        req.user = await User.findById(decoded?.id).select('-password');
        return next();
    } else {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
});

module.exports = isAuthenticated;