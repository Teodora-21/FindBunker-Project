import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Welcome from "./container/Welcome";
import Home from "./container/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/Navbar";
import Profile from "./container/Profile";
import CardInfo from "./container/CardInfo";
import NotFound from "./container/NotFound";

function App() {
  return (
    <Router>
      <NavBar />
      <Sidebar/>
      <div className="bg-gray-300 h-screen w-screen -z-50">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bunkerinfo/:bunkerId" element={<CardInfo />} >
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
