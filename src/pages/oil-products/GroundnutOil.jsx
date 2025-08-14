import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import OilCategory from "./OilCategory";
import Navbar_Menu from "../../components/Navbar_Menu";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

const GroundnutOil = () => {
  const images = [{ src: "/media/oil-groundnut.jpeg",weight:"1L(Wood-Pressed)", price:"450"},
    { src:"/media/Cols-pressed.png", weight:"1L(Cold-Pressed)", price:"480"},
    { src: "/media/groundnut-five.png", weight:"5L", price:"2400"},
  { src:"/media/nutrition-groundnut.jpeg"},
{src :"/media/uses-groundnut.jpeg"},
{src :"/media/benefit-groundnut.jpeg"},
{src:"/media/color-vary-groundnut.jpeg"}];


   const [price, setPrice] = useState(450);  
  const [mainImage, setMainImage] = useState(images[0].src);
 

  const [selectedWeight, setSelectedWeight] = useState(null);

  const weights = [ "1L(Wood-Pressed)","1L(Cold-Pressed)", "5L"];

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

   // ADD TO CART
  
    const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    // if (!selectedWeight) return alert("Please select a weight");
  
    dispatch(
      addToCart({
        id: "groundnut-oil",
        name: "Groundnut Oil",
        discountedPrice: price, 
      originalPrice: 450,
        quantity,
        weight: selectedWeight,
        image: mainImage,
      })
    );
  
    navigate("/carts");

     const isLoggedIn = localStorage.getItem("user");
  };

  return (
    <>
    <Navbar_Menu/>
    <Container>
      <Row className="g-0">
       <Col md={6}>
  <div
    style={{
      position: "sticky",
      top: "0px", 
      zIndex: 1,
      display: "flex",
      
      padding: "20px",
      height:"100vh",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"start", gap:"20px"
    }} className="backimg"
  >
    {/* Main Image */}
        <div style={{ flex: "0 0 auto" }}>
          <Image
            src={mainImage}
            fluid
            style={{
              maxHeight: "500px",
              objectFit: "cover",
            }}
          />
        </div>
    
        {/* Thumbnails Below */}
        <Row className="justify-content-center">
  {images.map((imgObj, index) => (
    <Col key={index} xs={6} md={4} className="d-flex justify-content-center mb-3">
      <Image
        src={imgObj.src}
        thumbnail
        onClick={() => {
          setMainImage(imgObj.src);
          setSelectedWeight(imgObj.weight);
          setPrice(imgObj.price);
        }}
        style={{
      width: "120px",
      height: "120px",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid #00614a",
      
      borderRadius: "10px",
    }}
      />
    </Col>
  ))}
</Row>

      </div>
</Col>

        <Col md={6} style={{ padding: "40px" }}>
          <h2 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
           Groundnut Oil
          </h2>
         <h4 style={{ color: "#00614A", fontFamily: "Montserrat" }}>
              ₹{price} <span>({selectedWeight})</span>
              <span className="ms-2 text-danger text-decoration-line-through">₹650</span>
              <span className="ms-2 text-success">20% OFF</span>
            </h4>


          <div className="mb-4">
            <span
              style={{
                backgroundColor: "#d4f7dc",
                color: "green",
                padding: "4px 10px",
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              In stock
            </span>
          </div>

          <div className="mb-2">
            <h4 style={{ fontSize: "15px", fontFamily: "montserrat" }}>
              SKU: 9876543210
            </h4>
          </div>

         

          
          <div className="mt-4">
                        <h5 className="fw-bold" style={{fontFamily:"poppins"}}>Select Quantity</h5>
                        <div className="d-flex gap-2">
                          {weights.map((weight, i) => (
                            <Button
                              key={i}
                              variant={selectedWeight === weight ? "success" : "outline-success"}
                              className="rounded-pill px-3"
                              onClick={() => setSelectedWeight(weight)}
                              style={{fontFamily:"poppins"}}
                            >
                              {weight}
                            </Button>
                          ))}
                        </div>
                      </div>

          {/* Quantity Controls */}
          <div className="mt-4 d-flex align-items-center gap-3">
                        <h6 className="fw-bold mb-0" style={{fontFamily:"poppins"}}>Count:</h6>
                        <div className="d-flex align-items-center border rounded-pill px-3">
                          <Button variant="link" onClick={handleDecrement} className="text-dark fw-bold">-</Button>
                          <span className="px-3">{quantity}</span>
                          <Button variant="link" onClick={handleIncrement} className="text-dark fw-bold">+</Button>
                        </div>
                      </div>
          
           <div className="alert alert-warning mt-4" style={{fontFamily:"poppins"}}>
               Shop ₹2000 more and enjoy <b>*FREE Shipping*</b> on your order.
            </div>
          
          
          
          <div
  className="d-flex"
  style={{
    position: "sticky",
    bottom: "0",
    backgroundColor: "#fff", 
    padding: "10px 20px",
    zIndex: 10,
    width:"100%"
  }}
>
          
            <Button onClick={handleAddToCart} variant="warning" style={{ flex: 1, padding:"15px 20px" }}>
              Add to Cart
            </Button>
             <Button
              onClick={() => {
                if (localStorage.getItem("user")) {
                  handleAddToCart();  // Add to cart before redirecting
                  navigate("/carts");
                } else {
                  navigate("/login");
                }
              }}
              variant="warning"
              style={{ flex: 1 }}
            >
              Buy Now
            </Button>
          </div>
          <Table bordered responsive className="mt-4" >
                        <tbody>
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Price + Offer</strong></td>
                            <td style={{fontFamily:"poppins",padding:"15px"}}>₹480.00 <del className="text-muted">₹650.00</del> <span className="text-success">20% Off</span></td>
                          </tr>
                          <tr>
                            <td style={{fontFamily:"poppins",padding:"15px"}}><strong>Highlight</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><Badge bg="dark" className="me-2">ONLINE EXCLUSIVE</Badge> <code style={{color:"#000", fontSize:"16px"}}>COLD-PRESSED</code></td>
                          </tr>
                         
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Popularity Info</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}>
                              <span className="d-block bg-light p-1 rounded">423 people viewed this item in last 7 days</span>
                              <span className="d-block bg-light p-1 rounded mt-1">12 customers purchased in last 72 hrs</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Size/Quantity Selector</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}>(1L Cold-Pressed)(1L Wood-Pressed)(5L)</td>
                          </tr>
                          
                          
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Customer Benefits</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}>
                              <ul className="list-unstyled mb-0">
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2 " />100% Pure</li>
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2" />Wood Cold Pressed</li>
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2" />Lab Tested</li>
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2" />No Chemicals or Preservatives</li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

        </Col>
      </Row>
    </Container>
     <div className="mb-3" style={{marginTop:"100px"}}>
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold", marginLeft:"200px"}}>You may also like this</h5>
          </div>
    <OilCategory/>
    </>
  );
};

export default GroundnutOil;