import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DailyExpense from "./daily-expense/components/DailyExpense";

function App() {
  return (
    <>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DailyExpense />
      </LocalizationProvider>
    </>
  );
}

export default App;
