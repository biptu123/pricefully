import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFirbase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const firebase = useFirbase();
  const [email, setEmail] = useState("amritcem@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await firebase.signinUser(email, password);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [firebase, navigate]);
  return (
    <div className="container">
      <div className="row row-2">
        <div className="col">
          <div
            className="total-invoice"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <form onSubmit={handleSubmit}>
              <input
                className="chi"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="button-70"
                type="submit"
                disabled={isSubmitting}
              >
                Login to your account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
