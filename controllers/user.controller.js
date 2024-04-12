// ------------- Registration -------------
const register = async(req, res) => {
    res.json({
        status: true,
        message: 'Registration was successful'
    });
}

module.exports = { register }