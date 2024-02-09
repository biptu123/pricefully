import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useFirbase } from "../context/Firebase";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

// import priceHistory from "../data/priceHistory.json";
import { getGroupByIntervel } from "../helper/chart";
import { CurrentPrice, IntervalButton, IntervalButtonWrapper } from "./style";

const Dashboard = () => {
  const firebase = useFirbase();
  const [plotData, setPlotData] = useState([]);
  const [intervalType, setIntervalType] = useState("");
  const [avgPrice, setAvgPrice] = useState(0);
  const navigate = useNavigate();
  const { priceHistory, data } = firebase;

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }
    if (data) {
      let avgPrice = 0;
      let length = 0;
      Object.values(data).forEach((item) => {
        if (item?.price) {
          avgPrice += item.price;
          length++;
        }
      });
      avgPrice = avgPrice / length;
      console.log("avg", avgPrice);

      setAvgPrice(avgPrice);
      if (priceHistory) {
        const historyArray = Object.values(priceHistory).map((item) => item);
        const processedData = getGroupByIntervel(historyArray, intervalType);
        setPlotData(processedData);
      }
    }
  }, [firebase, navigate]);

  useEffect(() => {
    if (priceHistory) {
      const historyArray = Object.values(priceHistory).map((item) => item);
      const processedData = getGroupByIntervel(historyArray, intervalType);
      setPlotData(processedData);
    }
  }, [intervalType]);

  return (
    <Layout>
      <IntervalButtonWrapper>
        <IntervalButton onClick={() => setIntervalType("")}>
          Default
        </IntervalButton>
        <IntervalButton onClick={() => setIntervalType("day")}>
          Day
        </IntervalButton>
        <IntervalButton onClick={() => setIntervalType("week")}>
          Week
        </IntervalButton>
        <IntervalButton onClick={() => setIntervalType("month")}>
          Month
        </IntervalButton>
        <IntervalButton onClick={() => setIntervalType("sixMonth")}>
          6 Months
        </IntervalButton>
        <IntervalButton onClick={() => setIntervalType("year")}>
          Year
        </IntervalButton>
      </IntervalButtonWrapper>

      {
        <ResponsiveContainer width="90%" height={350}>
          <LineChart data={plotData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      }
      {avgPrice && (
        <CurrentPrice>Current Average Price ₹ {avgPrice}</CurrentPrice>
      )}
    </Layout>
  );
};

export default Dashboard;
