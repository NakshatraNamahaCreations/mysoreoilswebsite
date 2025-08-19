{/*import {
  Container,
  Button,
  InputGroup,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import { Modal } from "react-bootstrap";



export default function Create_Account() {
   const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobilenumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //const handleSubmit = (e) => {
    //e.preventDefault();

    // Save to localStorage
    //localStorage.setItem("user", JSON.stringify(formData));

    // Show success modal
    //setShowModal(true);

    // Reset form
    //setFormData({
     // firstname: "",
    //  lastname: "",
     // email: "",
     // password: "",
     // mobilenumber: "",
  //  });
//  };



  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("https://api.themysoreoils.com/api/customers/register", formData);
    setShowModal(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
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
       
       

        <div
          style={{
            position: "relative",
            padding: "5px 0",
            backgroundColor: "white",
          }}
        >
          <Container
            style={{
              margin: "5% auto",
              display: "flex",
              justifyContent: "center",

              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              className="p-4 form"
              style={{
                borderRadius: "10px",
                padding: "30px 0px",
                maxWidth: "600px",
                width: "100%",
                border: "2px solid #002209",
                boxShadow: "1px 1px 10px #002209",
                backgroundColor: "#fff",
              }}
            >
              <h2
                className="text-center mb-4 mobile-font"
                style={{
                  fontWeight: "800",
                  fontSize: "32px",
                  letterSpacing: "1px",
                  color: "#002209",
                  fontFamily:"montserrat"
                }}
              >
                CREATE ACCOUNT
              </h2>

              <Form onSubmit={handleSubmit}>
                <Row>
                  {/* First Name */}
                {/* <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                        name="firstname" // ✅ this was missing
  value={formData.firstname}
  onChange={handleChange}
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "15px",
                        fontFamily:"poppins"
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Last Name */}
                {/*}  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                       name="lastname" // ✅ this was missing
  value={formData.lastname}
  onChange={handleChange}
  placeholder="Last Name"
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "15px",
                        fontFamily:"poppins"
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Email */}
                  {/*<Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      name="email"
                        onChange={handleChange}
                        value={formData.email}
                      placeholder="Email ID"
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "15px",
                        fontFamily:"poppins"
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>
                  {/* number */}
                  {/*} <Form.Group className="mb-4">
                    <Form.Control
                      name="mobilenumber" // ✅ ADD THIS (You forgot this field in your UI)
  value={formData.mobilenumber}
  onChange={handleChange}
  placeholder="Mobile Number"
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "15px",
                        fontFamily:"poppins"
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Password */}
                 {/*} <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                         name="password" 
  value={formData.password}
  onChange={handleChange}
  placeholder="Password"
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "15px",
                        fontFamily:"poppins"
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>
                  <div className="d-flex gap-2">

                  {/* Submit Button */}
                  {/*<Button
                    variant="none"
                    type="submit"
                      
                    className="w-50 mt-2 view-button-slider"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "280px",
                      height: "60px",
                      fontWeight: "700",
                      color: "#002209",
                      backgroundColor: "#D3B353",
                      fontSize: "18px",
                      letterSpacing: "1px",
                      textAlign: "center",
                      textDecoration: "none",
                      position: "relative",
                      zIndex: 1000,
                      pointerEvents: "auto",
                      border: "none",
                      borderRadius: "0",
                      margin: "10px auto",
                      fontFamily:"montserrat"
                    }}
                  >
                    SUBMIT
                  </Button>
                 

<Link
  to="/login"
  className="w-50 mt-2 view-button-slider"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "280px",
    height: "60px",
    fontWeight: "700",
    color: "#002209",
    backgroundColor: "#D3B353",
    fontSize: "18px",
    letterSpacing: "1px",
    textAlign: "center",
    textDecoration: "none",
    position: "relative",
    zIndex: 1000,
    pointerEvents: "auto",
    border: "none",
    borderRadius: "0",
    margin: "10px auto",
    fontFamily: "montserrat"
  }}
>
  SIGN IN
</Link>

                  </div>
                </Row>
              </Form>

              {/* <a
                href="/login"
                style={{
                  display: "flex",
                  justifySelf: "center",
                  color: "#002209",
                  fontSize: "14px",
                  textDecoration: "none",
                }}
              >
                Cancel
              </a> */}
              {/* 
              <hr
                style={{
                  border: "none",
                  height: "1px",
                  backgroundColor: "#002209",
                  margin: "20px 0",
                }}
              /> */}

              {/* Create Account */}
              {/* <p
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  color: "#002209",
                  margin: "0",
                }}
              >
                Have an account?
              </p> */}
           {/*} </div>
          </Container>
        </div>

        <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  centered
  backdrop="static"
>
  <Modal.Header closeButton>
    <Modal.Title>Account Created</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    Your account has been successfully created. Redirecting to login page...
  </Modal.Body>
</Modal>


        <ScrollToTop />

        {/* FOOTER */}
        {/* <Footer /> */}
    {/*}  </div>
    </>
  );
}*/}


import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarMenu from "../../components/NavMenuBar";
import FooterOne from "../../components/FooterOne";

export default function Create_Account() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobilenumber: "",
    smsConsent: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("https://api.themysoreoils.com/api/customers/register", {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        mobilenumber: formData.mobilenumber,
        smsConsent: formData.smsConsent,
      });
      setShowModal(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
    <NavbarMenu/>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div style={{ width: "100%", maxWidth: "500px", padding: "30px", background: "#fffbe8", borderRadius: "10px" }}>
          <h2 className="text-center mb-4" style={{ fontFamily: "Montserrat", fontWeight: "bold" }}>Create Account</h2>
          <p className="text-center mb-4" style={{ fontFamily: "Poppins", color: "#555" }}>
            Creating an account has many benefits: check out faster, keep more than one address, track orders and more.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="mobilenumber"
                placeholder="Mobile Number"
                value={formData.mobilenumber}
                onChange={handleChange}
                required
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group>
            {/* Uncomment if you need SMS Consent */}
            {/* <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="I hereby authorize you to send notifications via SMS/messages/promotional/informational messages."
                name="smsConsent"
                checked={formData.smsConsent}
                onChange={handleChange}
                style={{ fontFamily: "poppins" }}
              />
            </Form.Group> */}
            <div className="d-grid gap-2">
              <Button type="submit" style={{ backgroundColor: " #d3b353", border: "none", height: "45px", fontFamily: "poppins" }}>
                Create an Account
              </Button>
              <Button variant="outline-secondary" as={Link} to="/login" style={{ height: "45px", fontFamily: "poppins" }}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Container>

      <Modal show={showModal} centered backdrop="static">
        <Modal.Header>
          <Modal.Title>Account Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account has been successfully created. Redirecting to login page...</Modal.Body>
      </Modal>

      {/*footer section */}
      <FooterOne/>
    </>
  );
}
