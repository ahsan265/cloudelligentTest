import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { ThemeProvider } from "./context/theme-context";
import { PageLayout } from "./layout/page-layout";
import { ErrorFallback } from "./components/error-boundary";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <PageLayout></PageLayout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
