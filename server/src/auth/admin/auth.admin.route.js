import express from 'express';
import { validationBase } from '../../common/helpers/validation.js';
import { verifyRefreshTokenMiddleware } from '../../common/middlewares/auth.middleware.js';
import { AuthAdminController } from './auth.admin.controller.js';
import { AuthController } from '../user/controller/auth.controller.js';
import { AdminLoginDto } from './auth.admin.dto.js';


const AuthAdminRouter = express.Router();
// Login in page Admin
AuthAdminRouter.post('/login', validationBase(AdminLoginDto), AuthAdminController.login);

AuthAdminRouter.post('/logout', verifyRefreshTokenMiddleware, AuthAdminController.logout);

AuthAdminRouter.post('/refresh_token', verifyRefreshTokenMiddleware, AuthController.refreshToken);

export default AuthAdminRouter;
