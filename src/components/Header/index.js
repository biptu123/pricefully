import React from "react";
import { useNavigate } from "react-router-dom";
import { useFirbase } from "../../context/Firebase";

const Header = () => {
  const firebase = useFirbase();
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logoname">Amrit Cement</span>
      </div>

      <div className="searchbox">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search"
            value={firebase.search}
            onChange={(e) => firebase.setSearch(e.target.value)}
          />
          <i className="fa fa-search" />
        </form>
      </div>
    </nav>
  );
};

export default Header;
