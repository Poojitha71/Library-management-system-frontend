import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem("token");
    
        navigate("/");
    };

    return (

        <nav className="navbar">

            <h2>📚 Library System</h2>

            <div>

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/books">
                    Books
                </Link>

                <Link to="/add-book">Add Book</Link>
                
                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;