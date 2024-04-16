const asyncHandler = require('express-async-handler');

const isAuthenticated = asyncHandler(async(req, res, next) => {
    console.log(req.cookies);
    next();
});

module.exports = isAuthenticated;