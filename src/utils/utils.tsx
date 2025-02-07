export const getNumberFromString = (
  value: string | undefined
): number | undefined => {
  const parsedValue = Number(value);
  return !isNaN(parsedValue) && !isFloatNumber(parsedValue)
    ? parsedValue
    : undefined;
};

const isFloatNumber = (value: number): boolean => value % 1 !== 0;
