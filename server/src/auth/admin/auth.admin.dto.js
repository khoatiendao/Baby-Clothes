import Joi from 'joi';

export const AdminLoginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(20).required(),
});
