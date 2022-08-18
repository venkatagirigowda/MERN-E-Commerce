import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../slices/cartslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NavScrollExample(props) {
  const [term, setTerm] = useState("");
  const [categories, setCategories] = useState("");
  const dispatch = useDispatch();
  const item = useSelector((state) => state.cart.value);
  const navigate = useNavigate();
  const addtoCart = (product, id, stock, quantity) => {
    dispatch(add({ product, id, stock, quantity }));
  };
  localStorage.setItem("stock", "false");
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const loggedout = () => {
    try {
      axios.get("http://localhost:5000/logout");
      localStorage.removeItem("address");
      localStorage.removeItem("cart");
      localStorage.removeItem("isLogin");
      localStorage.removeItem("isOrdered");
      localStorage.removeItem("order");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <React.Fragment>
      <Navbar className="navbarmain" expand="lg">
        <Container fluid>
          <Navbar.Brand className="brand" href="/">
            <FontAwesomeIcon
              style={{ color: "#f4df4eff " }}
              icon={faCartShopping}
            />{" "}
            VGGCart
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <div className="navelement">
                <Link className="item" to="/Orderdetails">
                  My Order's
                </Link>
                {isLogin ? (
                  <button className="logoutbutton" onClick={loggedout}>
                    <h5>
                      <a href="/">Logout</a>
                    </h5>
                  </button>
                ) : (
                  <Link className="item" to="/Login">
                    Login
                  </Link>
                )}
                <Link className="item" to="/Seller">
                  Seller
                </Link>

                <Link className="item" to="/Cart">
                  <div className="cartitem">
                    <p>{item.length}</p>
                    <FontAwesomeIcon icon={faBagShopping} />
                  </div>
                </Link>
              </div>

              <div>
                <Form.Group
                  className="mb-3"
                  style={{ margin: "0.2% 0 0 1%", padding: "1%" }}
                >
                  <h5>Categories</h5>
                  <Form.Select
                    id="disabledSelect"
                    value={categories}
                    onChange={(e) => {
                      setCategories(e.target.value);
                    }}
                    className="category"
                  >
                    <option>All</option>
                    <option>Entertainment</option>
                    <option>Clothes</option>
                    <option>Mobile</option>
                    <option>Kitchen</option>
                    <option>Furniture</option>
                    <option>Tools</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search Products"
                className="me-2 searchnav"
                aria-label="Search"
                value={term}
                onChange={(event) => {
                  setTerm(event.target.value);
                }}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <React.Fragment>
        <div className="productsmain">
          {props.data
            // eslint-disable-next-line
            .filter((val) => {
              if (term === "") return val;
              else if (val.title.toLowerCase().includes(term.toLowerCase()))
                return val;
            })
            // eslint-disable-next-line
            .filter((val) => {
              if (categories === "All") return val;
              else if (
                val.category.toLowerCase().includes(categories.toLowerCase())
              )
                return val;
            })
            .map((ele) => {
              const { title, image, price, description, _id, stock, quantity } =
                ele;
              return (
                <div key={_id} className="products">
                  <h4 style={{fontWeight:"bold"}}>{title}</h4>
                  <img src={image} alt={title} />
                  <h4 style={{fontWeight:"bold"}}>Description:</h4> {description}{" "}
                  <h5 style={{fontWeight:"bold"}}>
                    <span>Price:</span>
                    <span></span>
                    {price} &#x20B9;
                  </h5>
                  <Button
                    className="buttonnav"
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      addtoCart(ele, _id, stock, quantity);
                    }}
                  >
                    Add To Cart
                  </Button>
                </div>
              );
            })}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}

export default NavScrollExample;
