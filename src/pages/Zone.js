import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import { Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";

const Zone = () => {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData } = firebase;
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
  return (
    <Layout>
      {viewZone ? (
        <>
          <h1 className="text-center">{viewZone} Zone</h1>
          <div className="d-flex flex-column">
            {isLoggedIn ? (
              <form
                className="d-flex justify-content-center"
                onSubmit={updateZonePrice}
              >
                <input type="text" placeholder="Update price" id={viewZone} />
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button variant="danger" onClick={() => setViewZone(null)}>
                  Goback
                </Button>
              </form>
            ) : (
              <form className="d-flex justify-content-center">
                <Button variant="danger" onClick={() => setViewZone(null)}>
                  Goback
                </Button>
              </form>
            )}
            <div className="d-flex flex-wrap justify-content-between">
              {data &&
                Object.keys(data).map((key) =>
                  data[key].Zone === viewZone ? (
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
                      </Card.Body>
                    </Card>
                  ) : null
                )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center">All Zones</h1>

          <div className="d-flex flex-wrap justify-content-between">
            {zones &&
              zones.map((zone) => (
                <Card className="my-3" style={{ width: "18rem" }} key={zone}>
                  <Card.Body>
                    <Card.Title>{zone}</Card.Title>
                    <Card.Text></Card.Text>
                    <Button variant="success" onClick={() => setViewZone(zone)}>
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Zone;
