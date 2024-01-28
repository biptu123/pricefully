import React from "react";
import { useFirbase } from "../context/Firebase";
import info from "../data/info.json";

const Test = () => {
  const firebase = useFirbase();
  const putNewData = () => {
    // console.log(info.data);

    info?.data.map((data) => {
      let newData = {
        ...data,
        price: 0,
      };
      firebase.putData(`test/${data.id}`, newData);
    });
  };
  return (
    <div>
      <button onClick={putNewData}>Put Data</button>
    </div>
  );
};

export default Test;
