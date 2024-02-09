import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import {
  CardWrapper,
  DealerCard,
  DealerCode,
  DealerName,
  Form,
  GSTN,
  MarketName,
  Price,
  PriceInfo,
  PriceInput,
  UpdateButton,
  Zone,
  DealerInfo,
  ViewCard,
  ViewButton,
  ViewCardWrapper,
} from "./style";
import styled from "styled-components";

const Market = () => {
  const firebase = useFirbase();
  const {
    data,
    isLoggedIn,
    updateData,
    search,
    setSearch,
    setTableData,
    tableData,
  } = firebase;
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
  useEffect(() => {
    let newTableData = {};

    if (viewMarket) {
      Object.keys(data).forEach((key) => {
        if (data[key].Market === viewMarket) {
          newTableData = {
            ...newTableData,
            [key]: data[key],
          };
        }
      });
    } else {
      newTableData = data;
    }

    // Check if newTableData is different before updating
    if (JSON.stringify(newTableData) !== JSON.stringify(tableData)) {
      setTableData(newTableData);
    }
  }, [viewMarket, data, tableData, setTableData]);

  const updateMarketPrice = (e) => {
    e.preventDefault();

    if (!containsOnlyNumbers(e.target[0].value)) {
      window.alert("Please enter only numbers");
      e.target[0].value = "";
      return;
    }
    const market = e.target[0].id;
    const price = Number(e.target[0].value);
    const confirmation = window.confirm(
      `Price will be updated for the market ${market} to ${price}`
    );
    if (!confirmation) return;
    Object.keys(data).forEach((key) => {
      if (data[key].Market === market) {
        let newData = {
          ...data[key],
          price,
        };

        updateData(key, newData);
        e.target[0].value = "";
      }
    });
  };
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
  }, [firebase, navigate, isLoggedIn]);
  return (
    <Layout>
      {viewMarket ? (
        <>
          {isLoggedIn ? (
            <form className="col chi" onSubmit={updateMarketPrice}>
              <input  type="text" maxLength={3} id={viewMarket} />
              <button className="button-70" type="submit">
                Update All
              </button>
              <button className="button-70" onClick={() => setViewMarket(null)}>
                Back
              </button>
            </form>
          ) : (
            <form className="col chi">
              <button className="button-70" onClick={() => setViewMarket(null)}>
                Back
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
                  <CardWrapper key={key}>
                    <DealerCard>
                      <DealerInfo>
                        <DealerCode>
                          Dealer Code: {data[key]["Customer Code"]}
                        </DealerCode>
                        <GSTN>GSTIN:{data[key]["GST No"]}</GSTN>
                        <Zone>Zone: {data[key]["Zone"]}</Zone>
                        <MarketName>Market: {data[key]["Market"]}</MarketName>
                      </DealerInfo>
                      
                    </DealerCard>
                      <DealerName><h3>{data[key]["Dealer Name"]}</h3></DealerName>
                      <PriceInfo>
                        {isLoggedIn ? (
                          <Form onSubmit={updatePrice}>
                            <PriceInput
                              placeholder="000"
                              id={key}
                              maxLength={3}
                              title="Price should be a three-digit number"
                            />
                            <UpdateButton type="submit">update</UpdateButton>
                          </Form>
                        ) : null}
                        <Price><span className="rs-symbol">₹</span>{data[key]["price"]}</Price>
                      </PriceInfo>
                  </CardWrapper>
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
                  <ViewCardWrapper key={market}>
                    <ViewCard>
                      <MarketName style={{textAlign: "center"}}>{market}</MarketName>
                      <PriceInfo>
                        <ViewButton
                          type="button"
                          onClick={() => {
                            setSearch("");
                            setViewMarket(market);
                          }}
                        >
                          view
                        </ViewButton>
                      </PriceInfo>
                    </ViewCard>
                  </ViewCardWrapper>
                )
            )}
        </div>
      )}
    </Layout>
  );
};

export default Market;
