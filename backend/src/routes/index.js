const router = require('express').Router();

const image = require('./image.route');
const account = require('./account.route');

router.use('/image', image);
router.use('/account', account);
router.use('/', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

module.exports = router;
