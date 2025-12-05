import express from 'express';
import adminRouter from '../../auth/admin/auth.admin.route.js';

const AdminRoute = express.Router();

AdminRoute.use('/admin', adminRouter);

export default AdminRoute;