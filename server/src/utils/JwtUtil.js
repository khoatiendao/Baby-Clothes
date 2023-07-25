const jwt = require('jsonwebtoken');
const MyConstant = require('./MyConstant');

const JWToken = {
    generateTokenAccess(username, password) {
        const token =  jwt.sign(
            {username: username, password: password}, 
            MyConstant.JWT_SECERT,
            {expiresIn: MyConstant.JWT_EXPRIES}
        );
        return token;
    },

    checkTokenAccess(req, res, next) {
        const tokenAccess = req.headers['x-access-token'] || req.headers['authorization'];
        if(tokenAccess) {
            jwt.verify(tokenAccess, MyConstant.JWT_SECERT, (err, decoded) => {
                if(err) {
                    return res.json({
                        success: false,
                        message: 'Token is not valid'
                    });
                }else {
                    req.decoded = decoded;
                    next();
                }
            });
        }else {
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    }
};
module.exports = JWToken;