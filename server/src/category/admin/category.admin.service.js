import { paginate } from '../../common/utils/paginate.js';
import { Category } from '../model/category.model.js';

class categoryAdminService {
  async create(data) {
    const category = await Category.create(data);
    return category;
  }

  async list({ page = 1, limit = 10, name, status }) {
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    return paginate({
      model: Category,
      page: Number(page),
      limit: Number(limit),
      query,
    });
  }

  async getById(_id) {
    const category = await Category.findById(_id).exec();
    return category;
  }

  async update(_id, data) {
    const category = await Category.findByIdAndUpdate(_id, data, { new: true });
    return category;
  }

  async deleteById(_id) {
    const category = await Category.findByIdAndRemove(_id).exec();
    return category;
  }
}

export const CategoryAdminService = new categoryAdminService();
