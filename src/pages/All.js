import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import { Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";

function All() {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData, search } = firebase;

  const updatePrice = (e) => {
    e.preventDefault();
    const key = e.target[0].id;
    const price = Number(e.target[0].value);
    const newData = {
      ...data[key],
      price,
    };

    const confirmation = window.confirm(`Price will be updated to ${price}`);
    if (!confirmation) return;
    updateData(key, newData);
  };

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
                    <h5 className="cardtittle">{data[key]["GST No"]}</h5>
                    <h5 className="cardtittle">{data[key]["Zone"]}</h5>

                    <div className="price">₹{data[key]["price"]}</div>
                    {isLoggedIn ? (
                      <form className="chi" onSubmit={updatePrice}>
                        <input type="text" id={key} />
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
