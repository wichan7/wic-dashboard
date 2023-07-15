const cookie = require('cookie');
const status = require('../utils/httpStatus');

const jwt = require('jsonwebtoken');
const check = require('./checkTokenSignature');

exports.authjwt = (req, res, next) => {
    var cookies = {};
    cookies = cookie.parse(req.headers.cookie);
    var token = cookies.token;
    try {
        req.decoded = jwt.verify(token, process.env.SECRET_KEY);
        return check.checkTokenSignature(req, res, next);
    }
    catch (error) {
        // 유효시간 만료
        if (error.name === 'TokenExpiredError') {
            return res.status(status.TOKEN_EXPIRED_ERROR.code).send({
                code: status.TOKEN_EXPIRED_ERROR.code,
                message: status.TOKEN_EXPIRED_ERROR.message
            });
        }
        // 토큰의 비밀키가 일치하지 않는 경우
        if (error.name === 'JsonWebTokenError') {
            return res.status(status.JSON_WEBTOKEN_ERROR.code).send({
                code: status.JSON_WEBTOKEN_ERROR.code,
                message: status.JSON_WEBTOKEN_ERROR.message
            });
        }
    }
}