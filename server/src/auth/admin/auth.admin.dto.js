import Joi from 'joi';
import { AdminPermissionEnum } from './auth.admin.enum.js';

export const AdminDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  permission: Joi.array().items(Joi.string().valid(...Object.values(AdminPermissionEnum))).required(),
});

export const AdminLoginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
});

export const ListAdminDto = Joi.object({
  email: Joi.string().email(),
});

export const UpdateAdminDto = Joi.object({    
  permission: Joi.array().items(Joi.string().valid(...Object.values(AdminPermissionEnum))).required(),
});
