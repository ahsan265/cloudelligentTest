import "./App.css";
import {
  createTheme as materialCreateTheme,
  THEME_ID,
  ThemeProvider as MaterialThemeProvider,
} from "@mui/material/styles";
import { ThemeUIProvider } from "theme-ui";
import { themeUIThemeWhite } from "./theme/themes";
import { PageLayout } from "./layout/page-layout";

const materialTheme = materialCreateTheme();

function App() {
  return (
    <ThemeUIProvider theme={themeUIThemeWhite}>
      <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <PageLayout></PageLayout>
      </MaterialThemeProvider>
    </ThemeUIProvider>
  );
}

export default App;
