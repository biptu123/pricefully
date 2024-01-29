import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import { Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Zone = () => {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData, search, setSearch } = firebase;
  const [zones, setZones] = useState([]);
  const [viewZone, setViewZone] = useState(null);
  useEffect(() => {
    if (data) {
      const uniqueZones = Array.from(
        new Set(Object.values(data).map((item) => item.Zone))
      );
      setZones(uniqueZones);
    }
  }, [data]);

  const updateZonePrice = (e) => {
    e.preventDefault();
    const zone = e.target[0].id;
    const price = Number(e.target[0].value);
    const confirmation = window.confirm(
      `Price will be updated for the zone ${zone} to ${price}`
    );
    if (!confirmation) return;
    Object.keys(data).map((key) => {
      if (data[key].Zone === zone) {
        let newData = {
          ...data[key],
          price,
        };

        updateData(key, newData);
      }
    });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);
  return (
    <Layout>
      {viewZone ? (
        <>
          {isLoggedIn ? (
            <form className="col chi" onSubmit={updateZonePrice}>
              <input type="text" placeholder="Update price" id={viewZone} />
              <button className="button-70" type="submit">
                Update
              </button>
              <button className="button-70" onClick={() => setViewZone(null)}>
                Goback
              </button>
            </form>
          ) : (
            <form className="col chi">
              <button className="button-70" onClick={() => setViewZone(null)}>
                Goback
              </button>
            </form>
          )}
          <div className="row row-2">
            {data &&
              Object.keys(data).map((key) =>
                data[key].Zone === viewZone &&
                data[key]["Dealer Name"]
                  .toUpperCase()
                  .includes(search.toUpperCase()) ? (
                  <div className="col" key={key}>
                    <div className="total-invoice">
                      <h3 className="cardtittle">{data[key]["Dealer Name"]}</h3>
                      <h5 className="cardtittle">{data[key]["GST No"]}</h5>
                      <h5 className="cardtittle">{data[key]["Zone"]}</h5>

                      <div className="price">₹{data[key]["price"]}</div>
                    </div>
                  </div>
                ) : null
              )}
          </div>
        </>
      ) : (
        <>
          <div className="row row-2">
            {zones &&
              zones.map(
                (zone) =>
                  zone.toUpperCase().includes(search.toUpperCase()) && (
                    <div className="col" key={zone}>
                      <div className="total-invoice">
                        <h3 className="cardtittle">{zone}</h3>
                        <button
                          className="button-70"
                          role="button"
                          onClick={() => {
                            setSearch("");
                            setViewZone(zone);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  )
              )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Zone;
