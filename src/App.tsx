import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import DailyExpense from "./daily-expense/components/DailyExpense";

function App() {
  return (
    <>
      <CssBaseline />
      <DailyExpense />
    </>
  );
}

export default App;
