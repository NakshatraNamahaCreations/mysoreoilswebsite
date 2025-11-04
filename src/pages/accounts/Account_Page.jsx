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


{/*import { useNavigate } from "react-router-dom";
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
        </Container>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            color: "black",
          }}
        >
          {/* Welcome Message */}
         {/*} {user && (
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
         {/*} <General_Settings />
          <div style={{ margin: "2% 0" }}></div>

          {/* Address Details */}
          {/*<Address_Details />
          <div style={{ margin: "2% 0" }}></div>

          {/* Order Details */}
         {/*} <Order_Details />

          {/* Logout Button */}
         {/*} <div style={{ marginTop: "5%" }}>
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
}*/}


import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FaUser, FaShoppingBag, FaHeart, FaAddressBook } from "react-icons/fa";
import ScrollToTop from "../../components/ScrollToTop";
import Navbar_Menu from "../../components/Navbar_Menu";
import { Modal } from "react-bootstrap";
import NavbarMenu from "../../components/NavMenuBar";
import { Breadcrumb } from "react-bootstrap";



export default function Account_Page() {
  const [isVisible, setIsVisible] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
  localStorage.removeItem("user");
  dispatch(clearCart()); // Clears both Redux and localStorage
  navigate("/login");
};

const [showLogoutModal, setShowLogoutModal] = useState(false);


  const dashboardSections = [
    { title: "PROFILE", desc: "View or edit your personal information.", icon: <FaUser />, link: "/profile-details" },
    { title: "ORDERS", desc: "Track, return or buy your favourite products again.", icon: <FaShoppingBag />, link: "/order-details" },
    { title: "WISHLIST", desc: "View your wishlist and modify or add items to your cart.", icon: <FaHeart />, link: "/wishlist" },
    { title: "ADDRESS BOOK", desc: "Edit addresses for your orders.", icon: <FaAddressBook />, link: "/address-details" },
  ];

  return (
    <>
      <NavbarMenu/>
      <Container>
 <div
    className="d-flex justify-content-flex-start align-items-center gap-2"
    style={{ color: '#8d5662', fontSize: '1rem', marginBottom: '30px' , padding:"5px"}}
  >
    <Breadcrumb  style={{ background: 'transparent', marginLeft:"10px", marginTop:"5px" }}>
      <Breadcrumb.Item linkAs={Link} linkProps={{to:"/"}}  className="text-reset text-decoration-none" style={{ fontFamily:"poppins"}} >
        Home
      </Breadcrumb.Item>
      <Breadcrumb.Item active style={{ color: '#00614a', fontWeight:"bold", fontFamily:"poppins" }}>
        Account
      </Breadcrumb.Item>
      
    </Breadcrumb>
  </div>
        </Container> 
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <Container style={{ maxWidth: "1140px", padding: "50px 0" }}>
          {user && (
            <div className="text-center mb-5">
              <h2 style={{ fontFamily: "Montserrat", fontWeight: "600" }}>
                Hi, {user.firstname} {user.lastname}
              </h2>
              <p style={{ fontFamily: "Poppins", color: "#555" }}>Welcome to Mysore Oils</p>
            </div>
          )}

          {/* Dashboard Sections */}
          <Row className="g-4" style={{padding: "0 20px"}}>
            {dashboardSections.map((section, index) => (
              <Col md={4} sm={6} xs={12} key={index}>
                <Card
                  className="h-100"
                  style={{
                    backgroundColor: "#FFF3E7",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(section.link)}
                >
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ fontSize: "22px", marginRight: "10px" }}>{section.icon}</div>
                    <h5 style={{ margin: 0, fontWeight: "600", fontFamily: "Poppins" }}>{section.title}</h5>
                  </div>
                  <p style={{ fontSize: "14px", color: "#333", fontFamily: "Poppins", marginBottom: "0" }}>
                    {section.desc}
                  </p>
                  <div style={{ textAlign: "right", fontSize: "18px", color: "#333" }}>
                    &rarr;
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Logout Button */}
          <div className="text-center mt-5">
            <Button
  onClick={() => setShowLogoutModal(true)}
  variant="link"
  style={{
    color: "#000",
    fontFamily: "Poppins",
    fontWeight: "500",
    textDecoration: "underline",
    fontSize: "16px",
  }}
>
  LOG OUT
</Button>


<Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Confirm Logout</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Are you sure you want to logout?</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
      Cancel
    </Button>
    <Button
      variant="danger"
      onClick={() => {
        localStorage.removeItem("user");
        setShowLogoutModal(false);
        navigate("/login");
      }}
    >
      Logout
    </Button>
  </Modal.Footer>
</Modal>

          </div>
        </Container>

        <ScrollToTop />
      </div>
    </>
  );
}
