{/*import  { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import OilCategory from "./oilcategory";
import Navbar_Menu from "../../components/Navbar_Menu";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";



const AlmondOil = () => {
  const images = [{src:"/media/Almond-oil.png", weight:"100ml",price:"320",
    src:"/media/color-almond.png", src:"/media/uses-almond.png"
  },
    ];

  const [price, setPrice] = useState(320);

  const [mainImage, setMainImage] = useState(images[0].src);
  

  const [selectedWeight, setSelectedWeight] = useState(null);

  const weights = ["100ml"];

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
      id: "almond-oil",
      name: "Almond Oil",
      discountedPrice: price, 
      originalPrice: 320,   
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
      <Col md={6} >
  <div
    style={{
      position: "sticky",
      top: "0px",
      zIndex: 1,
      
      padding: "20px",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      gap: "20px"

    }}className="backimg"
  >
    {/* Main Image */}
    {/*<div style={{ flex: "0 0 auto" }}>
      <Image
        src={mainImage}
        fluid
        style={{
          maxHeight: "500px",
          objectFit: "cover",
          
        }}className="Backimg"
      />
    </div>

    {/* Thumbnails Below */}
    {/*<div className="d-flex flex-wrap justify-content-center gap-5">
      {images.map((imgObj, index) => (
        <Image
          key={index}
          src={imgObj.src}
          thumbnail
          onClick={() => {
            setMainImage(imgObj.src);
            setSelectedWeight(imgObj.weight);
            setPrice(imgObj.price);
          }}
          style={{
            width: "180px",
            height: "180px",
            objectFit: "contain",
            cursor: "pointer",
            border: "none",
            backgroundColor: "#002209",
            borderRadius: "100%",
          }}
        />
      ))}
      
    </div>
  </div>
</Col>


        <Col md={6} style={{ padding: "40px" }}>
          <h2 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
            Almond Oil
          </h2>
          <h4 style={{ color: "#002209", fontFamily: "montserrat" }}>
            Rs {price} ({selectedWeight || "Select weight"})
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

          
          
          <div>
            <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
              Quantity
            </h5>
          </div>
          {/* Weight Buttons */}
         {/*} <div
            style={{
              display: "flex",
              justifyContent: "left",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {weights.map((weight, i) => (
              <Button
                className="search-button-slider mb-3"
                key={i}
                variant="outline"
                onClick={() => setSelectedWeight(weight)}
                style={{
                  border: "2px solid #00614A",
                  color: selectedWeight === weight ? "#fff" : "#00614A",
                  backgroundColor:
                    selectedWeight === weight ? "#00614A" : "transparent",
                  padding: "6px 14px",
                  fontSize: "16px",
                  borderRadius: "0",
                  fontWeight: "500",
                  letterSpacing: "1px",
                  transition: "all 0.3s ease",
                  borderRadius: "25px",
                }}
              >
                {weight}
              </Button>
            ))}
          </div>

          {/* Quantity Controls */}
          {/*<div style={{ display: "flex", gap: "15px" , alignItems:"center"}} className="mb-3">
            <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
              Count:
            </h5>

            <div
              className="d-flex align-items-center justify-content-left mb-3"
              style={{ border: "1px solid #00614A", borderRadius: "25px" }}
            >
              <Button
                variant="none"
                onClick={handleDecrement}
                style={{
                  color: "black",
                  fontWeight: "bold",

                  margin: "0",
                  fontSize: "20px",
                }}
              >
                -
              </Button>

              <span
                className="px-3"
                style={{
                  padding: "6px 12px",
                  fontSize: "16px",
                }}
              >
                {quantity}
              </span>

              <Button
                variant="none"
                onClick={handleIncrement}
                style={{
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "0",
                  fontSize: "20px",
                }}
              >
                +
              </Button>
            </div>
          </div>
           <img src="/media/color-almond.png" alt="color-may-vary" style={{width:"70%", height:"500px", objectFit:"cover"}}/>
          <div className="mb-3 mt-5">
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold"}}>Uses</h5>
            <img src="/media/uses-almond.png" alt="uses" style={{width:"70%", height:"500px", objectFit:"cover"}}/>
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
          
            <Button  onClick={handleAddToCart}  variant="warning" style={{ flex: 1, padding:"15px 20px" }}>
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
        
        </Col>
      </Row>
    </Container>
     <div className="mb-3" style={{marginTop:"100px"}}>
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold", marginLeft:"120px"}}>You may also like this</h5>
          </div>
  <OilCategory/>
    </>
  );
};

export default AlmondOil;*/}

import { useState } from "react";
import { Container, Row, Col, Image, Button, Tab, Tabs } from "react-bootstrap";
import OilCategory from "./OilCategory";
import Navbar_Menu from "../../components/Navbar_Menu";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import NavbarCartIcon from "../../components/CartIcon";
import { Table, Badge } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";



const AlmondOil = () => {
  const images = [
    { src: "/media/Almond-oil.png", weight: "100ml", price: 320 },
    { src: "/media/uses-almond.png", type: "uses" },
    { src: "/media/color-almond.png", type: "nutrition" }
  ];

  const [price, setPrice] = useState(320);
  const [mainImage, setMainImage] = useState(images[0].src);
  const [selectedWeight, setSelectedWeight] = useState("100ml");
  const weights = ["100ml"];
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: "almond-oil",
        name: "Almond Oil",
        discountedPrice: price,
        originalPrice: 320,
        quantity,
        weight: selectedWeight,
        image: mainImage,
      })
    );
    navigate("/carts");
  };

  return (
    <>
      <Navbar_Menu />
      <ScrollToTop />
      <Container className="py-5">
        <Row>
          <Col md={6} className="position-sticky top-0" style={{ height: "100vh" }}>
            <div className="d-flex flex-column align-items-center gap-3">
              <Image src={mainImage} fluid style={{ maxHeight: "500px", objectFit: "cover" }} />
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {images.map((imgObj, index) => (
                  <Image
                    key={index}
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
                      borderRadius: "10px",
                      border: "2px solid #00614A",
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>

          <Col md={6} className="p-4">
            <h2 className="fw-bold" style={{ fontFamily: "Montserrat" }}>Almond Oil</h2>
            <h4 style={{ color: "#00614A", fontFamily: "Montserrat" }}>
              ₹{price} <span>({selectedWeight})</span>
              <span className="ms-2 text-danger text-decoration-line-through">₹399</span>
              <span className="ms-2 text-success">20% OFF</span>
            </h4>

            <div className="my-3">
              <span className="badge bg-success-subtle text-success fw-semibold">In Stock</span>
            </div>

            <h6 className="text-muted">SKU: 9876543210</h6>

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

            <div className="d-flex gap-3 mt-4 sticky-bottom bg-white py-3">
              <Button variant="warning" className="w-50" onClick={handleAddToCart} style={{padding:"15px"}}>Add to Cart</Button>
              <Button
              style={{borderRadius:"0", fontFamily:"montserrat"}}
                variant="dark"
                className="w-50 fw-bold"
                onClick={() => {
                  if (localStorage.getItem("user")) {
                    handleAddToCart();
                  } else {
                    navigate("/login");
                  }
                }}
              >Buy Now</Button>
            </div>

           {/*} <div className="mt-5">
              <Tabs defaultActiveKey="nutrition" className="mb-3">
                <Tab eventKey="nutrition" title="Nutritional Info">
                  <Image src="/media/color-almond.png" fluid />
                </Tab>
                <Tab eventKey="uses" title="Uses">
                  <Image src="/media/uses-almond.png" fluid />
                </Tab>
              </Tabs>
            </div>*/}

            <Table bordered responsive className="mt-4" >
      <tbody>
        <tr>
          <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Price + Offer</strong></td>
          <td style={{fontFamily:"poppins",padding:"15px"}}>₹320.00 <del className="text-muted">₹399.00</del> <span className="text-success">20% Off</span></td>
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
          <td style={{fontFamily:"poppins", padding:"15px"}}>(100ml)</td>
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

        <div className="mt-5">
          <h4 className="fw-bold" style={{ fontFamily: "Montserrat" }}>You may also like this</h4>
          <OilCategory />
        </div>
      </Container>
      <NavbarCartIcon/>
    </>
  );
};

export default AlmondOil;
