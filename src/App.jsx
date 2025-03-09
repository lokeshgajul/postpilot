import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Create from "./components/QuickCreateCard/Create";
import Recent from "./components/RecentGenerations/Recent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Generate from "./components/Generate/Generate";
import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Main from "./components/Auth/Main";

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
