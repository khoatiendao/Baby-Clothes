import { AuthService } from "../user/services/auth.service.js";
import { AuthAdminService } from "./auth.admin.service.js";


class authAdminController {

  async login(req, res) {
    try {
      const result = await AuthAdminService.login({
        email: req.body.email,
        password: req.body.password,
        userAgent: req.headers['user-agent'],
        ip: req.ip,
      });
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async logout(req, res) {
    try {
      await AuthService.logout(req.userId, req.refreshToken);

      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const AuthAdminController = new authAdminController();
