export const formatToPeso = (amount: number) => {
  return "₱" + amount.toLocaleString("en-PH");
};
