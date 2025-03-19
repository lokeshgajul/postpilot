import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Main from "./components/Auth/Main";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
