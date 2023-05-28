const router = require('express').Router();

const {
  getAccount,
  updateAccount,
} = require('../controller/account.controller');

const validateAuth = require('../middleware/validateAuth.middleware');

router.get(
  '/',
  validateAuth,
  getAccount
);

router.put(
  '/',
  validateAuth,
  updateAccount
);

module.exports = router;
