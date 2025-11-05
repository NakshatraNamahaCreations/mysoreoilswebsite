import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import NavbarCartIcon from "./CartIcon";

const NavbarMenu = () => {
  const [addressClicked, setAddressClicked] = useState(false);
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    const userJSON = localStorage.getItem("user");
    const storedUser = userJSON ? JSON.parse(userJSON) : null;
    return storedUser && storedUser.email;
  };

  const handleCheckoutClick = () => {
    if (isUserLoggedIn()) {
      setAddressClicked(true);
      navigate("/checkout");
    } else {
      alert("Please login to proceed to checkout.");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="nav-checkout-bar" style={{ backgroundColor: "#00330e", color: "white", padding: " 0" }}>
        <Container className="d-flex justify-content-between align-items-center nav-checkout-inner">
          {/* Left — Logo */}
          <div className="d-flex align-items-center gap-3 nav-logo">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
               <img src="/media/mysoillogo.png" alt="elephant logo" style={{height:100, objectFit:"contain"}}/>
          <span className="logoheading">The Mysore oils</span>
            </Link>
          </div>

          {/* Center — Steps */}
          <div className="nav-steps" style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
            <FaCheckCircle color="#d3b353" className="nav-step-icon" />
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              <span className="nav-step-text" style={{ fontWeight: "500", fontFamily: "poppins" }}>LOGIN</span>
            </Link>
            <span className="nav-step-sep" style={{ color: "gray" }}>—</span>
            <button
              onClick={handleCheckoutClick}
              className="nav-step-btn"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              {addressClicked && <FaCheckCircle color="#d3b353" style={{ marginRight: "5px" }} />}
              <span className="nav-step-text" style={{ fontFamily: "poppins", fontWeight: "500" }}>ADDRESS</span>
            </button>
            <span className="nav-step-sep" style={{ color: "gray" }}>—</span>
            <button
              onClick={handleCheckoutClick}
              className="nav-step-btn"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                margin: 0,
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
              }}
            >
              <span className="nav-step-text" style={{ fontFamily: "poppins", fontWeight: "500" }}>PAYMENT</span>
            </button>
          </div>

          {/* Right — Secure */}
          <div className="d-flex align-items-center gap-2 nav-secure" style={{ fontSize: "14px" }}>
            <span className="nav-secure-text" style={{ fontFamily: "poppins", fontWeight: "500", marginRight: "0px" }}>100% SECURE</span>
            <FaShieldAlt color="#d3b353" className="nav-secure-icon" />
          </div>
        </Container>
      </div>
      <NavbarCartIcon />
    </>
  );
};

export default NavbarMenu;
