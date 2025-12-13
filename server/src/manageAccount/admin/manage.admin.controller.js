import { MangeAdminService } from "./manage.admin.service.js";


class manageAdminController {
  async createAdmin(req, res) {
    const result = await MangeAdminService.createAdmin(req.body);
    res.json(result);
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
