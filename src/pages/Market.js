import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import SideMenu from "../components/SideMenu";
import { Button, Card } from "react-bootstrap";
import Layout from "../components/Layout";

const Market = () => {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData } = firebase;
  const [markets, setMarkets] = useState([]);
  const [viewMarket, setViewMarket] = useState(null);
  useEffect(() => {
    if (data) {
      const uniqueMarkets = Array.from(
        new Set(Object.values(data).map((item) => item.Market))
      );
      setMarkets(uniqueMarkets);
    }
  }, [data]);
  const updateMarketPrice = (e) => {
    e.preventDefault();
    const market = e.target[0].id;
    const price = Number(e.target[0].value);
    const confirmation = window.confirm(
      `Price will be updated for the market ${market} to ${price}`
    );
    if (!confirmation) return;
    Object.keys(data).map((key) => {
      if (data[key].Market === market) {
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
      {viewMarket ? (
        <>
          <h1 className="text-center">{viewMarket} Market</h1>

          <div className="d-flex flex-column">
            {isLoggedIn ? (
              <form
                className="d-flex justify-content-center"
                onSubmit={updateMarketPrice}
              >
                <input type="text" placeholder="Update price" id={viewMarket} />
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button variant="danger" onClick={() => setViewMarket(null)}>
                  Goback
                </Button>
              </form>
            ) : (
              <form className="d-flex justify-content-center">
                <Button variant="danger" onClick={() => setViewMarket(null)}>
                  Goback
                </Button>
              </form>
            )}
            <div className="d-flex flex-wrap justify-content-between">
              {data &&
                Object.keys(data).map((key) =>
                  data[key].Market === viewMarket ? (
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
          <h1 className="text-center">All Markets</h1>

          <div className="d-flex flex-wrap justify-content-between">
            {markets &&
              markets.map((market) => (
                <Card className="my-3" style={{ width: "18rem" }} key={market}>
                  <Card.Body>
                    <Card.Title>{market}</Card.Title>
                    <Card.Text></Card.Text>
                    <Button
                      variant="success"
                      onClick={() => setViewMarket(market)}
                    >
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

export default Market;
