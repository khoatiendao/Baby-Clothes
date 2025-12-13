import express from 'express';
import AuthAdminRouter from '../../auth/admin/auth.admin.route.js';
import ManageAdminRouter from '../../manageAccount/admin/manage.admin.route.js';

const AdminRoute = express.Router();

// Auth Admin
AdminRoute.use('/auth', AuthAdminRouter);

// Manage Account Admin
AdminRoute.use('/manage-account', ManageAdminRouter)

export default AdminRoute;