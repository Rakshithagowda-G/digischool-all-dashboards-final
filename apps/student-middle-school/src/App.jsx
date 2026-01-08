import { Router } from "./Router";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import "./index.css";

function App() {
  return (
    <DarkModeProvider>
      <Router />
    </DarkModeProvider>
  );
}

export default App;

