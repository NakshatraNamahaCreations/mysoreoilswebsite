{/*import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar_Menu from "../../components/Navbar_Menu";
import FooterOne from "../../components/FooterOne";

export default function ProfileDetails() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      setFormData({
        firstname: storedUser.firstname || "",
        lastname: storedUser.lastname || "",
        email: storedUser.email || "",
        mobilenumber: storedUser.mobilenumber || "",
        password: storedUser.password || "",
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(formData));
    alert("Profile updated successfully!");
    navigate("/account");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <>
      <Navbar_Menu />
      <Container className="py-5" style={{ maxWidth: "1140px" }}>
        <Row>
          {/* Sidebar */}
         {/*} <Col md={3}>
            <div style={{ borderRight: "1px solid #ddd", paddingRight: "10px" }}>
              <div style={{ fontFamily: "Poppins", fontSize: "16px", padding: "15px 0", cursor: "pointer" }} onClick={() => navigate("/profile-details")}>Profile &gt;</div>
              <div style={{ fontFamily: "Poppins", fontSize: "16px", padding: "15px 0", cursor: "pointer" }} onClick={() => navigate("/order-details")}>Orders &gt;</div>
              <div style={{ fontFamily: "Poppins", fontSize: "16px", padding: "15px 0", cursor: "pointer" }} onClick={() => navigate("/wishlist")}>Wishlist &gt;</div>
              <div style={{ fontFamily: "Poppins", fontSize: "16px", padding: "15px 0", cursor: "pointer" }} onClick={() => navigate("/address-details")}>Address Book &gt;</div>
              <div style={{ fontFamily: "Poppins", fontSize: "16px", padding: "15px 0", cursor: "pointer" }} onClick={handleLogout}>Log Out &gt;</div>
            </div>
          </Col>

          {/* Profile Form */}
         {/*} <Col md={9}>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: "600", marginBottom: "30px" }}>Your Profile</h2>
            <Form>
              <Row className="mb-4">
                <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>First Name</Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    style={{ fontFamily: "Poppins", border: "none", borderBottom: "1px solid #ddd", borderRadius: "0" }}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>Last Name</Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    style={{ fontFamily: "Poppins", border: "none", borderBottom: "1px solid #ddd", borderRadius: "0" }}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>Email</Col>
                <Col md={9}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    style={{ fontFamily: "Poppins", border: "none", borderBottom: "1px solid #ddd", borderRadius: "0", background: "#fff" }}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>Mobile</Col>
                <Col md={9}>
                  <Form.Control
                    type="text"
                    name="mobilenumber"
                    value={formData.mobilenumber}
                    onChange={handleChange}
                    style={{ fontFamily: "Poppins", border: "none", borderBottom: "1px solid #ddd", borderRadius: "0" }}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>Password</Col>
                <Col md={9}>
                  <Form.Control
                    type="password"
                    name="password"
                    value="************"
                    onChange={handleChange}
                    style={{ fontFamily: "Poppins", border: "none", borderBottom: "1px solid #ddd", borderRadius: "0" }}
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end">
                <Button
                  style={{ backgroundColor: "#d3b353", border: "none", fontFamily: "Poppins", padding: "10px 25px", fontSize: "16px" }}
                  onClick={handleSave}
                >
                  SAVE CHANGES
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      {/*footer section */}
    {/*}  <FooterOne/>
    </>
  );
}*/}

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Navbar_Menu from "../../components/Navbar_Menu";
import FooterOne from "../../components/FooterOne";
import { Breadcrumb } from "react-bootstrap";

export default function ProfileDetails() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [actualPassword, setActualPassword] = useState("");

  const navigate = useNavigate();

 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setFormData((prev) => ({
      ...prev,
      firstname: storedUser.firstname || "",
      lastname: storedUser.lastname || "",
      email: storedUser.email || "",
      mobilenumber: storedUser.mobilenumber || storedUser.phone || "",
      password: storedUser.password || "",
    }));
    setActualPassword(storedUser.password || "");
  }
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setActualPassword(value); // Update actual password
      setFormData({ ...formData, [name]: showPassword ? value : "************" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    const updatedUser = { ...JSON.parse(localStorage.getItem("user")), ...formData, password: actualPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
    navigate("/account");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <Navbar_Menu />
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
        Profile Details
      </Breadcrumb.Item>
      
    </Breadcrumb>
  </div>
        </Container> 
      <Container className="py-5" style={{ maxWidth: "1140px" }}>
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <div style={{ borderRight: "1px solid #ddd", paddingRight: "10px" }}>
              <div style={sidebarItemStyle} onClick={() => navigate("/profile-details")}>Profile &gt;</div>
              <div style={sidebarItemStyle} onClick={() => navigate("/order-details")}>Orders &gt;</div>
              <div style={sidebarItemStyle} onClick={() => navigate("/wishlist")}>Wishlist &gt;</div>
              <div style={sidebarItemStyle} onClick={() => navigate("/address-details")}>Address Book &gt;</div>
              <div style={sidebarItemStyle} onClick={handleLogout}>Log Out &gt;</div>
            </div>
          </Col>

          {/* Profile Form */}
          <Col md={9}>
            <h2 style={{ fontFamily: "Montserrat", fontWeight: "600", marginBottom: "30px" }}>Your Profile</h2>
            <Form>
              {renderInputRow("First Name", "firstname", formData.firstname, handleChange)}
              {renderInputRow("Last Name", "lastname", formData.lastname, handleChange)}
              {renderInputRow("Email", "email", formData.email, handleChange, true)}
              {renderInputRow("Mobile", "mobilenumber", formData.mobilenumber, handleChange)}

             <Row className="mb-4">
  <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>Password</Col>
  <Col md={9}>
    <Form.Control
      type="text"
      value="************"  // Static Masked Display
      readOnly
      style={{
        fontFamily: "Poppins",
        border: "none",
        borderBottom: "1px solid #ddd",
        borderRadius: "0",
        backgroundColor: "#fff"
      }}
    />
  </Col>
</Row>



              <div className="d-flex justify-content-end">
                <Button
                  style={{ backgroundColor: "#d3b353", border: "none", fontFamily: "Poppins", padding: "10px 25px", fontSize: "16px" }}
                  onClick={handleSave}
                >
                  SAVE CHANGES
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <FooterOne />
    </>
  );
}

const sidebarItemStyle = {
  fontFamily: "Poppins",
  fontSize: "16px",
  padding: "15px 0",
  cursor: "pointer"
};

// Helper Function for Input Rows (Excluding Password Row)
const renderInputRow = (label, name, value, onChange, readOnly = false, type = "text") => (
  <Row className="mb-4" key={name}>
    <Col md={3} style={{ fontFamily: "Poppins", fontWeight: "500" }}>{label}</Col>
    <Col md={9}>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        style={{ fontFamily: "Poppins", border: "none", borderBottom: "1px solid #ddd", borderRadius: "0", background: readOnly ? "#fff" : "transparent" }}
      />
    </Col>
  </Row>
);
