export const PercentageFormatter = (value: number, decimals = 2): string => {
  return `${value.toFixed(decimals)}%`;
};
