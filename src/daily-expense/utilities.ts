export const formatToPeso = (amount: number) => {
  return "₱" + amount.toLocaleString("en-PH");
};

export const generateId = () => {
  return crypto.randomUUID().replace(/-/g, "").toUpperCase();
};

export const jsonParser = <T>(value: string, fallback: T): T => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};
