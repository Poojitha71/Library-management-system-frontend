import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    totalUsers: 0,
  });
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:8080/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);
    } catch (error) {
      console.log(error);

      alert("Failed to load dashboard");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>📚 Library Dashboard</h1>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total Books</h3>
            <p>{stats.totalBooks}</p>
          </div>

          <div className="dashboard-card">
            <h3>Available Books</h3>
            <p>{stats.availableBooks}</p>
          </div>

          <div className="dashboard-card">
            <h3>Borrowed Books</h3>
            <p>{stats.borrowedBooks}</p>
          </div>

          {role === "ADMIN" && (
            <div className="dashboard-card">
              <h3>Total Users</h3>
              <p>{stats.totalUsers}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
