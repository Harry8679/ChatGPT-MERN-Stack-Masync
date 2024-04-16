const mongoose = require('mongoose');

// Schema
userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'instructor', 'student'],
        default: 'student', 
    },
    trialPeriod: {
        type: Number,
        default: 3 // 3 days
    },
    trialService: {
        type: Boolean,
        default: false,
    },
    trialExpires: {
        type: Date
    },
    subscription: {
        type: String,
        enum: ['Trial', 'Free', 'Basic', 'Premium']
    },
    apiRequestCount: {
        type: Number,
        default: 0
    },
    monthlyRequestCount: {
        type: Number,
        default: 0
    },
    nextBillingDate: Date,
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment',
        }
    ],
    history: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'History'
        }
    ]
}, {
    timeseries: true
});

//! Compile to form the model
const User = mongoose.model('User', userSchema);

module.exports = User;