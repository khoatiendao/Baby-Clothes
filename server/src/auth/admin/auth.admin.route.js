import express from 'express';
import { AdminDetailController, createController, DeleteOneAdminController, loginController, updateController } from './auth.admin.controller.js';
import { validationBase } from '../../common/helpers/validation.js';
import { AdminDto, AdminLoginDto, UpdateAdminDto } from './auth.admin.dto.js';


const adminRouter = express.Router();

adminRouter.post('/auth/login', validationBase(AdminLoginDto), loginController)

adminRouter.post('/create', validationBase(AdminDto), createController);

adminRouter.put('/update/:id', validationBase(UpdateAdminDto), updateController);

adminRouter.get('/:id', AdminDetailController);

adminRouter.delete('/:id', DeleteOneAdminController);

export default adminRouter;
