import React from "react";
import SideMenu from "../SideMenu";

const Layout = (props) => {
  return (
    <section className="d-flex">
      <SideMenu />
      <div style={{ width: "300px" }}></div>
      <div className="container">{props.children}</div>
    </section>
  );
};

export default Layout;
