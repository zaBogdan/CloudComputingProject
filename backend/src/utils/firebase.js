const fs = require('fs');
const admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');

const serviceAccount = JSON.parse(fs.readFileSync('config/service_account.json'));

const app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cc-final-proj-27579.firebaseio.com',
});

module.exports = {
    database: admin.firestore(),
}