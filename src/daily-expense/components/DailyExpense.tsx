import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddExpenseModal from "./AddExpenseModal";
import ExpenseBreakdown from "./ExpenseBreakdown";
import { formatToPeso } from "../utilities";
import { useExpenses } from "../hooks";
import { MOCK_CATEGORY } from "../mocks";

function DailyExpense() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [expenses, setExpenses] = useExpenses();

  const now = dayjs();
  const expensesForThisMonth = expenses.filter((expense) => {
    const isThisMonth = dayjs(expense.date).isSame(now, "month");
    const matchesCategory = !categoryId || expense.categoryId === categoryId;
    return isThisMonth && matchesCategory;
  });
  const totalExpense = expensesForThisMonth.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const toggleAddItemModal = () => {
    setShowAddModal((prev) => !prev);
  };

  const handleCategoryFilter = (e: SelectChangeEvent<string>) => {
    e.preventDefault();
    setCategoryId(e.target.value);
  };

  const handleClearFilters = () => {
    setCategoryId("");
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
      <Button variant="outlined" sx={{ mb: 5 }} onClick={toggleAddItemModal}>
        Add Expense
      </Button>

      <FormControl>
        <InputLabel id="category-filter" size="small">
          Filter By Category
        </InputLabel>
        <Select
          id="category-filter"
          label="Filter By Category"
          name="category"
          size="small"
          value={categoryId}
          onChange={handleCategoryFilter}
        >
          {MOCK_CATEGORY.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="outlined"
        sx={{ mr: "auto" }}
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>

      <ExpenseBreakdown
        expenses={expensesForThisMonth}
        setExpenses={setExpenses}
      />

      <AddExpenseModal
        open={showAddModal}
        onClose={toggleAddItemModal}
        setExpenses={setExpenses}
      />
    </Stack>
  );
}

export default DailyExpense;
