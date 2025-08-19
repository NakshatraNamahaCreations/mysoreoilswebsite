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
      <div style={{ backgroundColor: "#015b19", color: "white", padding: "10px 0" }}>
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <img src="/media/MysuruOilsLogo.png" alt="logo" height="70" style={{ marginLeft: "-70px" }} />
            </Link>
          </div>

          {/* Center - Steps */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
            <FaCheckCircle color="#d3b353" />
            <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
              <span style={{ fontWeight: "500", fontFamily: "poppins" }}>LOGIN</span>
            </Link>
            <span style={{ color: "gray" }}>—</span>
            <button
              onClick={handleCheckoutClick}
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
              <span style={{ fontFamily: "poppins", fontWeight: "500" }}>ADDRESS</span>
            </button>
            <span style={{ color: "gray" }}>—</span>
            <button
              onClick={handleCheckoutClick}
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
              <span style={{ fontFamily: "poppins", fontWeight: "500" }}>PAYMENT</span>
            </button>
          </div>

          {/* Right - Secure */}
          <div className="d-flex align-items-center gap-2" style={{ fontSize: "14px" }}>
            <span style={{ fontFamily: "poppins", fontWeight: "500", marginRight: "0px" }}>100% SECURE</span>
            <FaShieldAlt color="#d3b353" />
          </div>
        </Container>
      </div>
      <NavbarCartIcon />
    </>
  );
};

export default NavbarMenu;
