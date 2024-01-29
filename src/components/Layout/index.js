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
            {/* <div className="row row-1">
              <div className="col">
                <div className="debit-card">
                  <h6 className="cardtittle">Nagaon</h6>
                  <h3 className="cardnumber">₹520</h3>
                  <button onclick="myFunction()">&gt;</button>
                  <div className="chi">
                    <input maxLength={3} size={3} className="ip" />
                    <div className="price">
                      <button className="button-70" role="button">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
