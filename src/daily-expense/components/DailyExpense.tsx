import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddExpenseModal from "./AddExpenseModal";
import ExpenseBreakdown from "./ExpenseBreakdown";
import { formatToPeso } from "../utilities";
import { useExpenses } from "../hooks";

function DailyExpense() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expenses, setExpenses] = useExpenses();

  const expensesForThisMonth = expenses.filter((expense) => {
    return dayjs(expense.date).isSame(dayjs(), "month");
  });
  const totalExpense = expensesForThisMonth.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const toggleAddItemModal = () => {
    setShowAddModal((prev) => !prev);
  };

  return (
    <Stack sx={{ m: 3, gap: 2 }}>
      <Typography component="h1" variant="h4">
        Expense Tracker
      </Typography>
      <Stack>
        <Typography component="h3">{dayjs().format("MMMM")} Expense</Typography>
        <Typography variant="h4">{formatToPeso(totalExpense)}</Typography>
      </Stack>
      <Button variant="outlined" onClick={toggleAddItemModal}>
        Add Expense
      </Button>
      <ExpenseBreakdown expenses={expensesForThisMonth} />

      <AddExpenseModal
        open={showAddModal}
        onClose={toggleAddItemModal}
        setExpenses={setExpenses}
      />
    </Stack>
  );
}

export default DailyExpense;
