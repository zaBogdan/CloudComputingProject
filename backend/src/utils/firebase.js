const fs = require('fs');
const admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// const UserModel = require('../models/users.model');
const CustomStatusCodeError = require('../errors/CustomStatusCodeError');
const serviceAccount = JSON.parse(fs.readFileSync('config/service_account.json'));

const app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.validateAuth = async (req, res, next) => {
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

        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture,
        }
        console.log(req.user);
        next();
    } catch (err) {
        next(err);
    }
} 
