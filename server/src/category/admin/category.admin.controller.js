import { CategoryAdminService } from './category.admin.service.js';

class categoryAdminController {
  async create(req, res) {
    try {
      const result = await CategoryAdminService.create(req.body);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getList(req, res) {
    try {
      const result = await CategoryAdminService.list(req.query);
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

  async getDetail(req, res) {
    try {
      const result = await CategoryAdminService.getById(req.params.id);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const result = await CategoryAdminService.update(req.params.id, req.body);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteOne(req, res) {
    try {
      const result = await CategoryAdminService.deleteById(req.params.id);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export const CategoryAdminController = new categoryAdminController();
