import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="hero-card">

        <h1>📚 Library Management System</h1>

        <p>
          Manage books, track borrowing records,
          and maintain your library efficiently.
        </p>

        <div className="home-buttons">

          <Link to="/login">
            <button>Login</button>
          </Link>

          <Link to="/register">
            <button>Register</button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;