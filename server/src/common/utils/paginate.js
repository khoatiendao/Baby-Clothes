export const paginate = async ({
  model,
  query = {},
  page = 1,
  limit = 10,
  sort = { createdAt: -1 },
  select = '',
}) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        model.find(query).sort(sort).skip(skip).limit(limit).select(select).lean(),
        model.countDocuments(query)
    ]);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
};
