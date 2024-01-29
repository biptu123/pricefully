// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Test from "./pages/Test";
import All from "./pages/All";
import Zone from "./pages/Zone";
import Market from "./pages/Market";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/see-all" Component={All} />
        {/* <Route path="/test" Component={Test} /> */}
        <Route path="/zone" Component={Zone} />
        <Route path="/market" Component={Market} />
      </Routes>
    </>
  );
}

export default App;
