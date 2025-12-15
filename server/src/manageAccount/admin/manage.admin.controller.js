import { MangeAdminService } from './manage.admin.service.js';

class manageAdminController {
  async createAdmin(req, res) {
    const result = await MangeAdminService.createAdmin(req.body);
    res.json(result);
  }

  async getListAdmin(req, res) {
    try {
      const result = await MangeAdminService.getList(req.query);
      res.status(200).json({
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

  async updateAdmin(req, res) {
    const result = await MangeAdminService.update(req.params.id, req.body);
    res.json(result);
  }

  async adminDetail(req, res) {
    const result = await MangeAdminService.findById(req.params.id);
    res.json(result);
  }

  async deleteAdmin(req, res) {
    const result = await MangeAdminService.delete(req.params.id);
    res.json(result);
  }
}

export const ManageAdminController = new manageAdminController();
