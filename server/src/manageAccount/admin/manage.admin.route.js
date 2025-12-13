import express from 'express';
import { validationBase } from '../../common/helpers/validation.js';
import { AdminDto, UpdateAdminDto } from './manage.admin.dto.js';
import { verifyAccessToken } from '../../common/helpers/jwt.js';
import { ManageAdminController } from './manage.admin.controller.js';

const ManageAdminRouter = express.Router();

ManageAdminRouter.post('/admin/create', validationBase(AdminDto), verifyAccessToken, ManageAdminController.createAdmin);

ManageAdminRouter.put('/admin/update/:id', validationBase(UpdateAdminDto), verifyAccessToken, ManageAdminController.updateAdmin);

ManageAdminRouter.get('/admin/:id', verifyAccessToken, ManageAdminController.adminDetail);

ManageAdminRouter.delete('/admin/:id', verifyAccessToken, ManageAdminController.deleteAdmin);

export default ManageAdminRouter;
