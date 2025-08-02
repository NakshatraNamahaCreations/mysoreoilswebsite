import {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    // Show success modal
    setShowModal(true);

    // Reset form
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      mobilenumber: "",
    });
  };



  {/*const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    //const res = await axios.post("http://localhost:8011/api/customers/register", formData);
    setShowModal(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};*/}

 





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
                  <Form.Group className="mb-4">
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
                  <Form.Group className="mb-4">
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
                  <Form.Group className="mb-4">
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
                   <Form.Group className="mb-4">
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
                  <Form.Group className="mb-4">
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
                  <Button
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
            </div>
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
      </div>
    </>
  );
}
