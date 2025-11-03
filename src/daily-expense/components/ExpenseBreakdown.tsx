import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import type { ExpenseInterface, ExpensePerDayInterface } from "../interface";
import { MOCK_CATEGORY } from "../mocks";
import { formatToPeso } from "../utilities";

interface ExpenseBreakdownInterface {
  expenses: ExpenseInterface[];
}

const getCategory = (categoryId: string) => {
  return MOCK_CATEGORY.find((cat) => cat.id === categoryId)?.name || "";
};

function ExpenseBreakdown(props: ExpenseBreakdownInterface) {
  const { expenses } = props;

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

  return (
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
                    <Stack>
                      {expenseItem.name}
                      <Typography sx={{ fontSize: 9, color: "text.secondary" }}>
                        {getCategory(expenseItem.categoryId)}
                      </Typography>
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
  );
}

export default ExpenseBreakdown;
