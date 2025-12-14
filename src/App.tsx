import "./App.css";
import { ThemeProvider } from "./custome-hooks/theme-context";
import { PageLayout } from "./layout/page-layout";

function App() {
  return (
    <ThemeProvider>
      <PageLayout></PageLayout>
    </ThemeProvider>
  );
}

export default App;
