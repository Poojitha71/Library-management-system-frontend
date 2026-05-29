import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email: email,
          password: password
        }
      );

      console.log(response.data);

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");
    }
  };

  const getData = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:8080/books/test",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);
  };

  return (
    <div>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br /><br />

      <button onClick={getData}>
        Test API
      </button>

    </div>
  );
}

export default Login;