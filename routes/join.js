const router = require("express").Router();
// utils
const logger = require('../utils/logger');
const CryptoJS = require('crypto-js');
//status
const status = require('../utils/httpStatus');
// model
const User = require('../models/user');

// 회원가입
router.post('/', async function(req, res, next) {
    const { userId, password } = req.body;
    let result = status.UNEXPECTED_ERROR;
  
    if (!userId)
      result = status.WRONG_ID_RULE;
    else if (!password || !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password))
      result = status.WRONG_PASSWORD_RULE;
    else {
      // HASHING
      const hashedPassword = CryptoJS.SHA256(password + process.env.HASH_SALT).toString();
      // CREATE
      await User.create({ userId: userId, password: hashedPassword })
      .then( user => result = status.SUCCESS_CREATE )
      .catch( err => {
        if (err.code == 11000) {
          result = status.FAIL_JOIN_DUPKEY;
        } else {
          result = status.UNEXPECTED_ERROR;
          logger.error(err);
        }
      } );
    }
  
    return res.status(result.code).send(result);
  });

module.exports = router;