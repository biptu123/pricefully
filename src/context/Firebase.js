import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import { getDatabase, set, ref, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXwvfqM--Mo5dxdzW9qG9QrU_NTkkx1ec",
  authDomain: "set-cement-price.firebaseapp.com",
  databaseURL: "https://set-cement-price-default-rtdb.firebaseio.com",
  projectId: "set-cement-price",
  storageBucket: "set-cement-price.appspot.com",
  messagingSenderId: "22792679680",
  appId: "1:22792679680:web:01553bb0f1114acf7103e5",
  measurementId: "G-J97YTG4YV2",
  // databaseURL: "https://set-cement-price-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);
export const useFirbase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [tableData, setTableData] = useState(null);
  const [priceHistory, setPriceHistory] = useState(null);
  const [currentAvg, setCurrentAvg] = useState(null);

  useEffect(() => {
    const testRef = ref(database, "test");
    const priceHistoryRef = ref(database, "price_history");

    // Fetch user authentication state
    const unsubscribeAuth = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    // Fetch test data and calculate average price
    const unsubscribeTest = onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setTableData(data);
    });

    // Fetch price history data
    const unsubscribePriceHistory = onValue(priceHistoryRef, (snapshot) => {
      setPriceHistory(snapshot.val());
    });

    // Cleanup functions to remove event listeners
    return () => {
      unsubscribeAuth();
      unsubscribeTest();
      unsubscribePriceHistory();
    };
  }, [database, firebaseAuth]);

  useEffect(() => {
    if (data) {
      let total = 0;
      let count = 0;
      Object.values(data).forEach((item) => {
        if (item?.price) {
          total += item.price;
        }
        count++;
      });
      const avgPrice = count > 0 ? total / count : 0;
      setCurrentAvg(avgPrice.toFixed(2));
    }
  }, [data]);

  const signupUser = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUser = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      alert(`Hello ${result?.user?.displayName}`);
    } catch (error) {
      if (error.code === "auth/cancelled-popup-request") {
        alert("Popup request cancelled by the user");
      } else {
        alert("Authentication error:", error);
      }
    }
  };

  const logoutUser = () => {
    firebaseAuth.signOut();
    setUser(null);
  };

  const putData = (key, data) => set(ref(database, key), data);

  const updateData = async (key, newData) => {
    const dataRef = ref(database, `test/${key}`);
    const priceRef = ref(database, `modules/module${newData["Customer Code"]}`);

    try {
      let price = parseInt(newData.price);
      let newPrice = {};
      for (let i = 3; i >= 1; i--) {
        const digit = price % 10;
        newPrice[`integer${i}`] = digit;
        price = Math.floor(price / 10);
      }
      await set(priceRef, newPrice);
      await set(dataRef, newData);

      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const addPriceHistory = async (data, info) => {
    try {
      const priceHistoryRef = ref(database, "price_history");
      const timestamp = new Date().toISOString();
      let avgPrice = null;
      if (data) {
        let total = 0;
        let count = 0;
        Object.values(data).forEach((item) => {
          if (item?.price) {
            total += item.price;
          }
          count++;
        });
        avgPrice = count > 0 ? total / count : 0;
      }
      const priceHistoryData = {
        info,
        price: avgPrice.toFixed(2),
        timestamp,
      };
      await push(priceHistoryRef, priceHistoryData);
      console.log("Price history added successfully!");
    } catch (error) {
      console.error("Error adding price history:", error.message);
    }
  };

  const isLoggedIn = user ? true : false;

  const value = {
    signupUser,
    signinUser,
    signinWithGoogle,
    isLoggedIn,
    user,
    data,
    logoutUser,
    putData,
    updateData,
    search,
    setSearch,
    tableData,
    setTableData,
    priceHistory,
    addPriceHistory,
    currentAvg,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
