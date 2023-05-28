const router = require('express').Router();

const image = require('./image.route');

router.use('/image', image);
router.use('/', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

module.exports = router;
