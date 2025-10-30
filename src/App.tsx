import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthContext from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <AuthContext>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route path="/" element={<RequireAuth />}>
         <Route path="dashboard" element={<Dashboard />} />
        </Route>
       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
    </AuthContext>
  )
}

export default App
