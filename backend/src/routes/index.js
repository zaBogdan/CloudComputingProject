const router = require('express').Router();

const {
  registerController,
} = require('../controller/auth.controller');

const {
  firebase
} = require('../utils');

router.get(
  '/test',
  firebase.validateAuth,
  registerController
);


module.exports = router;
