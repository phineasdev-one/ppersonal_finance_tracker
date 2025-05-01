export const paginateTransactions = <T>(
  data: T[],
  options: { page?: number; limit?: number } = {},
) => {
  const { page, limit } = options;

  const dataPaginated =
    !page || !limit ? data : data.slice((page - 1) * limit, page * limit);

  const totalItems = data.length;
  const currentPage = page || 1;
  const itemsPerPage = limit || data.length;
  const itemCount = dataPaginated.length;
  const totalPages = Math.ceil(data.length / itemsPerPage) || 1;

  return {
    items: dataPaginated,
    meta: {
      currentPage,
      itemCount,
      itemsPerPage,
      totalItems,
      totalPages,
    },
  };
};
