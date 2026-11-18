export default (param: unknown, defaultValue?: number): number => {
  if (param === null || param === undefined || param === "") {
    return defaultValue ?? 0;
  }

  const convertedNumber = Number.isInteger(Number(param))
    ? Number(param)
    : (defaultValue ?? 0);
  return convertedNumber;
};
