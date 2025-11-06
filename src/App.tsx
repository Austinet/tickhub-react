import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AuthContext from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import Tickets from "./pages/Tickets";
import AddTicket from "./pages/AddTicket";
import UpdateTicket from "./pages/UpdateTicket";

function App() {
  return (
    <AuthContext>
      <section className="max-w-[1440px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route path="/" element={<RequireAuth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/add" element={<AddTicket />} />
            <Route path="tickets/update/:id" element={<UpdateTicket />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>
    </AuthContext>
  );
}

export default App;
