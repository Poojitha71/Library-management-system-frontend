import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>📚 Library System</h2>

      <div>
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/books">Books</Link>

        {role === "ADMIN" && <Link to="/add-book">Add Book</Link>}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
