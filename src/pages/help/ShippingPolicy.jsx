import { useEffect, useState } from "react";
import { Container, InputGroup, Form } from "react-bootstrap";
import Navbar_Menu from "../../components/Navbar_Menu";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function ShippingPolicy() {
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
        {/* <Navbar_Menu /> */}

          {/* SEARCH */}
          <Container className="mt-3">
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
          </Container>

        {/* SHIPPING POLICY */}
        <div style={{ backgroundColor: "white", padding: "5% 0" }}>
          <Container>
            <div
              style={{
                margin: "0% 10% 0% 10%",
                
              }}
            >
              <h1
                style={{
                  lineHeight: "1.5",
                  letterSpacing: "1px",
                  fontSize: "50px",
                  maxWidth: "100%",
                  fontWeight: "800",
                  textAlign: "center",
                  marginBottom: "5%",
                  color: "#002209",
                }}
              >
                SHIPPING POLICY
              </h1>
              <div className="div-p-ul">
                <p style={{ textAlign: "right", marginBottom: "5%" }}>
                  Last Updated:{" "}
                  <span style={{ fontFamily: "kapraneue, sans-serif" }}>
                    October 12, 2024
                  </span>
                </p>
                <p>Thank you for choosing Avitri Spices PVT LTD!</p>
                <p>
                  Below are the details of our shipping process to ensure a
                  seamless experience. Processing Time Orders are processed
                  within 5-7 business days after purchase. During peak times
                  (e.g., holidays, sales), processing times may be slightly
                  extended.
                </p>
                <p>Shipping Methods & Delivery Times We offer the following</p>
                <ul>
                  <p>Shipping Options:</p>
                  <li>
                    Standard Shipping:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      Delivery in 4-7 days.
                    </span>
                  </li>
                  <li>
                    Expedited Shipping:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      Delivery in 4-7 days.
                    </span>
                  </li>
                  <li>
                    International Shipping (if applicable):{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      Delivery in 10-14 days.
                    </span>
                  </li>
                  <li>
                    Note:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      {" "}
                      Delivery times may vary depending on your location,
                      carrier delays, or external factors.
                    </span>
                  </li>
                  <li>
                    Shipping Rates Free Shipping:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      For orders over ₹5,000.
                    </span>
                  </li>
                  <li>
                    Flat-Rate Shipping:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      ₹40-60.
                    </span>
                  </li>
                  <li>
                    Real-Time Rates:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      Displayed at checkout based on your location.
                    </span>
                  </li>
                </ul>
                <p>
                  Order Tracking Once shipped, you will receive a tracking
                  number via email. Track your order on our website or directly
                  with the carrier. International Shipping Customs, duties, and
                  taxes may apply and are the responsibility of the customer.
                </p>
                <p>
                  Check your local customs policies before placing an order.
                  Lost or Delayed Packages For delayed or lost packages, contact
                  us at{" "}
                  <span
                    style={{
                      fontWeight:'700',
                      letterSpacing: "1px",
                      fontSize: "16px",
                    }}
                  >
                    info@avitrispicies.com
                  </span>
                  . We will coordinate with the carrier to resolve the issue.
                  Address Errors Please double-check your shipping address at
                  checkout. Orders sent to an incorrect address may incur
                  additional shipping fees.
                </p>
                <ul>
                  <p>Contact Us For any questions, feel free to reach out: </p>
                  <li>
                    Email:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      info@avitrispicies.com
                    </span>
                  </li>
                  <li>
                    Phone:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginLeft: "5px",
                        fontWeight:'700',
                        
                      }}
                    >
                      +91 734 944 4419
                    </span>
                  </li>
                </ul>
                <p> Thank you for shopping with Avitri Spices!</p>
              </div>
            </div>
          </Container>
        </div>

        <ScrollToTop />

        {/* FOOTER */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
