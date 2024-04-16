const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// ------------- Registration -------------
const register = async(req, res) => {
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
            username: newUser.username,
            role: newUser.role,
            email: newUser.email,
            id: newUser._id,
            // status: true,
            // message: 'Registration was successfull',
            // user: { username, email }
        });
    } catch(err) {
        throw new Error(err);
    }
}

// ------------- Login -------------
// ------------- Logout -------------
// ------------- Profile -------------
// ------------- Check User Auth Status -------------

module.exports = { register }