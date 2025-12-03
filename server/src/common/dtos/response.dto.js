export class BaseResponse {
  constructor(model) {
    this.model = model;
  }

  async list(page, limit) {
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      this.model.skip(skip).limit(limit),
    ]);

    return {
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    };
  }
}
