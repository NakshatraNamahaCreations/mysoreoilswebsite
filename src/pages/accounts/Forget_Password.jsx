import { Container, Button, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop";

export default function Forget_Password() {
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
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
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

        <div
          style={{
            backgroundColor: "#FBF9F4",
            padding: "5px 0",
            position: "relative",
          }}
        >
          {/* <Navbar_Menu /> */}
          <div style={{ position: "relative" }} className="login-background">
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
                  padding: "25px",
                  maxWidth: "500px",
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
                  UPDATE PASSWORD
                </h2>

                <Form>
                  {/* New Password */}
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="Create New Password"
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontFamily:"poppins",
                        fontSize: "16px",
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontFamily:"poppins",
                        fontSize: "16px",
                      }}
                      className="input-account-forms search-input"
                    />
                  </Form.Group>

                  {/* Resend Link */}
                  <Link
                    to="/forget_password"
                    style={{
                      margin: "10px 0",
                      display: "block",
                      fontFamily:"poppins"
                    }}
                  >
                    Resend Link
                  </Link>

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
                      height: "50px",
                      fontWeight: "700",
                      color: "#002209",
                      backgroundColor: "#D3B353",
                      fontSize: "16px",
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
                    UPDATE PASSWORD
                  </Button>
                </Form>

                <hr
                  style={{
                    border: "none",
                    height: "1px",
                    backgroundColor: "#002209",
                    margin: "20px 0",
                  }}
                />

                {/* Create Account */}
                <p
                  style={{
                    fontSize: "16px",
                    // letterSpacing: "1px",
                    textAlign: "center",
                    color: "#002209",
                    fontFamily:"poppins"
                    // margin: "5% 0 0 0",
                  }}
                >
                  Don't have an account?
                </p>
                <Link
                  to="/create_account"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "280px",
                    height: "50px",
                    fontWeight: "700",
                    color: "#002209",
                    backgroundColor: "#D3B353",
                    fontSize: "16px",
                    textAlign: "center",
                    textDecoration: "none",
                    position: "relative",
                    zIndex: 1000,
                    pointerEvents: "auto",
                    border: "none",
                    margin: "10px auto",
                    fontFamily:"montserrat"
                  }}
                  className="view-button-slider"
                >
                  CREATE ACCOUNT
                </Link>
              </div>
            </Container>
          </div>

     
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
