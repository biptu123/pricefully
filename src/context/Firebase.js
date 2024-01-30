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

import { getDatabase, set, ref, get, child, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDXwvfqM--Mo5dxdzW9qG9QrU_NTkkx1ec",
  authDomain: "set-cement-price.firebaseapp.com",
  databaseURL: "https://set-cement-price-default-rtdb.firebaseio.com",
  projectId: "set-cement-price",
  storageBucket: "set-cement-price.appspot.com",
  messagingSenderId: "22792679680",
  appId: "1:22792679680:web:01553bb0f1114acf7103e5",
  measurementId: "G-J97YTG4YV2",
  databaseURL: "https://set-cement-price-default-rtdb.firebaseio.com/",
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
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    onValue(ref(database, "test"), (snapshot) => {
      setData(snapshot.val());
      setTableData(snapshot.val());
    });
    // onValue(ref(database, "modules"), (snapshot) => {
    //   setModules(snapshot.val());
    // });
  }, []);
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

  const updateData = (key, newData) => {
    const dataRef = ref(database, `test/${key}`);
    const priceRef = ref(database, `modules/module${key}`);

    try {
      let price = parseInt(newData.price);
      let newPrice = {};
      for (let i = 3; i > 0; i--) {
        let digit = price % 10;
        newPrice = { ...newPrice, [`integer${i}`]: digit };
        price = Math.floor(price / 10);
      }
      set(priceRef, newPrice);
      set(dataRef, newData);
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error.message);
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
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
