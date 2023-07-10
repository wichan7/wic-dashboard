require('dotenv').config();
// express
const express = require('express');
const router = express.Router();
// utils
const logger = require('../utils/logger');
const CryptoJS = require('crypto-js');
// model
const User = require('../models/user');

// codes: 2XX
const SUCCESS_LOGIN       = { code: 200, message: "ok" };
const SUCCESS_JOIN        = { code: 201, message: "ok" };
// codes: 4XX
const FAIL_LOGIN          = { code: 400, message: "로그인 정보가 존재하지 않습니다." };
const FAIL_JOIN_DUPKEY    = { code: 400, message: "동일한 아이디가 존재합니다." };
const WRONG_ID_RULE       = { code: 400, message: "userId 필드가 규칙에 맞지 않습니다." };
const WRONG_PASSWORD_RULE = { code: 400, message: "password 필드가 규칙에 맞지 않습니다." };
// codes: 5XX
const UNEXPECTED_ERROR    = { code: 500, message: "알 수 없는 오류" };

// 로그인
router.post('/login', async function(req, res, next) {
  const { userId, password } = req.body;
  let result = UNEXPECTED_ERROR;

  if (!userId)
    result = WRONG_ID_RULE;
  else if (!password)
    result = WRONG_PASSWORD_RULE;
  else {
    await User.findOne({userId, password})
    .then( user => user ? result = SUCCESS_LOGIN : result = FAIL_LOGIN )
    .catch( err => {
      result = UNEXPECTED_ERROR;
      logger.error(err);
    } );
  }

  return res.status(result.code).send(result);
});

// 회원가입
router.post('/join', async function(req, res, next) {
  const { userId, password } = req.body;
  let result = UNEXPECTED_ERROR;

  if (!userId)
    result = WRONG_ID_RULE;
  else if (!password || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password))
    result = WRONG_PASSWORD_RULE;
  else {
    // HASHING
    const hashedPassword = CryptoJS.SHA256(password + process.env.HASH_SALT).toString();
    // CREATE
    await User.create({ userId, password })
    .then( user => result = SUCCESS_JOIN )
    .catch( err => {
      if (err.code == 11000) {
        result = FAIL_JOIN_DUPKEY;
      } else {
        result = UNEXPECTED_ERROR;
        logger.error(err);
      }
    } );
  }

  return res.status(result.code).send(result);
});

module.exports = router;