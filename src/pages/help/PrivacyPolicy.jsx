import { useEffect, useState } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";
import { Container, InputGroup, Form } from "react-bootstrap";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function PrivacyPolicy() {
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
          {/*<Container className="mt-3">
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
                  borderRadius: "0px",
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

        {/* PRIVACY POLICY */}
        <div style={{ backgroundColor: "white", padding:'5% 0' }}>
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
                  fontFamily:"montserrat"
                }}
              >
                PRIVACY POLICY
              </h1>

              <div className="div-p-ul">
                <p style={{ textAlign: "right" , fontFamily:"poppins", fontWeight:"700"}}>
                  Effective Date:{" "}
                  <span
                    style={{
                      fontSize: "16px",
                      marginRight: "5px",
                      fontWeight:'700',
                      fontFamily:"poppins"
                    }}
                  >
                    14-08-2025
                  </span>
                </p>
                <p className="para fw-bold" style={{fontSize:"18px"}}>
                  The Mysore Oils respects your privacy and is committed to protecting it.
                </p>
                <p className="para fw-bold mt-4">
                 Information We Collect
                </p>
                <ul className="para">
                  <li>
                    Name, email, phone number, billing/shipping address.

                  </li>
                  <li>
                   Payment details (processed securely via third-party gateways).
                  </li>
                  <li>
                    Website usage data via cookies.
                  </li>
                
                </ul>

                <p className="para fw-bold mt-4">
                 How We Use Your Information
                </p>
                <ul className="para">
                  <li>To process and deliver your order.</li>
                  <li>To communicate order updates, promotions, and offers.</li>
                  <li>
                    To improve our website and services.
                  </li>
                 
                </ul>

                <p className="para fw-bold mt-4">
                 Data Security
                </p>
                <ul className="para">
                  <li>
                    We use industry-standard SSL encryption to protect your information.
                  </li>
                  <li>
                   Payment details are never stored on our servers.

                  </li>
                  </ul>
                      
                     
                    
                  
                <p className="para fw-bold mt-4">
                 Sharing of Information
                </p>
                 <ul className="para">
                  <li>
                   We do not sell or rent your personal data.
                  </li>
                  <li>
                We may share with trusted third-party service providers (e.g., courier companies, payment processors).

                  </li>
                  </ul>

                  <p className="para fw-bold mt-4">Cookies</p>
                   <ul className="para">
                  <li>
                Our site uses cookies to enhance user experience and track website performance.
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
