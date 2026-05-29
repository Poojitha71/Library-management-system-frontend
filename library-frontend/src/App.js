import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/dashboard" element = {<ProtectedRoute><Dashboard/></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
