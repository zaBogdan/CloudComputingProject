const config = require('../module/config');
const CustomStatusCodeError = require('../errors/CustomStatusCodeError');

exports.registerController = (req, res, next) => {
    return res.json({
        success: true,
        message: 'User successfully registered.',
        user: req.user,
    });
}