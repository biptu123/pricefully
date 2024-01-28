import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import { Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";

function All() {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData } = firebase;

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
      <h1 className="text-center">All Data</h1>
      <div className="d-flex flex-wrap justify-content-between">
        {data &&
          Object.keys(data).map((key) => (
            <Card className="my-3" style={{ width: "18rem" }} key={key}>
              <Card.Body>
                <Card.Title>{data[key]["Dealer Name"]}</Card.Title>
                <Card.Text>
                  {data[key] &&
                    Object.keys(data[key]).map((ikey) => (
                      <div key={ikey}>
                        <b>{ikey}: </b> {data[key][ikey]}
                      </div>
                    ))}
                </Card.Text>
                {isLoggedIn ? (
                  <form className="d-flex" onSubmit={updatePrice}>
                    <input type="text" placeholder="Update price" id={key} />
                    <Button variant="primary" type="submit">
                      Update
                    </Button>
                  </form>
                ) : null}
              </Card.Body>
            </Card>
          ))}
      </div>
    </Layout>
  );
}

export default All;
