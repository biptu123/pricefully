import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirbase } from "../../context/Firebase";
import "./style.css";

const SideMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const firebase = useFirbase();
  const { tableData, isLoggedIn, logoutUser, signinWithGoogle } = firebase;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {}, []);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = window.confirm("Are you sure you want to log out");
    if (!result) return;
    logoutUser();
  };
  return (
    <div className="sidebar">
      <ul>
        <li
          className={location.pathname == "/dashboard" ? "dashboard" : null}
          onClick={() => navigate("/dashboard")}
        >
          <i className="fa fa-dashcube" />
          <a>Dashboard</a>
        </li>
        <li
          className={location.pathname == "/zone" ? "dashboard" : null}
          onClick={() => navigate("/zone")}
        >
          <i className="fa fa-money" />
          <a>Zone</a>
        </li>
        <li
          className={location.pathname == "/market" ? "dashboard" : null}
          onClick={() => navigate("/market")}
        >
          <i className="fa fa-envelope-o" />
          <a>Market</a>
        </li>
        <li
          className={location.pathname == "/see-all" ? "dashboard" : null}
          onClick={() => navigate("/see-all")}
        >
          <i className="fa fa-credit-card-alt" />
          <a>All</a>
        </li>
        {isLoggedIn && (
          <li onClick={handleLogout}>
            <i className="fa fa-credit-card-alt" />
            <a>Logout</a>
          </li>
        )}
        <li onClick={toggleSidebar} className="toogle-btn">
          <i className="fa fa-credit-card-alt" />
          <a>{isSidebarOpen ? "Close" : "Show"}</a>
        </li>
      </ul>
      <div className={`responsive-wrapper ${isSidebarOpen ? "open" : "close"}`}>
        <div className="table-title">
          <span>Dealer Name</span> <span>Price</span>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="table-body">
              {tableData &&
                Object.keys(tableData).map((key) => (
                  <tr key={key}>
                    <td>{tableData[key]["Dealer Name"]}</td>
                    <td>{tableData[key]["price"]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
