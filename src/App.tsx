import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { ThemeProvider } from "./context/theme-context";
import { CrudProvider } from "./context/crud-context";
import { PageLayout } from "./layout/page-layout";
import { ErrorFallback } from "./components/error-boundary";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <CrudProvider>
          <PageLayout />
        </CrudProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
