import { useState } from "react";
// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Temp from "./components/Temp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./components/theme";

import ResponsiveAppBar from "./components/ResponsiveAppBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/responsiveappbar" element={<ResponsiveAppBar />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          
            <Route path="/dashboard/*" element={<Dashboard />} />
         
        </Route>
      </Routes>
    </Router>
     </ThemeProvider>
  );
}

export default App;
