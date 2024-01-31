import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import { Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

function All() {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData, search, tableData, setTableData } =
    firebase;

  const updatePrice = (e) => {
    e.preventDefault();
    if (!containsOnlyNumbers(e.target[0].value)) {
      window.alert("Please enter only numbers");
      e.target[0].value = "";
      return;
    }
    const key = e.target[0].id;
    const price = Number(e.target[0].value);
    const newData = {
      ...data[key],
      price,
    };

    const confirmation = window.confirm(`Price will be updated to ${price}`);
    if (!confirmation) return;
    updateData(key, newData);
    e.target[0].value = "";
  };

  function containsOnlyNumbers(str) {
    const regex = /^[0-9]+$/;

    return regex.test(str);
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(tableData)) {
      setTableData(data);
    }
  }, [data, tableData, setTableData]);

  return (
    <Layout>
      <div className="row row-2">
        {data &&
          Object.keys(data).map(
            (key) =>
              data[key]["Dealer Name"]
                .toUpperCase()
                .includes(search.toUpperCase()) && (
                <div className="col" key={key}>
                  <div className="total-invoice">
                    <h3 className="cardtittle">{data[key]["Dealer Name"]}</h3>
                    <h5 className="cardtext">{data[key]["GST No"]}</h5>
                    <h5 className="cardtext">{data[key]["Zone"]}</h5>

                    <div className="price">₹{data[key]["price"]}</div>
                    {isLoggedIn ? (
                      <form className="chi" onSubmit={updatePrice}>
                        <input
                          type="text"
                          id={key}
                          maxLength={3}
                          title="Price should be a three-digit number"
                        />
                        <button
                          className="button-70"
                          role="button"
                          type="submit"
                        >
                          Edit
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              )
          )}
      </div>
    </Layout>
  );
}

export default All;
