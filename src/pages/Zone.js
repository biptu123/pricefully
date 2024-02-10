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
  Zone as ZoneName,
  DealerInfo,
  ViewCard,
  ViewButton,
  ViewCardWrapper,
} from "./style";

const Zone = () => {
  const firebase = useFirbase();
  const {
    data,
    isLoggedIn,
    updateData,
    search,
    setSearch,
    setTableData,
    tableData,
    addPriceHistory,
    currentAvg,
  } = firebase;
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
    if (!containsOnlyNumbers(e.target[0].value)) {
      window.alert("Please enter only numbers");
      e.target[0].value = "";
      return;
    }
    const zone = e.target[0].id;
    const price = Number(e.target[0].value);
    const updatedData = data;
    const confirmation = window.confirm(
      `Price will be updated for the zone ${zone} to ${price}`
    );
    if (!confirmation) return;
    Object.keys(data).forEach((key) => {
      if (data[key].Zone === zone) {
        let newData = {
          ...data[key],
          price,
        };

        updatedData[key] = newData;

        updateData(key, newData);
        e.target[0].value = "";
      }
    });
    addPriceHistory(updatedData, {
      target: "zone",
      targetName: zone,
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
      updatedTo: price,
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
  }, [firebase, navigate, isLoggedIn]);

  useEffect(() => {
    let newTableData = {};

    if (viewZone) {
      Object.keys(data).forEach((key) => {
        if (data[key].Zone === viewZone) {
          newTableData = {
            ...newTableData,
            [key]: data[key],
          };
        }
      });
    } else {
      newTableData = data;
    }

    if (JSON.stringify(newTableData) !== JSON.stringify(tableData)) {
      setTableData(newTableData);
    }
  }, [viewZone, data, tableData, setTableData]);
  return (
    <Layout>
      {viewZone ? (
        <>
          {isLoggedIn ? (
            <form className="col chi" onSubmit={updateZonePrice}>
              <input type="text" maxLength={3} id={viewZone} />
              <button className="button-70" type="submit">
                Update All
              </button>
              <button className="button-70" onClick={() => setViewZone(null)}>
                Back
              </button>
            </form>
          ) : (
            <form className="col chi">
              <button className="button-70" onClick={() => setViewZone(null)}>
                Back
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
                  <CardWrapper key={key}>
                    <DealerCard>
                      <DealerInfo>
                        <DealerCode>
                          Dealer Code: {data[key]["Customer Code"]}
                        </DealerCode>
                        <GSTN>GSTIN:{data[key]["GST No"]}</GSTN>
                        <ZoneName>Zone: {data[key]["Zone"]}</ZoneName>
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
                    <ViewCardWrapper key={zone}>
                      <ViewCard>
                        <MarketName style={{ textAlign: "center" }}>
                          {zone}
                        </MarketName>
                        <PriceInfo>
                          <ViewButton
                            type="button"
                            onClick={() => {
                              setSearch("");
                              setViewZone(zone);
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
        </>
      )}
    </Layout>
  );
};

export default Zone;
