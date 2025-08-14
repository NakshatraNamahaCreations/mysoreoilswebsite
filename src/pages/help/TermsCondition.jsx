import { useEffect, useState } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";
import { Container, Form, FormControl, InputGroup } from "react-bootstrap";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function TermsCondition() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* NAVBAR MENU */}
         <Navbar_Menu /> 

          {/* SEARCH */}
         {/*} <Container className="mt-3">
            <InputGroup
              className="mb-5 footer-subscribe-input"
              style={{
                maxWidth: "750px",
                margin: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Form.Control
                placeholder="Search our products..."
                style={{
                  borderRadius: "5px",
                  fontSize: "16px",
                  color: "#002209",
                  fontWeight: "500",
                }}
                className="me-2 search-input input-account-forms"
              />

              <div
                className="search-button-slider"
                style={{
                  padding: "5px 24px",
                  textAlign: "center",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                SEARCH
              </div>
            </InputGroup>
          </Container>*/}

        {/* TERMS & CONDITION */}
        <div style={{ backgroundColor: "white", padding: "5% 0" }}>
          <Container>
            <div
              style={{
                padding: "30px",
                margin: "0% 10% 0% 10%",
              }}
            >
              <h1
                style={{
                  fontWeight: "800",
                  textAlign: "center",
                  fontSize: "50px",
                  
                  marginBottom: "5%",
                  color: "#002209",
                  fontFamily:"montserrat"
                }}
                className="mobile-font"
              >
                TERMS OF SERVICES
              </h1>
              <div className="div-p-ul">
                <p className="para fw-bold" style={{fontSize:"18px"}}>
                  Welcome to The Mysore Oils (“we”, “our”, “us”). These Terms and Conditions (“Terms”) govern your use of our website https://themysoreoils.com (“Site”) and any purchases made through it.
                </p>
                <p className="para fw-bold mt-4">Products & Availability</p>
                <ul className="para">
                  <li>
                    
                     All products are described as accurately as possible.

                  </li>
                  <li>Availability and prices are subject to change without notice.</li>
                </ul>

                 <p className="para fw-bold mt-4">Pricing & Payment</p>
                 <ul className="para">
                  <li>
                    Prices are listed in Indian Rupees (INR) and include applicable taxes where stated.
                  </li>
                  <li>Payments are accepted via secure gateways including UPI, Cards, and Net Banking.</li>
                  </ul>

                <p className="para fw-bold mt-4">Shipping & Delivery</p>
                <ul className="para">
                  <li>
                   Orders are shipped as per our Shipping Policy.
                  </li>
                  <li>
                    Risk of loss passes to you upon delivery to the address provided.
                  </li>
                 
                </ul>

                <p className="para fw-bold mt-4">Returns & Refunds</p>
                <ul className="para">
                  <li>
                    Returns and refunds are handled according to our Return & Refund Policy.
                  </li>
                  
                  
                  
                </ul>

                <p className="para fw-bold mt-4">Intellectual Property</p>
                <ul className="para">
                  <li>
                    All content, trademarks, and images on this site belong to The Mysore Oils and may not be used without permission.
                  </li>
                  
                 
                </ul>

                <p className="para fw-bold mt-4">Limitation of Liability</p>
                <ul className="para">
                  <li>
                    We are not responsible for allergic reactions, misuse, or indirect damages caused by our products.
                  </li>
                  
                </ul>

              </div>
            </div>
          </Container>
        </div>

        <ScrollToTop />

        {/* FOOTER */}
         <Footer /> 
      </div>
    </>
  );
}
