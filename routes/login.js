require('dotenv').config();
// express
const express = require('express');
const router = express.Router();
// utils
const logger = require('../utils/logger');
const status = require('../utils/httpStatus');
// model
const User = require('../models/user');
//jwt
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const authjwt = require('./authjwt');

// 로그인
router.post('/', async function(req, res, next) {
  const { userId, password } = req.body;
  let result = status.UNEXPECTED_ERROR;

  var cookies = {};
  var token = undefined;
  if (req.headers.cookie !== undefined) {
    cookies = cookie.parse(req.headers.cookie);
    token = cookies.token;
  }

  if (!userId)
    result = status.WRONG_ID_RULE;
  else if (!password)
    result = status.WRONG_PASSWORD_RULE;
  else if (token) 
    return authjwt.authjwt(req, res, next);
  else {
    await User.findOne({userId, password})
    .then( user => user ? result = status.SUCCESS : result = status.LOGIN_FAIL)
    .catch( err => {
      result = status.UNEXPECTED_ERROR;
      logger.error(err);
    } );

    token = jwt.sign({
        userId: userId,
        url: 'dashboard.wichan.store/auth/login'
    }, process.env.SECRET_KEY, {
        expiresIn: '30m',
        issuer: 'kgginam'
    })
  }

  //todo: secure의 false 테스트 완료 시 true로 변경
  let cookieMaxLife = 60 * 60 * 1000; // 2시간
  res.cookie('token', token, { httpOnly: true, secure: false, maxAge: cookieMaxLife });
  res.cookie('userId', userId, { httpOnly: true, secure: false, maxAge: cookieMaxLife });

  return res.status(result.code).send({
    code: result.code,
    message: result.message
  });
});

module.exports = router;