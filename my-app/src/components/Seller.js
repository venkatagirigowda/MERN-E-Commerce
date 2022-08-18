import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import React, { useState,useEffect } from "react";
import {useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import ProductDetails from "./ProductDetails";

function Register(props) {
  const navigate=useNavigate()
  const admin=useSelector((state)=>state.cart.admin)
  const isLogin=JSON.parse(localStorage.getItem('isLogin'))
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category:"",
    stock: "",
    quantity:1
  });
  const [error, setError] = useState({});
  const changed = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProduct({ ...product, [name]: value });
  };
  const generateerror = (title, description, price, image, category,stock) => {
    const newerrors = {};
    if (title === "") newerrors.title = "Field Cannot Be Empty";
    if (description === "")newerrors.description = "Field Cannot Be Empty";
    if (price === "") newerrors.price = "Field Cannot Be Empty";
    if (image === "") newerrors.image = "Field Cannot Be Empty";
    if (category === "") newerrors.category = "Field Cannot Be Empty";
    if (stock === "") newerrors.stock = "Field Cannot Be Empty";

    return newerrors;
  };
  const clicked = async (e) => {
    const { title, description, price, image,category, stock } = product;
    e.preventDefault();
    const err = generateerror(title, description, price, image,category, stock);
    if (Object.keys(err).length > 0) {
      console.log(err)
      setError(err);
    } else {
      try {
        console.log("hello world")
        await axios.post("http://localhost:5000/products", product);
        console.log("hello world")
        alert("successfull");
      } catch (error) {
        alert(error.response.data.error);
      }
    }
    setProduct({title: "",
    description: "",
    price: "",
    image: "",
    category:"",
    stock: "",
    quantity:1})
  };
  useEffect(()=>{
    if(!isLogin){
      return navigate('/Login')
    }
     // eslint-disable-next-line
  },[])
  
   if(!admin){
      return <React.Fragment>
      <Button variant="primary" className="homebtn">
     <Link className="item" to="/">Home</Link>
      </Button>
      <h1 style={{color:'#949398ff',fontWeight:'bolder'}}>Unauthorized</h1>
      
      <FontAwesomeIcon className='unauth' icon={faBan} />
      </React.Fragment>
      }
    else{
  return (
    <React.Fragment>
     <Button variant="primary"   className="homebtn">
     <Link className="item" to="/">Home</Link>
      </Button>
     <ProductDetails data={props.data}/>
      <h1 style={{color:'#949398ff'}}>Enter Your Product Details</h1>
      <div className="Login">
        <div className="sellers">
          <div className="loginsub">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{fontWeight:'bold',fontSize:'1.2rem'}}>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  onChange={changed}
                  value={product.title}
                  isInvalid={!!error.title}
                />
                <Form.Control.Feedback type="invalid">
                  {error.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="mb-3 description"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label style={{fontWeight:'bold',fontSize:'1.2rem'}}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter your product details"
                  name="description"
                  onChange={changed}
                  value={product.description}
                  isInvalid={!!error.description}
                />
                <Form.Control.Feedback type="invalid">
                  {error.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{fontWeight:'bold',fontSize:'1.2rem'}}>Price:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Price"
                  onChange={changed}
                  name="price"
                  value={product.price}
                  isInvalid={!!error.price}
                />
                <Form.Control.Feedback type="invalid">
                  {error.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{fontWeight:'bold',fontSize:'1.2rem'}}>Image URL:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image url"
                  onChange={changed}
                  name="image"
                  value={product.image}
                  isInvalid={!!error.image}
                />
                <Form.Control.Feedback type="invalid">
                  {error.image}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{fontWeight:'bold',fontSize:'1.2rem'}}>Category:</Form.Label>
                <Form.Select id="disabledSelect"  onChange={changed}
                  name="category"
                  value={product.category}
                  isInvalid={!!error.category}>
            <option></option>
            <option>Entertainment</option>
            <option>Clothes</option>
            <option>Mobile</option>
            <option>Kitchen</option>
            <option>Furniture</option>
            <option>Tools</option>
          </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error.category}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label style={{fontWeight:'bold',fontSize:'1.2rem'}}>Stock:</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Stock no"
                  onChange={changed}
                  name="stock"
                  value={product.stock}
                  isInvalid={!!error.stock}
                />
                <Form.Control.Feedback type="invalid">
                  {error.stock}
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" onClick={clicked}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}}

export default Register;
