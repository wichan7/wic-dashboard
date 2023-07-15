const status = require('../utils/httpStatus');

exports.checkTokenSignature = (req, res, next) => {
    const userId = req.decoded.userId;
    return res.status(status.JWT_TOKEN_VALID.code).send({
        code: status.JWT_TOKEN_VALID.code,
        message: status.JWT_TOKEN_VALID.message + "",
        userId: userId
    });
};