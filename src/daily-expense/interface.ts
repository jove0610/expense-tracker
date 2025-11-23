export interface ExpenseInterface {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  amount: number;
  date: string;
}

export interface ExpensePerDayInterface {
  date: string;
  totalAmount: number;
  expenses: ExpenseInterface[];
}

export interface ScheduledExpenseInterface {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  amount: string;
  day: string;
}
