import { Auth } from '../../auth/user/model/auth.model.js';
import { verifyRefreshToken } from '../helpers/jwt.js';

export const verifyRefreshTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.body.refreshToken;

    if (!token) {
      return res.status(401).json({ message: 'Refresh token missing' });
    }

    const decoded = await verifyRefreshToken(token);

    if (!decoded)
      return res.status(401).json({ message: 'Invalid refresh token' });

    const checkAuth = await Auth.findOne({
      userId: decoded.userId,
      token: token,
      revoked: false,
    });

    if (!checkAuth) return res.status(401).json({ message: 'Not find token' });

    req.refreshToken = token;
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
