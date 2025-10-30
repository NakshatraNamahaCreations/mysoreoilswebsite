import { useEffect, useState } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";
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
        className="page-content terms-page"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      >
        <Navbar_Menu />

        {/* TERMS & CONDITION */}
        <div className="terms-wrap" style={{ backgroundColor: "white", padding: "5% 0" }}>
          <Container>
            <div className="terms-inner" style={{ padding: "30px", margin: "0% 10% 0% 10%" }}>
              <h1
                className="terms-title mobile-font"
                style={{
                  fontWeight: "800",
                  textAlign: "center",
                  fontSize: "50px",
                  marginBottom: "5%",
                  color: "#002209",
                  fontFamily: "montserrat",
                }}
              >
                TERMS OF SERVICES
              </h1>

              <div className="div-p-ul terms-body">
                <p className="para fw-bold terms-intro" style={{ fontSize: "18px" }}>
                  Welcome to The Mysore Oils (“we”, “our”, “us”). These Terms and Conditions (“Terms”) govern your use of our website https://themysoreoils.com (“Site”) and any purchases made through it.
                </p>

                <p className="para fw-bold mt-4 terms-head">Products & Availability</p>
                <ul className="para terms-list">
                  <li>All products are described as accurately as possible.</li>
                  <li>Availability and prices are subject to change without notice.</li>
                </ul>

                <p className="para fw-bold mt-4 terms-head">Pricing & Payment</p>
                <ul className="para terms-list">
                  <li>Prices are listed in Indian Rupees (INR) and include applicable taxes where stated.</li>
                  <li>Payments are accepted via secure gateways including UPI, Cards, and Net Banking.</li>
                </ul>

                <p className="para fw-bold mt-4 terms-head">Shipping & Delivery</p>
                <ul className="para terms-list">
                  <li>Orders are shipped as per our Shipping Policy.</li>
                  <li>Risk of loss passes to you upon delivery to the address provided.</li>
                </ul>

                <p className="para fw-bold mt-4 terms-head">Returns & Refunds</p>
                <ul className="para terms-list">
                  <li>Returns and refunds are handled according to our Return & Refund Policy.</li>
                </ul>

                <p className="para fw-bold mt-4 terms-head">Intellectual Property</p>
                <ul className="para terms-list">
                  <li>All content, trademarks, and images on this site belong to The Mysore Oils and may not be used without permission.</li>
                </ul>

                <p className="para fw-bold mt-4 terms-head">Limitation of Liability</p>
                <ul className="para terms-list">
                  <li>We are not responsible for allergic reactions, misuse, or indirect damages caused by our products.</li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
