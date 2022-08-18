import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { remove, inc, dec, clearCart, calcTotal } from "../slices/cartslice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.value);
  const total = useSelector((state) => state.cart.total);

  useEffect(() => {
    dispatch(calcTotal());
    // eslint-disable-next-line
  }, [products]);
  const removeitems = (id) => {
    dispatch(remove(id));
  };
  const incClicked = ({_id,stock,quantity}) => {
    dispatch(inc({_id,stock,quantity}));
  };
  const decClicked = (id) => {
    dispatch(dec(id));
  };
  const clearAll = () => {
    dispatch(clearCart());
  };

  if (products.length < 1) {
    localStorage.removeItem("cart");
    return (
      <div className="cartempty">
        <h1>Your Cart is Empty</h1>
        <Button variant="primary" className="homebtn">
          <Link className="item" to="/">
            Buy Now
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <React.Fragment>
      <Button variant="primary" className="homebtn">
        <Link className="item" to="/">
          Home
        </Link>
      </Button>
      <h1 style={{ color: "#949398ff" }}>
        My Cart <FontAwesomeIcon icon={faCartPlus} />
      </h1>
      <React.Fragment>
        <div className="cartmain">
          {products.map((ele) => {
            const { title, image, price, _id, quantity,stock } = ele;
            return (
              <div key={_id} className="cart">
                <img className="cartimg" src={image} alt={title} />
                <div className="cartspace">
                  <h4>{title}</h4>
                  <h5>{price} &#x20B9;</h5>
                </div>
                <div className="cartspace">
                  <Button
                    className="cartbtn"
                    onClick={() => {
                      incClicked({_id,stock,quantity});
                    }}
                  >
                    <h6 className="incbtn">+</h6>
                  </Button>
                  <h4 className="cartnum">{quantity}</h4>
                  <Button
                    className="cartbtn"
                    onClick={() => {
                      if (quantity === 1) {
                        removeitems(_id);
                        return;
                      }
                      decClicked(_id);
                    }}
                  >
                    <h6 className="incbtn">-</h6>
                  </Button>
                </div>

                <Button
                  className="cartspace removebtn"
                  variant="primary"
                  type="submit"
                  onClick={() => removeitems(_id)}
                >
                  Remove
                </Button>
              </div>
            );
          })}
          <Button className="clearcart" onClick={clearAll}>
            Clear Cart
          </Button>
        </div>
      </React.Fragment>

      <hr />
      <div>
        <table>
          <thead>
            <tr>
              <td>
                <h3>Amount:</h3>
              </td>
              <td>
                <h3>{total} &#x20B9;</h3>
              </td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>
                <h3>Delivery Charges:</h3>
              </td>
              <td>
                <h3>40&#x20B9;</h3>
              </td>
            </tr>
          </thead>
          <thead>
            <tr>
              <td>
                <h3>Gst:</h3>
              </td>
              <td>
                <h3>{total * 0.18}&#x20B9;</h3>
              </td>
            </tr>
          </thead>
        </table>
        <hr></hr>
        <table>
          <thead>
            <tr>
              <td>
                <h3>Total Amount:</h3>
              </td>

              <td>
                <h3>{total + 40 + total * 0.18}&#x20B9;</h3>
              </td>
            </tr>
          </thead>
        </table>

        <Button className="clearcart">
          <Link className="item" to="/Checkout">
            Checkout
          </Link>
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Cart;
