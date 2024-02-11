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
  const [intervalType, setIntervalType] = useState("week");
  const [avgPrice, setAvgPrice] = useState(0);
  const navigate = useNavigate();
  const { priceHistory, data, tableData, setTableData, currentAvg } = firebase;

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      navigate("/");
    }
    if (data) {
      if (currentAvg) setAvgPrice(currentAvg);
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

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(tableData)) {
      setTableData(data);
    }
  }, [data, tableData, setTableData]);

  return (
    <Layout>
      {
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={plotData} width={500}>
            <CartesianGrid strokeDasharray="1 1" stroke="#6963dd" />
            <XAxis
              dataKey="label"
              stroke="#0b570b"
              domain={["2023-01-01", "2023-12-31"]}
              tick={{ fontSize: 12, fill: "#333" }} // Adjust font size and color of ticks
              tickSize={5} // Adjust size of ticks
              tickMargin={10} // Adjust margin between ticks and labels
              axisLine={{ stroke: "#333" }} // Style axis line
              tickLine={{ stroke: "none" }}
            />
            <YAxis stroke="#cc415f" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#000000"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      }
      <IntervalButtonWrapper>
        <IntervalButton
          onClick={() => setIntervalType("week")}
          active={intervalType === "week"}
        >
          Week
        </IntervalButton>
        <IntervalButton
          onClick={() => setIntervalType("month")}
          active={intervalType === "month"}
        >
          Month
        </IntervalButton>
        <IntervalButton
          onClick={() => setIntervalType("sixMonth")}
          active={intervalType === "sixMonth"}
        >
          6 Months
        </IntervalButton>
        <IntervalButton
          onClick={() => setIntervalType("year")}
          active={intervalType === "year"}
        >
          Year
        </IntervalButton>
      </IntervalButtonWrapper>
      {avgPrice && (
        <CurrentPrice>Current Average Price ₹ {avgPrice}</CurrentPrice>
      )}
    </Layout>
  );
};

export default Dashboard;
