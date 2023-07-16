const cookie = require('cookie');
const status = require('../utils/httpStatus');

const jwt = require('jsonwebtoken');

exports.COOKIE_MAX_LIFE = 2 * 60 * 60 * 1000; // 2시간
exports.COOKIE_MAX_LIFE_REFRESH = 48 * 60 * 60 * 1000; // 2d
  //todo: secure의 false 테스트 완료 시 true로 변경
  //todo : cookieOptions에 domain:'wichan.store' 추가
exports.COOKIE_OPTIONS = { httpOnly: true, secure: false, maxAge: this.COOKIE_MAX_LIFE, path: '/' };

exports.authjwt = (req, res, next, token) => {
    try {
        req.decoded = jwt.verify(token, process.env.SECRET_KEY);
        return res.status(status.JWT_TOKEN_VALID.code).send({
            code: status.JWT_TOKEN_VALID.code,
            message: status.JWT_TOKEN_VALID.message + "",
            userId: userId
        });;
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

exports.checkRefreshTokenSignature = (req, res, next) => {
    try {
        req.decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
        let token = this.createJwtAccessToken(req.decoded.userId);
        res.cookie('token', token, COOKIE_OPTIONS);
        return res.status(status.JWT_TOKEN_VALID.code).send({
            code: status.JWT_TOKEN_VALID.code,
            message: status.JWT_TOKEN_VALID.message + "",
            userId: userId
        });;
    }
    catch {
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
};

exports.createJwtAccessToken = (userId) => {

    token = jwt.sign({
        userId: userId,
        url: 'dashboard.wichan.store/auth/login'
    }, process.env.SECRET_KEY, {
        expiresIn: '30m',
        issuer: 'kgginam'
    })

    return token;
};

exports.createJwtRefreshToken = (userId) => {

    token = jwt.sign({
        userId: userId,
        url: 'dashboard.wichan.store/auth/login'
    }, process.env.REFRESH_SECRET_KEY, {
        expiresIn: '7d',
        issuer: 'kgginam'
    })

    return token;
};