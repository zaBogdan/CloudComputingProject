const router = require('express').Router();

const {
  uploadImage,
  getAllImages,
  deleteImage,
} = require('../controller/image.controller');

const validateAuth = require('../middleware/validateAuth.middleware');

router.get(
  '/all',
  validateAuth,
  getAllImages
);

router.post(
  '/upload',
  validateAuth,
  uploadImage
);

router.delete(
  '/:uid',
  validateAuth,
  deleteImage
);

module.exports = router;
