require('dotenv').config();
// express
const express = require('express');
const router = express.Router();
// utils
const logger = require('../utils/logger');
const status = require('../utils/httpStatus');
// model
const User = require('../models/user');
const cookie = require('cookie');
const jwtApi = require('../utils/jwtApi');

// 로그인
router.post('/', async function(req, res, next) {
  const { userId, password } = req.body;
  let result = status.UNEXPECTED_ERROR;

  var cookies = {};
  var token = undefined;
  var refreshToken = undefined;
  if (req.headers.cookie !== undefined) {
    cookies = cookie.parse(req.headers.cookie);
    token = cookies.token;
  }

  if (!userId)
    result = status.WRONG_ID_RULE;
  else if (!password)
    result = status.WRONG_PASSWORD_RULE;
  else if (token) 
    return jwtApi.authjwt(req, res, next, token);
  else {
    await User.findOne({userId, password})
    .then( user => user ? result = status.SUCCESS : result = status.LOGIN_FAIL)
    .catch( err => {
      result = status.UNEXPECTED_ERROR;
      logger.error(err);
    } );

    token = jwtApi.createJwtAccessToken(userId);
    refreshToken = jwtApi.createJwtRefreshToken(userId);
  }
  
  res.cookie('token', token, jwtApi.COOKIE_OPTIONS);
  res.cookie('userId', userId, jwtApi.COOKIE_OPTIONS);
  res.cookie('refreshToken', refreshToken, jwtApi.COOKIE_REFRESH_OPTIONS);

  return res.status(result.code).send({
    code: result.code,
    message: result.message
  });
});

module.exports = router;