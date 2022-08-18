import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import axios from "axios";
const ProductDetails = (props) => {
  const remove = async (id) => {
    try {
      axios.delete(`http://localhost:5000/products/${id}`);
      alert("Succesfully Deleted The Product");
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <React.Fragment>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {props.data.map((ele) => {
          const { title, image, _id } = ele;
          return (
            <div key={_id} className="products" style={{ width: "200px" }}>
              <h6>{title}</h6> 
              <img style={{ width: "40%" }} src={image} alt={title}></img>
              <Button onClick={() => remove(_id)} className="detailbtn">
                <FontAwesomeIcon style={{ fontSize: "20px" }} icon={faTrash} />
              </Button>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ProductDetails;
