import { CategoryCustomerService } from './category.customer.service.js';

class categoryCustomerController {
  async getList(req, res) {
    try {
      const result = await CategoryCustomerService.list(req.query);      
      return res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const CategoryCustomerController = new categoryCustomerController();
