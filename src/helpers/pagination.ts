export default (page: number, limit?: number): number => {
  limit = limit ? limit : 5;
  const numberPage = Number(page);
  const offset =
    Number.isInteger(numberPage) && numberPage >= 1
      ? (numberPage - 1) * limit
      : 0;
  return offset;
};
