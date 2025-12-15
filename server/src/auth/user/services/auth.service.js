import { createJwt, verifyRefreshToken } from '../../../common/helpers/jwt.js';
import { Auth } from '../model/auth.model.js';
import { User } from '../model/user.model.js';

class authService {
  async create(userId, session) {
    const authUser = await Auth.create([userId], { session });
    return authUser;
  }

  async updateAuth(userId, data) {
    const updateAuthUser = await Auth.findOneAndUpdate(
      { userId: userId },
      data,
      { new: true }
    );
    return updateAuthUser;
  }

  async checkRefreshToken(oldReToken, req) {
    const checkReToken = await verifyRefreshToken(oldReToken);

    // Query token in DB
    const stored = await Auth.findOne({
      userId: checkReToken.userId,
      token: oldReToken,
      revoked: false,
    });

    if (!stored) throw new Error('Refresh token not found or revoked');

    // Check expired
    if (stored.expiresAt < new Date()) {
        stored.revoked = true;
        await stored.save();
        throw new Error('Refresh token expired');
    }
    
    // Rotate refresh token
    const newRefreshToken = await createJwt.refreshToken(checkReToken.userId);

    // Update DB
    stored.token = newRefreshToken;
    stored.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    stored.userAgent = req.userAgent;
    stored.ip = req.ip;

    await stored.save();

    // Create new access token
    const findUser = await User.findOne({_id: checkReToken.userId});

    if(!findUser) throw new Error("User not found");
    
    const newAcessToken = await createJwt.accessToken(checkReToken.userId, findUser.role);

    return {
        accessToken: newAcessToken,
        refreshToken: newRefreshToken
    };
  }
}

export const AuthService = new authService();