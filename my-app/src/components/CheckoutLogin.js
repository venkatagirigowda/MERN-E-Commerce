import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  setadmin } from "../slices/cartslice";

function CheckoutLogin() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", password: "" });
  const changed = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value.toLowerCase() });
    if (e.target.value === "venkatgiri@vggcart.com") {
      dispatch(setadmin());
    }
  };
  const clicked = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", user);
      localStorage.setItem("isLogin", "true");
      navigate("/Checkout");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <React.Fragment>
      <Button variant="primary" className="homebtn">
        <Link className="item" to="/">
          Home
        </Link>
      </Button>
      <h2
        className="loginheading"
        style={{ color: "#949398ff", textAlign: "center" }}
      >
        Login Details
      </h2>
      <div className="Login">
        <div className="logins">
          <div className="loginsub">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={user.email}
                  onChange={changed}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={user.password}
                  onChange={changed}
                />
              </Form.Group>
              <Button
                className="loginsubmit"
                variant="primary"
                type="submit"
                onClick={clicked}
              >
                Login
              </Button>
              <br></br> <br></br>
              <h5>
                <a className="linkregister" href="/Register">
                  Not Registered?Create Account
                </a>
              </h5>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckoutLogin;
