import express from 'express';
import { validationBase } from '../../common/helpers/validation.js';
import { AdminDto, ListAdminDto, UpdateAdminDto } from './manage.admin.dto.js';
import { verifyAccessToken } from '../../common/helpers/jwt.js';
import { ManageAdminController } from './manage.admin.controller.js';
import { authorizeRole } from '../../common/middlewares/auth.middleware.js';
import { roleEnum } from '../../common/enum/global.enum.js';

const ManageAdminRouter = express.Router();

ManageAdminRouter.post('/admin/create', verifyAccessToken, authorizeRole(roleEnum.admin), validationBase(AdminDto), ManageAdminController.createAdmin);

ManageAdminRouter.get('/admin/list', verifyAccessToken, authorizeRole(roleEnum.admin), validationBase(ListAdminDto), ManageAdminController.getListAdmin);

ManageAdminRouter.put('/admin/update/:id', verifyAccessToken, authorizeRole(roleEnum.admin), validationBase(UpdateAdminDto), ManageAdminController.updateAdmin);

ManageAdminRouter.get('/admin/:id', verifyAccessToken, authorizeRole(roleEnum.admin), ManageAdminController.adminDetail);

ManageAdminRouter.delete('/admin/:id', verifyAccessToken, authorizeRole(roleEnum.admin), ManageAdminController.deleteAdmin);

export default ManageAdminRouter;
