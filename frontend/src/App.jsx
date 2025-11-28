import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Profile from './pages/Profile';
import ResetPassword from "./pages/ResetPassword";
import SetPassword from "./pages/SetPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/profile/:utorid" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
