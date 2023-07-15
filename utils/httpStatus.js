const express = require('express');

// codes: 2XX
exports.SUCCESS             = { code: 200, message: "ok" };
exports.SUCCESS_CREATE      = { code: 201, message: "ok" };
// codes: 4XX
exports.LOGIN_FAIL          = { code: 400, message: "로그인 정보가 존재하지 않습니다." };
exports.FAIL_JOIN_DUPKEY    = { code: 400, message: "동일한 아이디가 존재합니다." };
exports.WRONG_ID_RULE       = { code: 400, message: "userId 필드가 규칙에 맞지 않습니다." };
exports.WRONG_PASSWORD_RULE = { code: 400, message: "password 필드가 규칙에 맞지 않습니다." };
// codes: 5XX
exports.UNEXPECTED_ERROR    = { code: 500, message: "알 수 없는 오류" };
