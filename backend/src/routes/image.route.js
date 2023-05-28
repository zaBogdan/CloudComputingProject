const router = require('express').Router();

const {
  uploadImage,
} = require('../controller/image.controller');

const validateAuth = require('../middleware/validateAuth.middleware');

router.get(
  '/upload',
  validateAuth,
  uploadImage
);


module.exports = router;
