require('dotenv').config();
// express
const express = require('express');
const router = express.Router();
// utils
const logger = require('../utils/logger');
const status = require('../utils/httpStatus');
// model
const User = require('../models/user');

// 로그인
router.post('/', async function(req, res, next) {
  const { userId, password } = req.body;
  let result = status.UNEXPECTED_ERROR;

  if (!userId)
    result = status.WRONG_ID_RULE;
  else if (!password)
    result = status.WRONG_PASSWORD_RULE;
  else {
    await User.findOne({userId, password})
    .then( user => user ? result = status.SUCCESS : result = status.LOGIN_FAIL )
    .catch( err => {
      result = status.UNEXPECTED_ERROR;
      logger.error(err);
    } );
  }

  return res.status(result.code).send(result);
});

module.exports = router;