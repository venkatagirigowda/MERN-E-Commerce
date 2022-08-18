import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, addaddr } from "../slices/cartslice";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const total = useSelector((state) => state.cart.total);
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  localStorage.getItem("cart");
  const products = useSelector((state) => state.cart.value);
  const [checkout, setCheckout] = useState({
    Name: "",
    Phonenumber: "",
    Addressline1: "",
    Addressline2: "",
    City: "",
    State: "",
    Pincode: "",
    cardnumber: "",
    date: Date(Date.now().toString()),
    mm: "",
    yy: "",
    cvv: "",
  });

  const [error, setError] = useState({});
  const generateerror = (
    Name,
    Phonenumber,
    Addressline1,
    City,
    State,
    Pincode,
    cardnumber,
    mm,
    yy,
    cvv
  ) => {
    const newerrors = {};
    if (Name === "") newerrors.Name = "Field Cannot Be Empty";
    if (Phonenumber === "") newerrors.Phonenumber = "Field Cannot Be Empty";
    if (Addressline1 === "") newerrors.Addressline1 = "Field Cannot Be Empty";
    if (City === "") newerrors.City = "Field Cannot Be Empty";
    if (State === "") newerrors.State = "Field Cannot Be Empty";
    if (Pincode === "") newerrors.Pincode = "Field Cannot Be Empty";
    if (cardnumber === "") newerrors.cardnumber = "Field Cannot Be Empty";
    if (mm === "") newerrors.mm = "Field Cannot Be Empty";
    if (mm > 12 || cvv < 1) newerrors.mm = "Invalid card details";
    if (yy === "") newerrors.yy = "Field Cannot Be Empty";
    if (cvv === "") newerrors.cvv = "Field Cannot Be Empty";
    if (yy > 2100 || yy < 2013) newerrors.yy = "Invalid card details";
    if (cvv > 999 || cvv < 100) newerrors.cvv = "Invalid card details";

    return newerrors;
  };
  const changed = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCheckout({ ...checkout, [name]: value });
  };
  const changede = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCheckout({ ...checkout, [name]: value });
  };
  const handleShow = async (e) => {
    localStorage.setItem("isOrdered", "true");
    const {
      Name,
      Phonenumber,
      Addressline1,
      City,
      State,
      Pincode,
      cardnumber,
      mm,
      yy,
      cvv,
    } = checkout;
    e.preventDefault();
    const err = generateerror(
      Name,
      Phonenumber,
      Addressline1,
      City,
      State,
      Pincode,
      cardnumber,
      mm,
      yy,
      cvv
    );
    if (Object.keys(err).length > 0) {
      setError(err);
    } else {
      const {
        Name,
        Phonenumber,
        Addressline1,
        Addressline2,
        City,
        State,
        Pincode,
        date,
      } = checkout;
      dispatch(
        addaddr({
          Name,
          Phonenumber,
          Addressline1,
          Addressline2,
          City,
          State,
          Pincode,
          date,
        })
      );
      setShow(true);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (!isLogin) {
      return navigate("/CheckoutLogin");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <Button variant="primary" className="homebtn">
        <Link className="item" to="/">
          {" "}
          Home
        </Link>
      </Button>
      <div className="checkout">
        <div className="checkoutmain">
          <div className="checkoutaddress">
            <h1>Delivery Address</h1>
            <Form.Group className="mb-3" controlId="formBasicPassword11">
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                name="Name"
                onChange={changed}
                value={checkout.Name}
                isInvalid={!!error.Name}
              />
              <Form.Control.Feedback type="invalid">
                {error.Name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword11">
              <Form.Control
                type="number"
                placeholder="Enter Your Number"
                name="Phonenumber"
                onChange={changed}
                value={checkout.Phonenumber}
                isInvalid={!!error.Phonenumber}
              />
              <Form.Control.Feedback type="invalid">
                {error.Phonenumber}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Control
                type="text"
                placeholder="Addressline 1"
                name="Addressline1"
                onChange={changed}
                value={checkout.Addressline1}
                isInvalid={!!error.Addressline1}
              />
              <Form.Control.Feedback type="invalid">
                {error.Addressline1}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3 description"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="text"
                placeholder="Address Line 2"
                name="Addressline2"
                onChange={changed}
                value={checkout.Addressline2}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Control
                className="formaddress"
                type="text"
                placeholder="City"
                onChange={changed}
                name="City"
                value={checkout.City}
                isInvalid={!!error.City}
              />
              <Form.Control.Feedback type="invalid">
                {error.City}
              </Form.Control.Feedback>

              <Form.Control
                className="formaddress"
                type="number"
                placeholder="Pincode"
                onChange={changed}
                name="Pincode"
                value={checkout.Pincode}
                isInvalid={!!error.Pincode}
              />
              <Form.Control.Feedback type="invalid">
                {error.Pincode}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword3">
              <Form.Control
                className="formaddress"
                type="text"
                placeholder="State"
                onChange={changed}
                name="State"
                value={checkout.State}
                isInvalid={!!error.State}
              />
              <Form.Control.Feedback type="invalid">
                {error.State}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="checkoutaddress">
            <h1>Payment Details</h1>

            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicPassword4"
                id="number"
              >
                <Form.Label
                  style={{ display: "inline-block", fontWeight: "bold" }}
                >
                  Card Details:
                </Form.Label>
                <Form.Control
                  style={{
                    width: "70%",
                    display: "inline-block",
                    margin: "0 1%",
                  }}
                  type="number"
                  placeholder="Card Number"
                  name="cardnumber"
                  onChange={changede}
                  value={checkout.cardnumber}
                  isInvalid={!!error.cardnumber}
                />
                <Form.Control.Feedback type="invalid">
                  {error.cardnumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicPassword5">
                <Form.Label
                  className="checkoutlabel"
                  style={{ fontWeight: "bold" }}
                >
                  Expiry Date:
                </Form.Label>

                <Form.Control
                  className="checkoutcard "
                  type="number"
                  placeholder="MM"
                  name="mm"
                  onChange={changed}
                  value={checkout.mm}
                  isInvalid={!!error.mm}
                />
                <Form.Control.Feedback type="invalid">
                  {error.mm}
                </Form.Control.Feedback>
              </Form.Group>

              <h4 style={{ display: "inline-block" }}>/</h4>
              <Form.Group className="mb-3 " controlId="formBasicPassword8">
                <Form.Control
                  className="checkoutcard"
                  type="number"
                  placeholder="YYYY"
                  name="yy"
                  onChange={changed}
                  value={checkout.yy}
                  isInvalid={!!error.yy}
                />
                <Form.Control.Feedback type="invalid">
                  {error.yy}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 " controlId="formBasicPassword6">
                <Form.Label
                  className="checkoutlabel"
                  style={{ fontWeight: "bold" }}
                >
                  CVV:
                </Form.Label>
                <Form.Control
                  className="checkoutcard"
                  type="password"
                  placeholder="CVV"
                  name="cvv"
                  autoComplete="on"
                  onChange={changed}
                  value={checkout.cvv}
                  isInvalid={!!error.cvv}
                />
                <Form.Control.Feedback type="invalid">
                  {error.cvv}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                className="checkoutbtn"
                variant="primary"
                onClick={handleShow}
              >
                Pay {total + 40 + total * 0.18}&#x20B9;
              </Button>
            </Form>
          </div>
        </div>

        <div className="checkoutproduct">
          <h2>Your Product Details</h2>
          {products.map((ele) => {
            const { title, image, _id, quantity } = ele;
            return (
              <div key={_id} className="checkoutdetail">
                <img className="cartimg" src={image} alt={title} />
                <div className="cartspace">
                  <h4>{title}</h4>
                </div>
                <div className="cartspace">
                  <h4 className="cartnum">Qty:{quantity}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Thank You For Shopping </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order">
            <div>
              <FontAwesomeIcon className="checkicon" icon={faCircleCheck} />
            </div>
            <div>
              <h1 style={{ color: "green" }}>Order Placed</h1>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => dispatch(clearCart())}>
            <Link className="item" to="/">
              Ok
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Checkout;
