import { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";

import Navbar_Menu from "../../components/Navbar_Menu";





const ProsoMillet = () => {
 




  const [selectedWeight, setSelectedWeight] = useState(null);

  const weights = ["1 Kg"];

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <><Navbar_Menu/>
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
      height:"100vh"
    }}className="backimg"
  >
    {/* Main Image */}
    <div className="d-flex justify-content-center align-items-center" style={{ flex: 2 }}>
      <Image
        src="/media/proso-millet.png"
        fluid
        style={{ height: "700px", objectFit: "contain", width:"100%" }}
      />
    </div>

   
   
  </div>
</Col>

        <Col md={6} style={{ padding: "40px" }}>
          <h2 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
         Proso Millet
          </h2>
          <h4 style={{ color: "#002209", fontFamily: "montserrat" }}>
            Rs 45 (100 gram)
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

          <ul
            style={{
              paddingLeft: "20px",
              lineHeight: "1.7",
              fontFamily: "montserrat",
            }}
          >
            <li>Rich in Vitamin E, fatty acids, and antioxidants.</li>
            <li>Contains zinc, magnesium, and omega-3 fatty acids.</li>
            <li>
              Supports cardiovascular function when consumed in moderation.
            </li>
          </ul>

        
          <div>
            <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
              Quantity
            </h5>
          </div>
          {/* Weight Buttons */}
          <div
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
          <div style={{ display: "flex", gap: "15px" , alignItems:"center"}} className="mb-3">
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
           <div className="mb-3">
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold"}}>Description</h5>
          </div>
          <div className="mb-3">
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold"}}>Reviews</h5>
          </div>
          <div>
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold"}}>You may also like this</h5>
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
          
            <Button variant="warning" style={{ flex: 1, padding:"15px 20px" }}>
              Add to Cart
            </Button>
            <Button variant="warning" style={{ flex: 1 }}>
              Buy Now
            </Button>
          </div>
        
        </Col>
      </Row>
    </Container>
    <div className="mb-3" style={{marginTop:"100px"}}>
            <h5 style={{fontFamily:"montserrat", fontWeight:"bold", marginLeft:"200px"}}>You may also like this</h5>
          </div>
          
          </>
  );
};

export default ProsoMillet;