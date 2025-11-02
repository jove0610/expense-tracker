import type { ExpenseInterface } from "./interface";

export const MOCK_CATEGORY = [
  { id: "1", name: "Bills" },
  { id: "2", name: "Tithes" },
  { id: "3", name: "Transpo - Office" },
  { id: "4", name: "Foods" },
  { id: "5", name: "Foods - Grab" },
  { id: "6", name: "Foods - Coke" },
  { id: "7", name: "Foods - Cheat" },
  { id: "99", name: "Others" },
];

export const MOCK_EXPENSES: ExpenseInterface[] = [
  { id: "1", name: "Rent", categoryId: "1", amount: 6500, date: "2025-11-01" },
  { id: "2", name: "Mama", categoryId: "2", amount: 4000, date: "2025-11-01" },
  { id: "3", name: "Lawson", categoryId: "7", amount: 348, date: "2025-11-02" },
];
