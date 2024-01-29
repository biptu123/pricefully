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
  apiKey: "AIzaSyDxD_ii3p12OLBcDjZWOgVnAqkyeMOLQqE",
  authDomain: "cement-project.firebaseapp.com",
  projectId: "cement-project",
  storageBucket: "cement-project.appspot.com",
  messagingSenderId: "1065481591862",
  appId: "1:1065481591862:web:84c3253f94db5dc3cbcc97",
  measurementId: "G-JYDE9BGGFE",
  databaseURL: "https://cement-project-default-rtdb.firebaseio.com",
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
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
    onValue(ref(database, "test"), (snapshot) => {
      setData(snapshot.val());
    });
  }, []);
  const signupUser = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUser = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      // Handle successful authentication
      alert(`Hello ${result?.user?.displayName}`);
    } catch (error) {
      // Handle error, including the specific error code
      if (error.code === "auth/cancelled-popup-request") {
        alert("Popup request cancelled by the user");
        // Provide feedback to the user, e.g., ask them to try again
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

    try {
      set(dataRef, newData);
      console.log("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const isLoggedIn = user ? true : false;

  const baseAddress = "A6mo2jctRRgwZbf8NfFdpwq8SJ03";

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
  };

  return (
    <FirebaseContext.Provider value={value}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
