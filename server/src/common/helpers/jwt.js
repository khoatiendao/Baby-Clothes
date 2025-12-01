import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { auth } from '../../auth/user/model/auth.model';
dotenv.config();

export const createJwt = {
  accessToken(id, role) {
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPRIES,
    });
    return token;
  },

  async refreshToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_REFRESH_EXPRIES,
    });

    await auth.create({
      token,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // & 7 days
    });

    return token;
  },

  emailCodeToken(userId, code) {
    const token = jwt.sign(
      { sub: userId, code, type: 'email_verify' },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: process.env.CODE_EXPRIES,
      }
    );
    return token;
  },
};

export const verifyAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res
        .status(401)
        .json({ message: 'Access token missing or malformed' });

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired access token',
    });
  }
};

export const verifyRefreshToken = async (token) => {
  try {
    if (token) {
      throw new Error('Refresh token missing');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }

    const storedToken = await auth.findOne({ token });
    if (!storedToken) {
      throw new Error('Refresh token not found or revoked');
    }

    if (storedToken.revoked === true) {
      throw new Error('Refresh token has been revoked');
    }

    if (storedToken.expiresAt < new Date())
      throw new Error('Refresh token expired');

    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyEmailCodeToken = (req, res, next) => {
  try {
    const { token, code } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== 'email_verify') {
      return res.status(403).json({ message: 'Invalid token type' });
    }

    if (decoded.code !== code) {
      return res.status(400).json({ message: 'Code is incorrect' });
    }

    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
