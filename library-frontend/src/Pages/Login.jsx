import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2>📚 Library Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

      </div>

    </div>
  );
}

export default Login;