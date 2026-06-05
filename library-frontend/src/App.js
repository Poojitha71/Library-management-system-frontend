import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import Books from "./Pages/Books";
import AddBook from "./Pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";
import BorrowedBooks from "./Pages/BorrowedBooks";
import AdminBorrowHistory from "./Pages/AdminBorrowHistory";

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin-history" element={<AdminBorrowHistory />} />
      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-book"
        element={
          <ProtectedRoute roleRequired="ADMIN">
            <AddBook />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-books"
        element={
          <ProtectedRoute>
            <BorrowedBooks />
          </ProtectedRoute>
        }
      />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
