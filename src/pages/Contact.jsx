import { Container, Row, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
// import Navbar_Menu from "../components/Navbar_Menu";
// import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import Navbar_Menu from "../components/Navbar_Menu";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneCode: yup
    .string()
    .matches(/^\+\d{1,4}$/, "Invalid phone code (e.g. +1)")
    .required("Phone code is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{7,15}$/, "Invalid phone number")
    .required("Phone number is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export default function Contact() {
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
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
         <Navbar_Menu/>

        {/* SEARCH */}
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
        </Container>*/}

        <div style={{ position: "relative" }}>
          <div
            style={{
              backgroundColor: "#ffff",
              padding: "20px",
              color: "#002209",
            }}
          >
            <div className="mt-5" style={{}}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "50px",
                  letterSpacing: "1px",
                  fontWeight: "800",
                  color: "#002209",
                }}
              >
                CONTACT US
              </h1>
            </div>
            <Container className="mt-5" >
              <Row>
                <Col sm={4} className="d-flex contact-col">
                  <div
                    className="contact-col-box d-flex flex-column justify-content-center align-items-center"
                    style={{
                      border: "1px solid lightgray",
                      padding: "20px",
                      borderRadius: "10px",
                      textAlign: "center",
                   
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="fa-icon"
                      style={{

                        width: "50px",
                        height: "50px",
                        marginBottom: "10px",
                      }}
                    />
                    <h3 style={{ fontWeight: "700", fontSize: "20px", fontFamily:"poppins" }}>
                      ADDRESS
                    </h3>
                    <p
                      style={{
                        letterSpacing: "1px",
                        fontWeight: "400",
                        fontSize: "16px",
                        fontFamily:"poppins"
                      }}
                    >
                      #1881/3A, WESLEY ROAD, MYSORE, KARNATAKA 570001
                    </p>
                  </div>
                </Col>

                <Col sm={4} className="d-flex contact-col">
                  <div
                    className="contact-col-box d-flex flex-column justify-content-center align-items-center"
                    style={{
                      border: "1px solid lightgray",
                      padding: "25px",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="fa-icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginBottom: "10px",
                      }}
                    />
                    <h3 style={{ fontWeight: "700", fontSize: "20px", fontFamily:"poppins" }}>
                      CALL US
                    </h3>
                    <p
                      style={{
                        letterSpacing: "1px",
                        fontWeight: "400",
                        fontSize: "16px",
                        fontFamily:"poppins"
                      }}
                    >
                     7899830366
                    </p>
                  </div>
                </Col>

                <Col sm={4} className="d-flex contact-col">
                  <div
                    className="contact-col-box d-flex flex-column justify-content-center align-items-center"
                    style={{
                      border: "1px solid lightgray",
                      padding: "25px",
                      borderRadius: "10px",
                      textAlign: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="fa-icon"
                      style={{
                        width: "50px",
                        height: "50px",
                        marginBottom: "10px",
                      }}
                    />
                    <h3 style={{ fontWeight: "700", fontSize: "20px" , fontFamily:"poppins"}}>
                      EMAIL US
                    </h3>
                    <p
                      style={{
                        letterSpacing: "1px",
                        fontWeight: "400",
                        fontSize: "16px",
                        fontFamily:"poppins"
                      }}
                    >
                  support@themysoreoils.com
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>

            {/* CONTACT FORM */}
          <Container style={{ margin: "5% auto" }}>
  <Row className="justify-content-md-center">
    <Col md={6} style={{ width: "55%" }}>
      <div
        className="p-4"
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Form onSubmit={handleSubmit(onSubmit)} style={{ padding: "10px" }}>
          {/* First Name */}
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              isInvalid={!!errors.firstName}
            
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              isInvalid={!!errors.lastName}
             
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              placeholder="Email"
              {...register("email")}
              isInvalid={!!errors.email}
              
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Phone Code & Number */}
          <Row>
            <Col md={4}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="+91"
                  {...register("phoneCode")}
                  isInvalid={!!errors.phoneCode}
                
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneCode?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                  isInvalid={!!errors.phoneNumber}
                 
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Message */}
          <Form.Group className="mb-4">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Message"
              {...register("message")}
              isInvalid={!!errors.message}
              style={{
               
                height: "150px",
                resize: "none",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button
            variant="dark"
            type="submit"
            style={{
              width: "100%",
              height: "50px",
              fontSize: "18px",
              fontWeight: "600",
              letterSpacing: "1px",
              borderRadius: "8px",
              backgroundColor: "#D3B353",
              border: "none",
              color: "#000",
              fontFamily:"poppins"
            }}
          >
            SUBMIT
          </Button>
        </Form>
      </div>
    </Col>
  </Row>
</Container>

          </div>
        </div>

        <ScrollToTop />

        {/* FOOTER */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
