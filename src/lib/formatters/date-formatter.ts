export const DateFormatter = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("pt-BR");
};
