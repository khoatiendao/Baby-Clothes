import mongoose from 'mongoose';
import { Admin } from './admin.model.js';
import { passwordUtil } from '../../utils/BCrypt.js';
import { createJwt } from '../../common/helpers/jwt.js';
import { AuthService } from '../user/services/auth.service.js';

class authAdminService {
  async login(data) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const findEmail = await Admin.findOne({ email: data.email }).populate('user');

      if (!findEmail)
        return {
          status: 404,
          success: false,
          message: 'Email not found',
        };

      const matchPassword = await passwordUtil.compare(
        data.password,
        findEmail.password
      );

      if (!matchPassword)
        return {
          status: 400,
          success: false,
          message: 'Wrong password',
        };      

      const accessToken = await createJwt.accessToken(findEmail.user?._id, findEmail.user?.role);
      const refreshToken = await createJwt.refreshToken(findEmail.user?._id);

      const dataAuth = {
        token: refreshToken,
        userAgent: data.userAgent,
        ip: data.ip,
        revoked: false,
        createAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };

      await AuthService.updateAuth(findEmail.user?._id, dataAuth);
      session.commitTransaction();

      return {
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      };
    } catch (error) {
      await session.abortTransaction();
      return {
        status: 500,
        success: false,
        message: 'Internal server error',
        error: error.message,
      };
    } finally {
      session.endSession();
    }
  }

  async logout(userId, token) {
    try {
      await Auth.deleteOne({userId, token});
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const AuthAdminService = new authAdminService();