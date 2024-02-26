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
} from "./style";

function All() {
  const firebase = useFirbase();
  const {
    data,
    isLoggedIn,
    updateData,
    search,
    tableData,
    setTableData,
    addPriceHistory,
    currentAvg,
  } = firebase;

  const updateAll = (e) => {
    e.preventDefault();
    if (!containsOnlyNumbers(e.target[0].value)) {
      window.alert("Please enter only numbers");
      e.target[0].value = "";
      return;
    }
    const price = Number(e.target[0].value);
    const updatedData = data;
    const confirmation = window.confirm(
      `Price will be updated for all to ${price}`
    );
    if (!confirmation) return;
    Object.keys(data).forEach((key) => {
      let newData = {
        ...data[key],
        price,
      };

      updatedData[key] = newData;

      updateData(key, newData);
      e.target[0].value = "";
    });
    addPriceHistory(updatedData, {
      target: "all",
      targetName: "all",
      updatedTo: price,
    });
  };

  const updatePrice = (e) => {
    e.preventDefault();
    if (!containsOnlyNumbers(e.target[0].value)) {
      window.alert("Please enter only numbers");
      e.target[0].value = "";
      return;
    }
    const updatedData = data;

    const key = e.target[0].id;
    const price = Number(e.target[0].value);
    const newData = {
      ...data[key],
      price,
    };
    updatedData[key] = newData;

    const confirmation = window.confirm(`Price will be updated to ${price}`);
    if (!confirmation) return;
    updateData(key, newData);
    e.target[0].value = "";
    addPriceHistory(updatedData, {
      target: "dealer",
      targetName: newData["Dealer Name"],
      updatedTo: newData.price,
    });
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
      {isLoggedIn ? (
        <form className="col chi" onSubmit={updateAll}>
          <input type="text" maxLength={3} />
          <button className="button-70" type="submit">
            Update All
          </button>
        </form>
      ) : null}
      <div className="row row-2">
        {data &&
          Object.keys(data).map(
            (key) =>
              data[key]["Dealer Name"]
                .toUpperCase()
                .includes(search.toUpperCase()) && (
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
                  <DealerName>
                    <h3>{data[key]["Dealer Name"]}</h3>
                  </DealerName>
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
                    <Price>
                      <span className="rs-symbol">₹</span>
                      {data[key]["price"]}
                    </Price>
                  </PriceInfo>
                </CardWrapper>
              )
          )}
      </div>
    </Layout>
  );
}

export default All;
