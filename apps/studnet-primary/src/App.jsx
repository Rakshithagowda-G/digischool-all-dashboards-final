import { Router } from "./Router";
import { ThemeContextProvider } from "./context/ThemeContext";
import "./index.css";

function App() {
  return (
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  );
}

export default App;

