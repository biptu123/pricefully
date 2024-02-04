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
  Market,
  Price,
  PriceInfo,
  PriceInput,
  UpdateButton,
  Zone,
  DealerInfo,
} from "./style";

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
                <CardWrapper key={key}>
                  <DealerCard>
                    <DealerInfo>
                      <DealerCode>
                        Dealer Code: {data[key]["Customer Code"]}
                      </DealerCode>
                      <GSTN>GSTN:{data[key]["GST No"]}</GSTN>
                      <Zone>Zone: {data[key]["Zone"]}</Zone>
                      <Market>Market: {data[key]["Market"]}</Market>
                    </DealerInfo>
                    <DealerName>{data[key]["Dealer Name"]}</DealerName>
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
                      <Price>₹{data[key]["price"]}</Price>
                    </PriceInfo>
                  </DealerCard>
                </CardWrapper>
              )
          )}
      </div>
    </Layout>
  );
}

export default All;
