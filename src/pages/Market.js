import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import Layout from "../components/Layout";

const Market = () => {
  const firebase = useFirbase();
  const { data, isLoggedIn, updateData, search, setSearch } = firebase;
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
          {isLoggedIn ? (
            <form className="col chi" onSubmit={updateMarketPrice}>
              <input type="text" placeholder="Update price" id={viewMarket} />
              <button className="button-70" type="submit">
                Update
              </button>
              <button className="button-70" onClick={() => setViewMarket(null)}>
                Goback
              </button>
            </form>
          ) : (
            <form className="col chi">
              <button className="button-70" onClick={() => setViewMarket(null)}>
                Goback
              </button>
            </form>
          )}
          <div className="row row-2">
            {data &&
              Object.keys(data).map((key) =>
                data[key].Market === viewMarket &&
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
        <div className="row row-2">
          {markets &&
            markets.map(
              (market) =>
                market &&
                market.toUpperCase().includes(search.toUpperCase()) && (
                  <div className="col" key={market}>
                    <div className="total-invoice">
                      <h3 className="cardtittle">{market}</h3>
                      <button
                        className="button-70"
                        role="button"
                        onClick={() => {
                          setSearch("");
                          setViewMarket(market);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                )
            )}
        </div>
      )}
    </Layout>
  );
};

export default Market;
