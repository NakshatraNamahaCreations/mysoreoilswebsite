{/*import { useEffect, useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";
//import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";



const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});


 

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
// localStorage.setItem("user", JSON.stringify(response.data.user));
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

  const navigate = useNavigate();


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/login");
    }
  }, [navigate]);
{/*const onSubmit = async (data) => {
    try {
      const response = await axios.post(
      //  "http://localhost:8011/api/customers/login",
        data
      );
      const userData = response.data.user;

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to account
      navigate("/account");
      
   } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
     ) {
       alert(error.response.data.message);
     } else {
     alert("Something went wrong!");
      }
  }
  };*/}

 {/*const onSubmit = (data) => {
    // console.log("Login Successful", data);
    navigate("/account");
  };*/}

  {/*const onSubmit = (data) => {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  if (
    savedUser &&
    data.email === savedUser.email &&
    data.password === savedUser.password
  ) {
    // Optional: Save session login state
    localStorage.setItem("isLoggedIn", "true");

    // Redirect to account page
    navigate("/account");
  } else {
    alert("Invalid email or password");
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
          {/* SEARCH */}
          

       {/*} <div
          style={{
            backgroundColor: "white",
            color: "#002209",
            padding: "5px 0",
          }}
        >
          {/* LOGIN FORM */}
        {/*}  <Container
            style={{
              margin: "5% auto",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            <div
              className="p-5 form"
              style={{
                borderRadius: "10px",
                padding: "25px",
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
                LOGIN
              </h2>

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
             {/*}   <Form.Group className="mb-4">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    style={{
                      height: "50px",
                      border: "1.5px solid #002209",
                      fontSize: "16px",
                      fontFamily:"poppins"
                    }}
                    className="input-account-forms search-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
               {/*} <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    style={{
                      height: "50px",
                      border: "1.5px solid #002209",
                      fontSize: "16px",
                      fontFamily:"poppins"
                    }}
                    className="input-account-forms search-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Forget Password */}
             {/*}   <Link
                  to="/forget_password"
                  style={{
                    margin: "10px 0",
                    display: "block",
                    fontFamily:"montserrat"
                  }}
                >
                  Forget your Password
                </Link>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Submit Button */}
                 {/*} <Button  
                    variant="none"
                    type="submit"
                   
                    style={{
                      width: "200px",
                      height: "50px",
                      fontWeight: "700",
                      fontFamily:"montserrat",
                      fontSize: "16px",
                      //   letterSpacing: "1px",
                      textAlign: "center",
                      border: "none",
                      margin: "8px 0",
                      borderRadius: "0",
                    }}
                    className="view-button-slider"
                     
                  >
                    SIGN IN
                  </Button>

                  {/* Create Account */}
                 {/*} <Link
                    to="/create_account"
                  className="view-button-slider"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "200px",
                      height: "50px",
                      fontWeight: "700",
                      fontFamily:"montserrat",
                      fontSize: "16px",
                      //   letterSpacing: "1px",
                      textAlign: "center",
                      textDecoration: "none",
                      border: "none",
                      margin: "8px 0",
                    }}
                  >
                    CREATE ACCOUNT
                  </Link>
                </div>
              </Form>
            </div>
          </Container>
        </div>

        <ScrollToTop />

      </div>
    </>
  );
    }*/}

  {/*}  import { useEffect, useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import NavbarMenu from "../../components/NavMenuBar";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (
      savedUser &&
      data.email === savedUser.email &&
      data.password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/account");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <>
    <NavbarMenu/>
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            color: "#002209",
            padding: "5px 0",
          }}
        >
          <ScrollToTop />
          <Container
            style={{
              margin: "5% auto",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              zIndex: 10,
            }}
          >
            {isLoggedIn ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  border: "2px solid #006400",
                  borderRadius: "10px",
                  backgroundColor: "#f5fff5",
                }}
              >
                <h2 style={{ color: "#006400", fontFamily: "montserrat" }}>
                  You're already logged in.
                </h2>
                <Link
                  to="/account"
                  className="view-button-slider"
                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    textDecoration: "none",
                  }}
                >
                  Go to My Account
                </Link>
              </div>
            ) : (
              <div
                className="p-5 form"
                style={{
                  borderRadius: "10px",
                  padding: "25px",
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
                    fontFamily: "montserrat",
                  }}
                >
                  LOGIN
                </h2>

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      isInvalid={!!errors.email}
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "16px",
                        fontFamily: "poppins",
                      }}
                      className="input-account-forms search-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                      isInvalid={!!errors.password}
                      style={{
                        height: "50px",
                        border: "1.5px solid #002209",
                        fontSize: "16px",
                        fontFamily: "poppins",
                      }}
                      className="input-account-forms search-input"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Link
                    to="/forget_password"
                    style={{
                      margin: "10px 0",
                      display: "block",
                      fontFamily: "montserrat",
                    }}
                  >
                    Forget your Password
                  </Link>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="none"
                      type="submit"
                      style={{
                        width: "200px",
                        height: "50px",
                        fontWeight: "700",
                        fontFamily: "montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        border: "none",
                        margin: "8px 0",
                        borderRadius: "0",
                      }}
                      className="view-button-slider"
                    >
                      SIGN IN
                    </Button>

                    <Link
                      to="/create_account"
                      className="view-button-slider"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "200px",
                        height: "50px",
                        fontWeight: "700",
                        fontFamily: "montserrat",
                        fontSize: "16px",
                        textAlign: "center",
                        textDecoration: "none",
                        border: "none",
                        margin: "8px 0",
                      }}
                    >
                      CREATE ACCOUNT
                    </Link>
                  </div>
                </Form>
              </div>
            )}
          </Container>
        </div>
      </div>
    </>
  );
}*/}


import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import NavbarMenu from "../../components/NavMenuBar";
import FooterOne from "../../components/FooterOne";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { Breadcrumb } from "react-bootstrap";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
const [showForgot, setShowForgot] = useState(false);
const [showPassword, setShowPassword] = useState(false); 

  // Redirect if user already logged in
  useEffect(() => {
    window.scrollTo(0, 0);
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      navigate("/account"); // or keep them on the same page
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://api.themysoreoils.com/api/customers/login",
        data
      );
      const userData = response.data.user;
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Redirect to previous page or fallback
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/shop";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  };

  return (
    <>
      <NavbarMenu />
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
        Login
      </Breadcrumb.Item>
      
    </Breadcrumb>
  </div>
        </Container> 
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
        <Card
          style={{
            width: "400px",
            padding: "30px 25px",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            background: "#fffbe8",
          }}
        >
          <h4
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            Login to Continue
          </h4>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register("email")}
                isInvalid={!!errors.email}
                style={{
                  height: "50px",
                  border: "1.5px solid #002209",
                  fontSize: "16px",
                  fontFamily: "Poppins",
                }}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

           <Form.Group className="mb-4">
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  isInvalid={!!errors.password}
                  style={{
                    height: "50px",
                    border: "1.5px solid #002209",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    border: "1.5px solid #002209",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#d3b353",
                border: "none",
                padding: "12px",
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              CONTINUE
            </Button>
            <p style={{ textAlign: "center", marginTop: "15px" }}>
  <span
    style={{ color: "#b38900", cursor: "pointer", fontWeight: "600" }}
    onClick={() => setShowForgot(true)}
  >
    Forgot Password?
  </span>
</p>
          </Form>
<ForgotPasswordModal show={showForgot} handleClose={() => setShowForgot(false)} />
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <p style={{ fontFamily: "Poppins", color: "#555" }}>Don’t have an account?</p>
            <Link
              to="/create_account"
              style={{
                fontFamily: "Poppins",
                fontWeight: "600",
                color: "#b38900",
                textDecoration: "none",
              }}
            >
              Create an Account
            </Link>
          </div>
        </Card>
      </Container>
      
    </>
  );
}
