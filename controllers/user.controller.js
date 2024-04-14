// ------------- Registration -------------
const register = async(req, res) => {
    res.json({
        status: true,
        message: 'Registration was successful for a new account'
    });
}

module.exports = { register }