import "react-perfect-scrollbar/dist/css/styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme";
import GlobalStyles from "./theme/GlobalStyles";
import Routes from "./Routes";
import Store from "./redux/store";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ReduxProvider store={Store}>
          <Routes />
        </ReduxProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
