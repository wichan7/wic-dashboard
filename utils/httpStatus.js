const express = require('express');

// codes: 2XX
exports.SUCCESS             = { code: 200, message: "ok" };
exports.SUCCESS_CREATE      = { code: 201, message: "ok" };
exports.JWT_TOKEN_VALID     = { code: 200, message: "valid token" };
// codes: 4XX
exports.LOGIN_FAIL          = { code: 400, message: "login failed" };
exports.FAIL_JOIN_DUPKEY    = { code: 400, message: "same id" };
exports.WRONG_ID_RULE       = { code: 400, message: "wrong userId rule" };
exports.WRONG_PASSWORD_RULE = { code: 400, message: "wrong password rule" };
exports.JSON_WEBTOKEN_ERROR = { code: 401, message: "Invalid token" };
exports.TOKEN_EXPIRED_ERROR = { code: 419, message: "expired token" };
// codes: 5XX
exports.UNEXPECTED_ERROR    = { code: 500, message: "unknown error" };
