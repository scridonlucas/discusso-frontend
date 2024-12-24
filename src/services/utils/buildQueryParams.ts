const buildQueryParams = (
  params: Record<string, string | number | boolean | null>
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

export default buildQueryParams;
