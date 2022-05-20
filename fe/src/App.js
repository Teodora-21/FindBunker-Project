import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import Bars from "./components/Bars";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/Navbar";
import Home from "./container/Home";

function App() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Router>
      <div className="bg-gray-300 h-screen w-screen">
        <NavBar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
