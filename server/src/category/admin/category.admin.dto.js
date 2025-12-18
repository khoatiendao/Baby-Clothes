import Joi from 'joi';
import { StatusEnum } from './category.admin.enum.js';


export const CreateCategoryAdminDto = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string()
    .valid(...Object.values(StatusEnum))
    .required(),
});

export const ListCategoryAdminDto = Joi.object({
  name: Joi.string(),
  status: Joi.string().valid(...Object.values(StatusEnum)),
});

export const UpdateCategoryAdminDto = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string()
    .valid(...Object.values(StatusEnum))
    .required(),
});
