const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require("express-fileupload");

require('./utils/firebase');
const config = require('./module/config');
const routes = require('./routes');

const app = express();
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/', routes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.log(err)
    res.status(statusCode);
    res.json({
        success: false,
        message: 'Request has failed',
        error: {
            statusCode: statusCode,
            message: err.message,
        },
    });
})

app.listen(config.port, () => console.log(`Auth service listening on port ${config.port}!`));