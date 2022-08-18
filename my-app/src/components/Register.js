import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState({});
  let name, value;
  const changed = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]:value.toLowerCase() });
  };
  const validateForm = () => {
    const { name, email, password, cpassword } = user;
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Username is Required";
    if (!email || email === "") newErrors.email = "Email is Required";
    if (!password || password === "")
      newErrors.password = "Field Cannot Be Empty";
    else if (password < 3)
      newErrors.password = "password should be more than 3 Characters";
    if (password !== cpassword)
      newErrors.cpassword = "Passwords are not Matching";
    return newErrors;
  };
  const clicked = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
    } else {
      try {
        await axios.post("http://localhost:5000/signup", user);
        alert("registration successful");
        navigate("/Login");
      } catch (error) {
        if (error.response.status === 400) {
          alert(error.response.data.error);
          console.log(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="Login">
      <div className="registers">
        <div className="loginsub">
          <Form method="POST">
            <h2>Enter your Details</h2>
            <Form.Group className="mb-3" controlId="form">
              <Form.Label style={{fontWeight:'bold',fontSize:'1rem'}}>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={changed}
                value={user.name}
                isInvalid={!!error.name}
              />
              <Form.Control.Feedback type="invalid">
                {error.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{fontWeight:'bold',fontSize:'1rem'}}>Email Address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={changed}
                value={user.email}
                isInvalid={!!error.email}
              />
              <Form.Control.Feedback type="invalid">
                {error.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label style={{fontWeight:'bold',fontSize:'1rem'}}>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={changed}
                value={user.password}
                isInvalid={!!error.password}
                autoComplete="on"
              />
              <Form.Control.Feedback type="invalid">
                {error.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label style={{fontWeight:'bold',fontSize:'1rem'}}>ConfirmPassword:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="cpassword"
                onChange={changed}
                value={user.cpassword}
                isInvalid={!!error.cpassword}
                autoComplete="on"
              />
              <Form.Control.Feedback type="invalid">
                {error.cpassword}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={clicked}>
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
