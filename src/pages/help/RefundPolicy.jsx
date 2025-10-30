import { useEffect, useState } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";
import Footer from "../../components/Footer";
import { Container } from "react-bootstrap";
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
        className="page-content refund-page"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      >
        <Navbar_Menu />

        {/* REFUND POLICY */}
        <div className="refund-wrap" style={{ backgroundColor: "white", padding: "5% 0" }}>
          <Container>
            <div className="refund-inner" style={{ margin: "0% 10% 0% 10%" }}>
              <h1
                className="refund-title"
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
                REFUND POLICY
              </h1>

              <div className="refund-body div-p-ul">
                <p className="para fw-bold refund-intro" style={{ fontSize: "18px" }}>
                  Due to the nature of our products (oils and natural items), we follow strict
                  hygiene and quality protocols.
                </p>

                <p className="para fw-bold refund-head">Returns</p>
                <p className="para">We accept returns only if:</p>
                <ul className="para refund-list">
                  <li>You received a damaged or defective product.</li>
                  <li>The product delivered is different from what was ordered.</li>
                </ul>

                <p className="para fw-bold refund-head">Return Conditions</p>
                <ul className="para refund-list">
                  <li>You must notify us within 48 hours of delivery with photo/video proof.</li>
                  <li>Returned items must be unused, sealed, and in their original packaging.</li>
                </ul>

                <p className="para fw-bold refund-head">Refunds</p>
                <ul className="para refund-list">
                  <li>
                    Once your return is approved, your refund will be credited within 7–10
                    business days to your original payment method.
                  </li>
                  <li>Shipping charges are non-refundable.</li>
                </ul>

                <p className="para fw-bold refund-head" style={{ marginTop: "2%" }}>
                  Cancellations
                </p>
                <p className="para">
                  Orders can be cancelled only before dispatch. Once shipped, cancellations are
                  not possible.
                </p>
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
