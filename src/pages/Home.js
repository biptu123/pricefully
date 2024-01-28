import React from "react";
import { useFirbase } from "../context/Firebase";

const Home = () => {
  const firebase = useFirbase();
  return (
    <div className="">
      Hello
      <pre>{firebase?.user ? JSON.stringify(firebase?.user) : "Guest"}</pre>
    </div>
  );
};

export default Home;
