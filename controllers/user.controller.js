const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// ------------- Registration -------------
const register = asyncHandler(async(req, res, next) => {
    try {
        const { username, email, password } = req.body;
        // Validate
        if (!username || !email || !password) {
            res.status(400);
            throw new Error('Please all fields are required');
        }
        // Check if email is taken
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('A user with this emai already exists');
        }

        // Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({  username, email, password: hashedPassword });
        // console.log(username, email, hashedPassword);

        // Add the date the trial will end
        newUser.trialExpires = new Date(new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000);

        // Save the user
        await newUser.save();

        res.json({
            // username: newUser.username,
            // role: newUser.role,
            // email: newUser.email,
            // id: newUser._id,
            status: true,
            message: 'Registration was successfull',
            user: { username, email }
        });
    } catch(err) {
        throw new Error(err);
        // next(err);
    }
});

// ------------- Login -------------
const login = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    // !Check if user email already exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('A user with this email already exists');
    }

    //! Check if user password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(410);
        throw new Error('Email or password is invalid');
    }
    //! Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' })
    // Set the token into cookie (http only)
    res.cookie('token', token), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000
    };
    //! Send the response
    res.json({
        message: 'Login successfull',
        token,
        id: user._id,
        email: user.email
    });
});
// ------------- Logout -------------
const logout = asyncHandler(async(req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.status(200).json({ message: 'Logout successfully' });
});
// ------------- Profile -------------
const userProfile = asyncHandler(async(req, res) => {
    const id = '661e615b1cc44e4bc9bcd94e'
    const user = await User.findById(id).select('-password');

    if (user) {
        res.status(200).json({
            status: 'success',
            user
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});
// ------------- Check User Auth Status -------------

module.exports = { register, login, logout, userProfile };