import dayjs from "dayjs";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dispatch, FormEvent, SetStateAction } from "react";

import { modalStyle } from "../styles";
import { generateId } from "../utilities";
import type { ExpenseInterface } from "../interface";
import { MOCK_CATEGORY } from "../mocks";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
  setExpenses: Dispatch<SetStateAction<ExpenseInterface[]>>;
}

function AddExpenseModal(props: AddExpenseModalProps) {
  const { open, onClose, setExpenses } = props;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const description = formData.get("description") as string;
    const categoryId = formData.get("category") as string;
    const amount = (formData.get("amount") as string).trim();
    const date = formData.get("date") as string;

    if (!name || !categoryId || !date || isNaN(Number(amount))) {
      return;
    }
    const expense: ExpenseInterface = {
      id: generateId(),
      date: dayjs(date).format("YYYY-MM-DD"),
      name,
      categoryId,
      amount: Number(amount),
    };
    if (description) {
      expense.description = description.trim();
    }
    setExpenses((prev) => prev.concat(expense));
    e.currentTarget.reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-add-expense"
      aria-describedby="modal-add-expense-form"
    >
      <Stack sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h2">
          Add Expense
        </Typography>
        <Stack gap={2} mt={2}>
          <DatePicker
            label="Date"
            name="date"
            format="ll"
            defaultValue={dayjs()}
          />
          <TextField label="Name" name="name" size="small" required />
          <FormControl fullWidth required>
            <InputLabel id="category-label" size="small">
              Category
            </InputLabel>
            <Select
              id="category-label"
              label="Category"
              name="category"
              size="small"
            >
              {MOCK_CATEGORY.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Amount" name="amount" size="small" required />

          <Stack direction="row" gap={2}>
            <Button type="submit" variant="contained">
              Add
            </Button>
            <Button onClick={onClose} variant="outlined">
              Close
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default AddExpenseModal;
