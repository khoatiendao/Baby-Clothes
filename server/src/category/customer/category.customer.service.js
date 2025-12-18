import { paginate } from '../../common/utils/paginate.js';
import { StatusEnum } from '../admin/category.admin.enum.js';
import { Category } from '../model/category.model.js';

class categoryCustomerService {
  async list({ page = 1, limit = 10}) {
    const query = {
        status: StatusEnum.ACTIVE
    };

    return paginate({
      model: Category,
      page: Number(page),
      limit: Number(limit),
      query,
    });
  }
}

export const CategoryCustomerService = new categoryCustomerService();
