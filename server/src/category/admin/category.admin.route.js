import express from 'express';
import { verifyAccessToken } from '../../common/helpers/jwt.js';
import { authorizeRole } from '../../common/middlewares/auth.middleware.js';
import { roleEnum } from '../../common/enum/global.enum.js';
import { validationBase } from '../../common/helpers/validation.js';

import { CategoryAdminController } from './category.admin.controller.js';
import {
  CreateCategoryAdminDto,
  ListCategoryAdminDto,
  UpdateCategoryAdminDto,
} from './category.admin.dto.js';

const CategoryAdminRouter = express.Router();

CategoryAdminRouter.get(
  '/list',
  verifyAccessToken,
  authorizeRole(roleEnum.admin, roleEnum.customer),
  validationBase(ListCategoryAdminDto),
  CategoryAdminController.getList
);

CategoryAdminRouter.post(
  '/create',
  verifyAccessToken,
  authorizeRole(roleEnum.admin),
  validationBase(CreateCategoryAdminDto),
  CategoryAdminController.create
);

CategoryAdminRouter.get(
  '/detail/:id',
  verifyAccessToken,
  authorizeRole(roleEnum.admin),
  CategoryAdminController.getDetail
);

CategoryAdminRouter.put(
  '/update/:id',
  verifyAccessToken,
  authorizeRole(roleEnum.admin),
  validationBase(UpdateCategoryAdminDto),
  CategoryAdminController.update
);

CategoryAdminRouter.delete(
  '/delete/:id',
  verifyAccessToken,
  authorizeRole(roleEnum.admin),
  CategoryAdminController.deleteOne
);

export default CategoryAdminRouter;
