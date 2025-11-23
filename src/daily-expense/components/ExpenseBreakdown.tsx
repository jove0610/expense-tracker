import { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

import type { ExpenseInterface, ExpensePerDayInterface } from "../interface";
import { MOCK_CATEGORY } from "../mocks";
import { formatToPeso } from "../utilities";
import { modalStyle } from "../styles";

interface DeleteConfirmModalInterface {
  open: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

interface ExpenseBreakdownInterface {
  expenses: ExpenseInterface[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseInterface[]>>;
}

const getCategory = (categoryId: string) => {
  return MOCK_CATEGORY.find((cat) => cat.id === categoryId)?.name || "";
};

function DeleteConfirmModal(props: DeleteConfirmModalInterface) {
  const { open, onClose, handleDelete } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-add-expense"
      aria-describedby="modal-add-expense-form"
    >
      <Stack sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Are you sure you want to delete?
        </Typography>
        <Stack direction="row" sx={{ gap: 2, mt: 5, ml: "auto" }}>
          <Button onClick={onClose} variant="outlined">
            No
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Yes
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

function ExpenseBreakdown(props: ExpenseBreakdownInterface) {
  const { expenses, setExpenses } = props;
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [expenseIdToDelete, setExpenseIdToDelete] = useState("");

  const expensePerDay = expenses
    .reduce((acc: ExpensePerDayInterface[], curr) => {
      const index = acc.findIndex((expense) => expense.date === curr.date);
      if (index === -1) {
        return acc.concat({
          date: curr.date,
          totalAmount: curr.amount,
          expenses: [curr],
        });
      }
      acc[index].totalAmount += curr.amount;
      acc[index].expenses.push(curr);
      return acc;
    }, [])
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const openDeleteConfirmModal = (expenseId: string) => {
    setExpenseIdToDelete(expenseId);
    setShowDeleteConfirmModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
    setExpenseIdToDelete("");
  };

  const handleDeleteExpense = () => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== expenseIdToDelete));
    setExpenseIdToDelete("");
    setShowDeleteConfirmModal(false);
  };

  return (
    <>
      <Stack sx={{ gap: 3, mt: 5 }}>
        {expensePerDay.map((exp) => (
          <TableContainer key={exp.date} component={Paper}>
            <Table size="small" aria-label="expense table">
              <TableHead>
                <TableRow>
                  <TableCell>{dayjs(exp.date).format("MMM D")}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>

              <TableBody>
                {exp.expenses.map((expenseItem) => (
                  <TableRow
                    key={expenseItem.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1 }}
                      >
                        <DeleteIcon
                          fontSize="small"
                          color="error"
                          sx={{ cursor: "pointer" }}
                          onClick={() => openDeleteConfirmModal(expenseItem.id)}
                        />
                        <Stack>
                          {expenseItem.name}
                          <Typography
                            sx={{ fontSize: 9, color: "text.secondary" }}
                          >
                            {getCategory(expenseItem.categoryId)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      {formatToPeso(expenseItem.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ))}
      </Stack>

      <DeleteConfirmModal
        open={showDeleteConfirmModal}
        onClose={closeDeleteConfirmModal}
        handleDelete={handleDeleteExpense}
      />
    </>
  );
}

export default ExpenseBreakdown;
