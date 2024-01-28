import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFirbase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const firebase = useFirbase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await firebase.signupUser(email, password);
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
      <Form onSubmit={handleSubmit}>
        <h1 className="text-center">Signup</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={isSubmitting}>
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
