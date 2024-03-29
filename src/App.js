import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import All from "./pages/All";
import Zone from "./pages/Zone";
import Market from "./pages/Market";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/see-all" Component={All} />
        <Route path="/zone" Component={Zone} />
        <Route path="/market" Component={Market} />
      </Routes>
    </>
  );
}

export default App;
