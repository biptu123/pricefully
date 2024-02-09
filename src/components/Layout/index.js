import React from "react";
import SideMenu from "../SideMenu";
import Header from "../Header";

const Layout = (props) => {
  return (
    <div className="container">
      <Header />
      <div className="container-body">
        <SideMenu />
        <div className="main-body">
          <div className="cards">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
