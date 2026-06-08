import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Applications from "./pages/Applications";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={{ padding: "15px", display: "flex", gap: "20px", justifyContent: "center" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/companies">Companies</Link>
      <Link to="/applications">Applications</Link>
      <Link to="/admin">Admin</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/admin" element={<Admin />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;