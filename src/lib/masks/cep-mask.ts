export const CepMask = (input: string): string => {
  return input.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2");
};
