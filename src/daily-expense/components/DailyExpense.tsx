import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ExpenseBreakdown from "./ExpenseBreakdown";

import { MOCK_EXPENSES } from "../mocks";
import { formatToPeso } from "../utilities";

function DailyExpense() {
  const expensesForThisMonth = MOCK_EXPENSES.filter((expense) => {
    return dayjs(expense.date).isSame(dayjs(), "month");
  });
  const totalExpense = expensesForThisMonth.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  return (
    <Stack sx={{ m: 3, gap: 2 }}>
      <Typography component="h1" variant="h4">
        Expense Tracker
      </Typography>
      <Stack>
        <Typography component="h3">{dayjs().format("MMMM")} Expense</Typography>
        <Typography variant="h4">{formatToPeso(totalExpense)}</Typography>
      </Stack>
      <Button variant="outlined">Add Expense</Button>
      <ExpenseBreakdown expenses={expensesForThisMonth} />
    </Stack>
  );
}

export default DailyExpense;
