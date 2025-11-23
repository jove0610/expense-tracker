import type { ExpenseInterface, ScheduledExpenseInterface } from "./interface";

export const MOCK_CATEGORY = [
  { id: "1", name: "Bills" },
  { id: "2", name: "Tithes" },
  { id: "3", name: "Transpo - Office" },
  { id: "4", name: "Foods" },
  { id: "5", name: "Foods - Grab" },
  { id: "6", name: "Foods - Coke" },
  { id: "7", name: "Foods - Cheat" },
  { id: "8", name: "Utilities" },
  { id: "99", name: "Others" },
];

export const MOCK_EXPENSES: ExpenseInterface[] = [
  { id: "1", name: "Rent", categoryId: "1", amount: 6500, date: "2025-11-01" },
  { id: "2", name: "Mama", categoryId: "2", amount: 4000, date: "2025-11-01" },
  { id: "3", name: "Lawson", categoryId: "7", amount: 348, date: "2025-11-02" },
  {
    id: "4",
    name: "Grocery",
    categoryId: "4",
    amount: 176,
    date: "2025-11-02",
  },
  { id: "5", name: "Coke", categoryId: "6", amount: 150, date: "2025-11-02" },
  { id: "6", name: "Snacks", categoryId: "7", amount: 15, date: "2025-11-02" },
  { id: "7", name: "Snacks", categoryId: "7", amount: 160, date: "2025-11-03" },
  {
    id: "8",
    name: "Laundry",
    categoryId: "99",
    amount: 217,
    date: "2025-11-03",
  },
];

export const SCHEDULED_EXPENSES: ScheduledExpenseInterface[] = [
  { id: "1", name: "Krisp", categoryId: "99", amount: "$12", day: "3rd" },
  { id: "2", name: "Netflix", categoryId: "99", amount: "₱957", day: "12th" },
  { id: "3", name: "Patreon", categoryId: "99", amount: "$5", day: "28th" },
];
