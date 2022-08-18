import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const MyOrder = () => {
  const details = useSelector((state) => state.cart.valuecart);
  const isOrdered = JSON.parse(localStorage.getItem("isOrdered"));
  const products = useSelector((state) => state.cart.order);
  if (isOrdered)
    return (
      <>
       <Button variant="primary" className="orderbtn">
          <Link className="item" to="/">
           Home
          </Link>
        </Button>
        <div>
          {details.map((ele, i) => {
            const {
              Name,
              Phonenumber,
              Addressline1,
              Addressline2,
              City,
              State,
              Pincode,
              date,
            } = ele;

            return (
              <div
                style={{
                  backgroundColor: "#949398ff",
                  border: "1px solid black",
                  width: "70%",
                  margin: "1%",
                }}
                key={i}
              >
                <h6>Orderd On:{date}</h6>
                <h3>Delivery Address:</h3>
                <h5>Name:{Name}</h5>
                <h5>Phone number:{Phonenumber}</h5>
                <h5>Delivery Adress:{Addressline1}</h5>
                {Addressline2 ? <h5>{Addressline2}</h5> : null}
                <h5>
                  {City},{State},{Pincode}
                </h5>
                <h5>Order Status:</h5>
                <h6 style={{color:"green"}}>Delivered</h6>
              </div>
            );
          })}
        </div>
        <div className="checkoutproduct">
          <h2>Ordered Products</h2>
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
      </>
    );
  else {
    return (
      <React.Fragment>
        <Button variant="primary" className="orderbtn">
          <Link className="item" to="/">
            Buy Now
          </Link>
        </Button>
        <h1 style={{ textAlign: "center", margin: "2%" }}>No Orders Made</h1>
      </React.Fragment>
    );
  }
};

export default MyOrder;
