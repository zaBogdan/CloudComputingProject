const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./module/config');

// mongoose.connect(config.mongoUri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
const routes = require('./routes');

const app = express();
app.use(cors({
    origin: '*',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
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