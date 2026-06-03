import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

        try {

            await axios.post(
                "http://localhost:8080/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert("Registration Successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

            alert("Registration Failed");
        }
    };

    return (
        <div className="register-container">

            <div className="register-card">

                <h2>Create Account</h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <button onClick={handleRegister}>
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;