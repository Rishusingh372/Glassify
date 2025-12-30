import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.post("/admin/login", { email, password });

    if (res.data.token) {
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
};

export default AdminLogin;
