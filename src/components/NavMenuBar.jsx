import React from "react";
import { Container } from "react-bootstrap";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavbarCartIcon from "./CartIcon";

const NavbarMenu = () => {
      const [addressClicked, setAddressClicked] = useState(false);

  const handleClick = () => {
    setAddressClicked(true);
  };
  return (
    <>
    <div style={{ backgroundColor: "#015b19", color: "white", padding: "10px 0" }}>
      <Container className="d-flex justify-content-between align-items-center">
       
        <div className="d-flex align-items-center gap-3">
          <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
          <img src="/media/MysuruOilsLogo.png" alt="logo" height="70" style={{marginLeft:"-100px"}}  /> </Link>
        </div>

        {/* Center - Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>
          <FaCheckCircle color="#d3b353" />
          <Link to="/login" style={{textDecoration:"none", color:"inherit"}}>
          <span style={{ fontWeight: "500", fontFamily:"poppins" }}>LOGIN</span></Link>
          <span style={{ color: "gray" }}>—</span>
          <Link 
      to="/checkout" 
      onClick={handleClick} 
      style={{ textDecoration: "none", color: "inherit" }}
    >
        {addressClicked && <FaCheckCircle color="#d3b353" style={{ marginRight: "5px" }} />}
      <span style={{ fontFamily: "poppins", fontWeight: "500" }}>
        ADDRESS 
      </span>
    </Link>
          <span style={{ color: "gray" }}>—</span>
           <Link to="/checkout" style={{textDecoration:"none", color:"inherit"}}>
          <span style={{fontFamily:"poppins", fontWeight:"500"}}>PAYMENT</span></Link>
        </div>

        {/* Right - Secure */}
        <div className="d-flex align-items-center gap-2" style={{ fontSize: "14px" }}>
          <span style={{fontFamily:"poppins", fontWeight:"500", marginRight:"-120px"}}>100% SECURE</span>
          <FaShieldAlt color="#d3b353" />
        </div>
      </Container>
    </div>
    <NavbarCartIcon/>
    </>
  );
};

export default NavbarMenu;
