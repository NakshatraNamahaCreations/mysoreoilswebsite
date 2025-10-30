import { useEffect, useState } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";
import ScrollToTop from "../../components/ScrollToTop";


export default function ShippingPolicy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => { setIsVisible(true); }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <>
      <div
        className="page-content shipping-page"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* NAVBAR MENU */}
        <Navbar_Menu />

        {/* SHIPPING POLICY */}
        <div className="shipping-wrap" style={{ backgroundColor: "white", padding: "5% 0" }}>
          <Container>
            <div className="shipping-inner" style={{ margin: "0% 10% 0% 10%" }}>
              <h1
                className="shipping-title"
                style={{
                  lineHeight: "1.5",
                  fontSize: "50px",
                  maxWidth: "100%",
                  fontWeight: "800",
                  textAlign: "center",
                  marginBottom: "5%",
                  color: "#002209",
                  fontFamily: "montserrat",
                }}
              >
                SHIPPING POLICY
              </h1>

              <div className="div-p-ul shipping-body">
                <p className="para shipping-updated" style={{ textAlign: "right", marginBottom: "5%" }}>
                  Last Updated: <span style={{ fontFamily: "poppins" }}>August 14, 2025</span>
                </p>

                <p className="para fw-bold shipping-intro" style={{ fontSize: "18px" }}>
                  At The Mysore Oils, we are committed to delivering your order accurately, in good condition, and on time.
                </p>

                <p className="para fw-bold shipping-head">Shipping Coverage:</p>
                <p className="para">We currently ship across India. International shipping is not available at this time.</p>

                <p className="para fw-bold mt-4 shipping-head">Processing Time:</p>
                <ul className="para shipping-list">
                  <li>Orders are processed within 1–2 business days after payment confirmation.</li>
                  <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
                </ul>

                <p className="para fw-bold mt-4 shipping-head">Delivery Time:</p>
                <ul className="para shipping-list">
                  <li>Metro Cities: 3–5 business days</li>
                  <li>Non-Metro Cities & Remote Areas: 5–10 business days</li>
                </ul>
                <p className="para">Delivery timelines may vary depending on courier availability and unforeseen delays.</p>

                <p className="para fw-bold mt-4 shipping-head">Order Tracking:</p>
                <p className="para">Once shipped, you will receive an email/SMS with tracking details.</p>
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
