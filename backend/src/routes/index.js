const router = require('express').Router();

const image = require('./image.route');

router.use('/image', image);


module.exports = router;
