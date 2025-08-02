{/*import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import General_Settings from "./General_Settings";
import Order_Details from "./Order_Details";
import Address_Details from "./Address_Details";
import ScrollToTop from "../../components/ScrollToTop";

export default function Account_Page() {
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
  const navigate = useNavigate();
const handleSignIn = () => {
  // Clear user from localStorage
  localStorage.removeItem("user");

  // Navigate to login
  navigate("/login");
};

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
          {/*}    <Container className="mt-3">
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

        <div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            color: "black",
          }}
        >
          {/* GENERAL SETTING */}
        {/*}  <General_Settings />
          <div style={{ margin: "2% 0" }}></div>
         <Address_Details />
          <div style={{ margin: "2% 0" }}></div>
          
             <Order_Details />

          {/* Logout Button */}
         {/*} <div style={{ marginTop: "5%" }}>
            <Button
              variant="none"
              type="submit"
              className=" mt-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "60px",
                fontWeight: "bold",
                backgroundColor: "#D3B353",
                color: "black",
                fontSize: "24px",
                letterSpacing: "1px",
                textAlign: "center",
                textDecoration: "none",
                position: "relative",
                zIndex: 1000,
                pointerEvents: "auto",
                border: "none",
                margin: "20px auto",
                fontFamily:"montserrat"
              }}
              onClick={handleSignIn}
            >
              LOGOUT
            </Button>
          </div>
        </div>

        <ScrollToTop />

        {/* FOOTER */}
        {/* <Footer /> */}
     {/*} </div>
    </>
  );
}*/}


import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  InputGroup,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import General_Settings from "./General_Settings";
import Order_Details from "./Order_Details";
import Address_Details from "./Address_Details";
import ScrollToTop from "../../components/ScrollToTop";

export default function Account_Page() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fade-in effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Logout
  const handleSignIn = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* Search Bar */}
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

        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            color: "black",
          }}
        >
          {/* Welcome Message */}
          {user && (
            <h4
              style={{
                textAlign: "center",
                marginBottom: "30px",
                fontFamily: "poppins",
                color: "#002209",
              }}
            >
              Welcome, {user.firstname} {user.lastname}
            </h4>
          )}

          {/* General Settings */}
          <General_Settings />
          <div style={{ margin: "2% 0" }}></div>

          {/* Address Details */}
          <Address_Details />
          <div style={{ margin: "2% 0" }}></div>

          {/* Order Details */}
          <Order_Details />

          {/* Logout Button */}
          <div style={{ marginTop: "5%" }}>
            <Button
              variant="none"
              type="submit"
              className="mt-2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "60px",
                fontWeight: "bold",
                backgroundColor: "#D3B353",
                color: "black",
                fontSize: "24px",
                letterSpacing: "1px",
                textAlign: "center",
                textDecoration: "none",
                position: "relative",
                zIndex: 1000,
                pointerEvents: "auto",
                border: "none",
                margin: "20px auto",
                fontFamily: "montserrat",
              }}
              onClick={handleSignIn}
            >
              LOGOUT
            </Button>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </>
  );
}

