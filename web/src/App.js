import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import User from "./pages/user";
import UserDetail from "./pages/UserDetail";
import Mechanic from "./pages/mechanic";
import LoginPage from "./pages/LoginPage";
import MechanicDetail from "./pages/MechanicDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user-detail" element={<User />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
        <Route path="/mechanic-detail" element={<Mechanic />} />
        <Route path="/mechanic-detail/:id" element={<MechanicDetail />} />
        <Route path="/logout" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
