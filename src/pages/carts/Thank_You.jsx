// import Navbar_Menu from "../../components/Navbar_Menu";
{/*import {
  Container,
  Row,
  Col,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import thankyou from "/media/Thankyou.png";
import Products_Sliders from "../Products_Sliders";
// import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Thank_You() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

     const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 5000);

   return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

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
        {/* SEARCH */}
      {/*}  <Container className="mt-5">
          <InputGroup
            className="mb-5 footer-subscribe-input"
            style={{ maxWidth: "750px", margin: "auto" }}
          >
            <Form.Control
              placeholder="Search our products..."
              style={{
                borderRadius: "5px",
                fontSize: "16px",
                color: "#00614A",
                fontWeight: "500",
              }}
              className="me-2 search-input input-account-forms"
            />
            <InputGroup.Text
              className="footer-subscribe-button"
              style={{
                borderRadius: "0",
                fontWeight: "bold",
                color: "black",
                backgroundColor: "#D3B353",
                height: "48px",
                cursor: "pointer",
                fontSize: "16px",
                padding: "0 24px",
                letterSpacing: "1px",
              }}
            >
              SEARCH
            </InputGroup.Text>
          </InputGroup>
        </Container>*/}

        {/* THANK YOU */}
       {/*} <div
          style={{
            backgroundColor: "#ffff",
            color: "black",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              fontWeight: "bold",
              backgroundImage: "url('/media/Thankyoudecoration.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              padding: "20px",
              minHeight: "120vh",
            }}
          >
            <h1
              style={{
                fontWeight: "900",
                fontSize: "90px",
                letterSpacing: "2px",
                margin: "10% 0 0 0",
                           color:"#002209"
              }}
            >
              THANK YOU!
            </h1>

            <p
              style={{
                fontSize: "26px",
                letterSpacing: "1px",
                opacity: "0.8",
                marginTop: "10px",
                           color:"#002209"
              }}
            >
              Your Order Has Been Confirmed
            </p>

            <div
              style={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={thankyou}
                alt="Thank you"
                style={{
                  width: "35vw",
                  height: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
        {/* YOU MAY ALSO LIKE */}
      

       {/*} <ScrollToTop />
      </div>
    </>
  );
}*/}


import { Container, Row, Col } from "react-bootstrap";
import thankyou from "/media/Thankyou.png";
import ScrollToTop from "../../components/ScrollToTop";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function ThankYou() {
  const [isVisible, setIsVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Verifying your payment...");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const verifyPayment = async () => {
  //     try {
  //       const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  //       if (!orderDetails || !orderDetails.merchantTransactionId) {
  //         setStatusMessage("Invalid payment session. Please try again.");
  //         return;
  //       }

  //       const { merchantTransactionId, items, grandTotal, addressId } = orderDetails;

  //       const response = await axios.post(
  //         "https://api.themysoreoils.com/api/payment/verify",
  //         {
  //           merchantTransactionId,
  //           orderData: { items, grandTotal, addressId },
  //         }
  //       );

  //       if (response.data.success) {
  //         setStatusMessage("✅ Payment successful! Your order has been placed.");
  //         localStorage.removeItem("orderDetails");
  //         dispatch({ type: "cart/clearCart" });
  //       } else {
  //         setStatusMessage("❌ Payment failed. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Payment verification error:", error);
  //       setStatusMessage("⚠️ Error verifying payment. Contact support.");
  //     }
  //   };

  //   verifyPayment();
  // }, [dispatch]);


  useEffect(() => {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  if (!orderDetails) return;

  axios.post("https://api.themysoreoils.com/api/payment/verify", {
    orderId: orderDetails.orderId,
    merchantTransactionId: orderDetails.orderId, // backend matches by merchantOrderId
  })
  .then((res) => {
    if (res.data.status === "Paid") {
      dispatch({ type: "cart/clearCart" });
    }
  })
  .catch((err) => console.error("Verify error:", err));
}, []);

  useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const redirectTimeout = setTimeout(() => {
      navigate("/");
    }, 7000);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

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
        <div
          style={{
            backgroundColor: "#ffff",
            color: "black",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              fontWeight: "bold",
              backgroundImage: "url('/media/Thankyoudecoration.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              padding: "20px",
              minHeight: "120vh",
            }}
          >
            <h1
              style={{
                fontWeight: "900",
                fontSize: "90px",
                letterSpacing: "2px",
                margin: "10% 0 0 0",
                color: "#002209",
              }}
            >
              THANK YOU!
            </h1>

            <p
              style={{
                fontSize: "26px",
                letterSpacing: "1px",
                opacity: "0.8",
                marginTop: "10px",
                color: "#002209",
              }}
            >
              {statusMessage}
            </p>

            <div
              style={{
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={thankyou}
                alt="Thank you"
                style={{
                  width: "35vw",
                  height: "auto",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </>
  );
}
