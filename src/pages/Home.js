import React, { useEffect, useState } from "react";
import { useFirbase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Home = () => {
  const navigate = useNavigate();
  const firebase = useFirbase();
  const [email, setEmail] = useState("amritcem@gmail.com");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    console.log("Hello");
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
    <>
      <div className="main-logo">
        <img src={logo} alt="" />
      </div>
      <div className="container">
        <div className="login-box">
          <h2>Admin</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>
            {!isSubmitting ? (
              <a onClick={handleSubmit}>Submit</a>
            ) : (
              <a>Please wait.....</a>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
