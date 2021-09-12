import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ReduxProvider></ReduxProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
