import { useEffect, useState } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";
import Footer from "../../components/Footer";
import { Container, InputGroup, Form } from "react-bootstrap";
import ScrollToTop from "../../components/ScrollToTop";

export default function RefundPolicy() {
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
        {/*}  <Container className="mt-3">
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

        {/* REFUND POLICY */}
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
                  
                  fontSize: "50px",
                  maxWidth: "100%",
                  fontWeight: "800",
                  textAlign: "center",
                  marginBottom: "5%",
                  color: "#002209",
                  fontFamily:"montserrat"
                }}
              >
                REFUND POLICY
              </h1>
              <div className="div-p-ul">
                <p className="para fw-bold" style={{fontSize:"18px"}}>Due to the nature of our products (oils and natural items), we follow strict hygiene and quality protocols.</p>
               

                <p
                  style={{
                 fontSize: "16px",
                    marginRight: "5px",
                    fontWeight:'700',
                  
                  }} className="para"
                >
                  Returns
                </p>
                <p className="para">We accept returns only if:</p>
                <ul className="para">
                  <li>
                    You received a damaged or defective product.
                  </li>
                  <li>The product delivered is different from what was ordered.</li>
                </ul>

                <p
                  style={{
                 fontSize: "16px",
                    marginRight: "5px",
                    fontWeight:'700',
                  
                  }} className="para"
                >
                 Return Conditions
                </p>
                <ul className="para">
                  <li>
                   You must notify us within 48 hours of delivery with photo/video proof.
                  </li>
                  <li>Returned items must be unused, sealed, and in their original packaging.</li>
                </ul>

                <p
                  style={{
                 fontSize: "16px",
                    marginRight: "5px",
                    fontWeight:'700',
                  
                  }} className="para"
                >
                  Refunds
                </p>
                <ul className="para">
                  <li>
                   Once your return is approved, your refund will be credited within 7–10 business days to your original payment method.
                  </li>
                  <li>
                   Shipping charges are non-refundable.
                  </li>
                </ul>

                <p
                  style={{
                 fontSize: "16px",
                    marginRight: "5px",
                    fontWeight:'700',
                  
                    marginTop: "2%",
                  }} className="para"
                >
                  Cancellations
                </p>
                <p className="para">Orders can be cancelled only before dispatch. Once shipped, cancellations are not possible.</p>
                </div>
            </div>
          </Container>
        </div>

        <ScrollToTop />


        {/* <Footer /> */}
        <Footer/>
      </div>
    </>
  )
}
