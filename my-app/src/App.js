import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Seller from "./components/Seller";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/reduxstore";
import Checkout from "./components/Checkout";
import CheckoutLogin from "./components/CheckoutLogin";
import MyOrder from "./components/MyOrder";
const App = () => {
  const [product, setProduct] = useState([]);
  const AdminKey=process.env.REACT_APP_ADMIN_USER
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProduct(data);
    };
    fetchdata();
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar data={product} />} />
          <Route path="/Login" element={<Login key={AdminKey}/>} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Seller" element={<Seller data={product} />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/CheckoutLogin" element={<CheckoutLogin />} />
          <Route path="/Orderdetails" element={<MyOrder />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
