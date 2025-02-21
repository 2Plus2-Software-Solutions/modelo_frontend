export const CurrencyMask = (input: string): string => {
  const numericValue = input.replace(/\D/g, "");
  if (!parseInt(numericValue)) return "";
  const valueAsNumber = parseInt(numericValue, 10) || 0;
  const formattedValue = (valueAsNumber / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `R$ ${formattedValue}`;
};
