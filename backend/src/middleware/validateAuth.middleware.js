const { getAuth } = require('firebase-admin/auth');
const userService = require('../services/user.service');
const CustomStatusCodeError = require('../errors/CustomStatusCodeError');
const UserModel = require('../models/user.model');

module.exports = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            throw new CustomStatusCodeError('No token provided', 401);
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        } else {
            throw new CustomStatusCodeError('Invalid token', 401);
        }

        const decodedToken = await getAuth().verifyIdToken(token)

        const user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture,
        }

        let dbUser = await userService.getOneUser(user.uid)
        if (!dbUser) {
            dbUser = await userService.createUser(UserModel.toClass({
                ...user
            }))
        }
        
        req.user = dbUser;
        next();
    } catch (err) {
        next(err);
    }
} 
