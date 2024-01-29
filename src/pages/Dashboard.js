import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useFirbase } from "../context/Firebase";

const Dashboard = () => {
  const firebase = useFirbase();

  const navigate = useNavigate();
  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  return (
    <Layout>
      {/* <div className="row row-1">
        <div className="col">
          <div className="total-invoice">
            <h3 className="cardtittle">Dashboard</h3>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Dashboard;
