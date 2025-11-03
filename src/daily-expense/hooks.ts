import { useState, type Dispatch, type SetStateAction } from "react";
import { jsonParser } from "./utilities";
import type { ExpenseInterface } from "./interface";

export const useExpenses = (): [
  ExpenseInterface[],
  Dispatch<SetStateAction<ExpenseInterface[]>>,
] => {
  const [expenses, setExpenses] = useState<ExpenseInterface[]>(() => {
    const stored = localStorage.getItem("expenses");
    if (!stored) return [];
    return jsonParser<ExpenseInterface[]>(stored, []);
  });

  const handleExpenses: Dispatch<SetStateAction<ExpenseInterface[]>> = (
    valueOrUpdater,
  ) => {
    setExpenses((prev) => {
      const newValue =
        typeof valueOrUpdater === "function"
          ? valueOrUpdater(prev)
          : valueOrUpdater;

      localStorage.setItem("expenses", JSON.stringify(newValue));
      return newValue;
    });
  };

  return [expenses, handleExpenses];
};
