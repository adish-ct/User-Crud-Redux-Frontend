import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'; // Import useDispatch from react-redux
import { baseUrl } from "../../api/api";
import { getLocal } from "../../healpers/auth";
import { setUser } from '../actions/userActions'; // Import setUser action

// Css and bootstrap
import "./login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Login() {
  const dispatch = useDispatch(); // Add useDispatch from react-redux
  const history = useNavigate();
  const response = getLocal();

  useEffect(() => {
    if (response) {
      // User is already authenticated, redirect to home
      history("/");
    }
  }, [response, history]);

  const signupSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // Dispatch the setUser action to update the user state in the Redux store
        dispatch(setUser(data));

        localStorage.setItem("authToken", JSON.stringify(data));
        // You might also want to set an expiration time for the token
        // localStorage.setItem("tokenExpiration", data.expires_at);

        // Redirect to home after successful login
        history("/");
      } else {
        if (response.status === 401) {
          alert("User credentials mismatch");
        } else {
          alert(`Error: ${response.statusText}`);
        }
        history("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="maindiv">
      <div >
        <div className="card custom-card" style={{ display: "block", width: 400, padding: 30 }}>
          <h4>Login</h4>
          <Form onSubmit={(e) => signupSubmit(e)}>
            <Form.Group className="py-4">
              <Form.Control type="email" name="email" placeholder="Email" />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button className="my-4 login-button" type="submit">
              Submit
            </Button>
            <div className="login-footer-item mt-4">
              <p className="text-center text-muted mb-0">
                Don't have an account yet?
              </p>
              <Link to="/register" className="fw-bold sign-up nav-link">
                Sign up
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
