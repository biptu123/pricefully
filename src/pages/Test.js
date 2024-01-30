import React from "react";
import { useFirbase } from "../context/Firebase";
import info from "../data/info.json";

const Test = () => {
  const firebase = useFirbase();
  const putNewData = () => {
    // console.log(info.data);

    info?.data.map((data) => {
      let newData = {
        integer1: 0,
        integer2: 0,
        integer3: 0,
      };
      firebase.putData(`modules/module${data["Customer Code"]}`, newData);
    });
  };
  return (
    <div>
      <button onClick={putNewData}>Put Data</button>
    </div>
  );
};

export default Test;
