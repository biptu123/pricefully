import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirbase } from "../../context/Firebase";

const SideMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const firebase = useFirbase();
  const { data, isLoggedIn, logoutUser, signinWithGoogle } = firebase;

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  const navigate = useNavigate();
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
        {isLoggedIn ? (
          <li onClick={logoutUser}>
            <i className="fa fa-credit-card-alt" />
            <a>Logout</a>
          </li>
        ) : (
          <li onClick={signinWithGoogle}>
            <i className="fa fa-credit-card-alt" />
            <a>Login with google</a>
          </li>
        )}
      </ul>
      <div className="grid">
        <div className="grid-container">
          <table>
            <thead>
              <tr className="header">
                <th>
                  Dealer Name<div>Dealer Name</div>
                </th>
                <th>
                  Price<div>Price</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                Object.keys(data).map((key) => (
                  <tr key={key}>
                    <td>{data[key]["Dealer Name"]}</td>
                    <td>{data[key]["price"]}</td>
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
