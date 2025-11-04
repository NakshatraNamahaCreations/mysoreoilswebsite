import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import Navbar_Menu from "../components/Navbar_Menu";
import Footer from "../components/Footer"

/* ---------------- Validation ---------------- */
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phoneCode: yup.string().matches(/^\+\d{1,4}$/, "Invalid phone code (e.g. +91)").required("Phone code is required"),
  phoneNumber: yup.string().matches(/^\d{7,15}$/, "Invalid phone number").required("Phone number is required"),
  message: yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
});

/* ---------- Mobile breakpoint hook (<= 768px) ---------- */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return isMobile;
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    // TODO: POST to your API, then:
    // reset();
  };

  return (
    <>
      <div
        className="page-content"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      >
        {/* NAVBAR */}
        <Navbar_Menu />

        {/* PAGE HEADER */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: isMobile ? "12px 0 8px" : "20px 0",
            color: "#002209",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: isMobile ? "30px" : "50px",
              letterSpacing: "0.5px",
              fontWeight: 800,
              color: "#002209",
              marginTop: isMobile ? "12px" : "32px",
              marginBottom: isMobile ? "8px" : "12px",
              fontFamily: "poppins, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
            }}
          >
            CONTACT US
          </h1>

          {/* INFO CARDS */}
          <Container style={{ paddingLeft: isMobile ? 12 : 16, paddingRight: isMobile ? 12 : 16 }}>
            <Row className="g-3 g-md-4 mt-3">
              {/* Address */}
              <Col xs={12} md={4} className="d-flex">
                <div
                  className="contact-col-box d-flex flex-column justify-content-center align-items-center w-100"
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: isMobile ? "16px" : "20px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    background: "#fff",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ width: isMobile ? 36 : 50, height: isMobile ? 36 : 50, marginBottom: 10, color: "#00614A" }}
                  />
                  <h3 style={{ fontWeight: 700, fontSize: isMobile ? 16 : 20, fontFamily: "poppins" }}>
                    ADDRESS
                  </h3>
                  <p
                    style={{
                      letterSpacing: isMobile ? "0.2px" : "0.5px",
                      fontWeight: 400,
                      fontSize: isMobile ? 14 : 16,
                      fontFamily: "poppins",
                      marginBottom: 0,
                    }}
                  >
                    <a
                      href="https://g.co/kgs/ugbtFCm"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#002209", textDecoration: "none" }}
                    >
                      No 203, Maalige Arcade, 100ft road, Chikkegowdanpalya, Banashankari 6th Stage , Bangalore 62
                    </a>
                  </p>
                </div>
              </Col>

              {/* Call */}
              <Col xs={12} md={4} className="d-flex">
                <div
                  className="contact-col-box d-flex flex-column justify-content-center align-items-center w-100"
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: isMobile ? "16px" : "25px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    background: "#fff",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    style={{ width: isMobile ? 36 : 50, height: isMobile ? 36 : 50, marginBottom: 10, color: "#00614A" }}
                  />
                  <h3 style={{ fontWeight: 700, fontSize: isMobile ? 16 : 20, fontFamily: "poppins" }}>
                    CALL US
                  </h3>
                  <p
                    style={{
                      letterSpacing: isMobile ? "0.2px" : "0.5px",
                      fontWeight: 400,
                      fontSize: isMobile ? 14 : 16,
                      fontFamily: "poppins",
                      marginBottom: 0,
                    }}
                  >
                    <a href="tel:63629 02455" style={{ color: "#002209", textDecoration: "none" }}>
                      63629 02455
                    </a>
                  </p>
                </div>
              </Col>

              {/* Email */}
              <Col xs={12} md={4} className="d-flex">
                <div
                  className="contact-col-box d-flex flex-column justify-content-center align-items-center w-100"
                  style={{
                    border: "1px solid #e5e7eb",
                    padding: isMobile ? "16px" : "25px",
                    borderRadius: "12px",
                    textAlign: "center",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                    background: "#fff",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ width: isMobile ? 36 : 50, height: isMobile ? 36 : 50, marginBottom: 10, color: "#00614A" }}
                  />
                  <h3 style={{ fontWeight: 700, fontSize: isMobile ? 16 : 20, fontFamily: "poppins" }}>
                    EMAIL US
                  </h3>
                  <p
                    style={{
                      letterSpacing: isMobile ? "0.2px" : "0.5px",
                      fontWeight: 400,
                      fontSize: isMobile ? 14 : 16,
                      fontFamily: "poppins",
                      marginBottom: 0,
                    }}
                  >
                    <a href="mailto:support@themysoreoils.com" style={{ color: "#002209", textDecoration: "none" }}>
                      support@themysoreoils.com
                    </a>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>

          {/* CONTACT FORM */}
          <Container style={{ margin: isMobile ? "28px auto 36px" : "5% auto", paddingLeft: isMobile ? 12 : 16, paddingRight: isMobile ? 12 : 16 }}>
            <Row className="justify-content-center">
              <Col xs={12} md={7} lg={6}>
                <div
                  className="p-3 p-md-4"
                  style={{
                    borderRadius: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    backgroundColor: "#fff",
                  }}
                >
                  <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* First Name */}
                    <Form.Group className="mb-3 mb-md-4">
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        {...register("firstName")}
                        isInvalid={!!errors.firstName}
                        style={{
                          height: isMobile ? 46 : 50,
                          fontSize: isMobile ? 14 : 16,
                          borderRadius: 10,
                        }}
                        aria-label="First Name"
                        autoComplete="given-name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Last Name */}
                    <Form.Group className="mb-3 mb-md-4">
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        {...register("lastName")}
                        isInvalid={!!errors.lastName}
                        style={{
                          height: isMobile ? 46 : 50,
                          fontSize: isMobile ? 14 : 16,
                          borderRadius: 10,
                        }}
                        aria-label="Last Name"
                        autoComplete="family-name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="mb-3 mb-md-4">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        isInvalid={!!errors.email}
                        style={{
                          height: isMobile ? 46 : 50,
                          fontSize: isMobile ? 14 : 16,
                          borderRadius: 10,
                        }}
                        aria-label="Email"
                        autoComplete="email"
                        inputMode="email"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Phone Code & Number */}
                    <Row className="g-2">
                      <Col xs={4} md={4}>
                        <Form.Group className="mb-3 mb-md-4">
                          <Form.Control
                            type="text"
                            placeholder="+91"
                            {...register("phoneCode")}
                            isInvalid={!!errors.phoneCode}
                            style={{
                              height: isMobile ? 46 : 50,
                              fontSize: isMobile ? 14 : 16,
                              borderRadius: 10,
                              textAlign: "center",
                            }}
                            aria-label="Phone Code"
                            inputMode="tel"
                            autoComplete="tel-country-code"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneCode?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={8} md={8}>
                        <Form.Group className="mb-3 mb-md-4">
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            {...register("phoneNumber")}
                            isInvalid={!!errors.phoneNumber}
                            style={{
                              height: isMobile ? 46 : 50,
                              fontSize: isMobile ? 14 : 16,
                              borderRadius: 10,
                            }}
                            aria-label="Phone Number"
                            inputMode="tel"
                            autoComplete="tel-national"
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber?.message}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* Message */}
                    <Form.Group className="mb-3 mb-md-4">
                      <Form.Control
                        as="textarea"
                        rows={isMobile ? 4 : 4}
                        placeholder="Message"
                        {...register("message")}
                        isInvalid={!!errors.message}
                        style={{
                          fontSize: isMobile ? 14 : 16,
                          height: isMobile ? 140 : 150,
                          resize: "none",
                          borderRadius: 10,
                        }}
                        aria-label="Message"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.message?.message}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit */}
                    <Button
                      variant="dark"
                      type="submit"
                      style={{
                        width: "100%",
                        height: isMobile ? 46 : 50,
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        borderRadius: 10,
                        backgroundColor: "#D3B353",
                        border: "none",
                        color: "#000",
                        fontFamily: "poppins",
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

        <ScrollToTop />
        <Footer/>
      </div>
    </>
  );
}
