import express from 'express';
import CategoryCustomerRoute from '../../category/customer/category.customer.route.js';

const CustomerRoute = express.Router();

CustomerRoute.use('/category', CategoryCustomerRoute);

export default CustomerRoute;
