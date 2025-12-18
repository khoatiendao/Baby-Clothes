import express from "express";
import { CategoryCustomerController } from "./category.customer.controller.js";

const CategoryCustomerRoute = express.Router();

CategoryCustomerRoute.get('/list', CategoryCustomerController.getList);

export default CategoryCustomerRoute;