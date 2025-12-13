import { AuthService } from '../services/auth.service.js';

class authController {
  async refreshToken(req, res) {
    try {
      const oldToken = req.body.refreshToken;
      if (!oldToken) {
        return res.status(400).json({
          success: false,
          message: 'Refresh token is required',
        });
      }
      const result = await AuthService.checkRefreshToken(oldToken, req);

      return res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: result,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const AuthController = new authController();
