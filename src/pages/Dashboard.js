import React, { useState } from "react";
import Layout from "../components/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="row row-1">
        <div className="col">
          <div className="total-invoice">
            <h3 className="cardtittle">Dashboard</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
