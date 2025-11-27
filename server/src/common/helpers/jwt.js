import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const createJwt = {
    verifyCode(email, code) {
        const token = jwt.sign(
            {email, code},
            process.env.JWT_SECERT,
            {algorithm: "HS256", expiresIn: process.env.CODE_EXPRIES}
        );
        return token;
    },

    accessToken(id, role) {
        const token = jwt.sign(
            {id, role},
            process.env.JWT_SECERT,
            {algorithm: "HS256", expiresIn: process.env.JWT_EXPRIES}
        );
        return token;
    },    
}