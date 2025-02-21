export const PercentageMask = (input: string): string => {
  return input.replace(/\D/g, "").replace(/^(\d{1,3})$/, "$1%");
};
