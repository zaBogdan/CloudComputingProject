const fs = require('fs');
const admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');

const serviceAccount = JSON.parse(fs.readFileSync('./service_account.json'));

const app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cc-proiect-388020.firebaseio.com',
});

module.exports = {
    database: admin.firestore(),
}