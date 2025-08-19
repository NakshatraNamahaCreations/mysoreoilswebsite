{/*import Accordion from "react-bootstrap/Accordion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

export default function Address_Details() {
 {/*} const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]); // Changed to array

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phoneCode: "+91",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "", // Added country field
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const fetchAddresses = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.email) return;

    try {
      const res = await axios.get(
        `http://localhost:8011/api/addresses/email/${storedUser.email}`
      );

      if (res.data && res.data.length > 0) {
        setSavedAddresses(res.data);
        setShowForm(false); // Hide form if addresses exist
      } else {
        setSavedAddresses([]);
        setShowForm(true); // Show form if no addresses exist
      }
    } catch (err) {
      console.error("❌ Failed to fetch addresses:", err.response?.data || err.message);
      setShowForm(true);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser?.email) {
      alert("User not logged in.");
      return;
    }

    const payload = {
      firstName: address.firstName,
      lastName: address.lastName,
      email: storedUser.email,
      mobileNumber: `${address.phoneCode}${address.phoneNumber}`,
      state: address.state,
      city: address.city,
      address: `${address.address1} ${address.address2 || ""}`.trim(),
      pincode: address.pincode,
      country: address.country, // Include country in payload
    };

    try {
      const response = await axios.post("http://localhost:8011/api/addresses", payload);
      alert("✅ Address added successfully!");
      setSavedAddresses([...savedAddresses, response.data.address]); // Use backend response
      setShowForm(false); // Hide form after saving
      handleCancel(); // Reset form fields
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    setAddress({
      firstName: "",
      lastName: "",
      phoneCode: "+91",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };*/}

  {/*const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phoneCode: "+91",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const fetchAddresses = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const allAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

    if (!storedUser?.email) return;

    const userAddresses = allAddresses.filter(a => a.email === storedUser.email);
    if (userAddresses.length > 0) {
      setSavedAddresses(userAddresses);
      setShowForm(false);
    } else {
      setSavedAddresses([]);
      setShowForm(true);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.email) {
      alert("User not logged in.");
      return;
    }

    const newAddress = {
      firstName: address.firstName,
      lastName: address.lastName,
      email: storedUser.email,
      mobileNumber: `${address.phoneCode}${address.phoneNumber}`,
      state: address.state,
      city: address.city,
      address: `${address.address1} ${address.address2 || ""}`.trim(),
      pincode: address.pincode,
      country: address.country,
    };

    const existingAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const updatedAddresses = [...existingAddresses, newAddress];

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    setSavedAddresses(updatedAddresses.filter(a => a.email === storedUser.email));
    setShowForm(false);
    handleCancel();
    setShowSuccessModal(true);
    alert("✅ Address added successfully!");
  navigate("/carts");
  };

  const handleCancel = () => {
    setAddress({
      firstName: "",
      lastName: "",
      phoneCode: "+91",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  const handleDeleteAddress = (addrToDelete) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser?.email) return;

  const existingAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
  const updatedAddresses = existingAddresses.filter(
    (addr) =>
      !(
        addr.email === storedUser.email &&
        addr.firstName === addrToDelete.firstName &&
        addr.lastName === addrToDelete.lastName &&
        addr.mobileNumber === addrToDelete.mobileNumber &&
        addr.address === addrToDelete.address
      )
  );

  localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  setSavedAddresses(updatedAddresses.filter((a) => a.email === storedUser.email));
};


  return (
    <Container>
      <Accordion>
        <Accordion.Item
          eventKey="2"
          style={{ boxShadow: "1px 1px 6px #D3B353", border: "none" }}
        >
          <Accordion.Header className="custom-header">
            <span
              style={{
                color: "#002209",
                fontSize: "22px",
                fontWeight: "700",
                fontFamily:"montserrat"
              }}
            >
              Your Address
            </span>
          </Accordion.Header>
          <Accordion.Body className="custom-header">
            <div className="form-container p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5
                  style={{
                    color: "#002209",
                    textTransform: "uppercase",
                    fontSize: "28px",
                    letterSpacing: "1px",
                    fontWeight: "600",
                    fontFamily:"montserrat"
                  }}
                >
                  Address Details
                </h5>
                <Button
                  variant="outline-dark"
                  onClick={() => setShowForm(!showForm)}
                  style={{ fontSize: "16px", fontWeight: "600" }}
                >
                  {showForm ? "Hide Form" : "Add Address"}
                </Button>
              </div>

              {showForm && (
                <Form
                  onSubmit={handleSubmit}
                  style={{ fontSize: "20px", color: "#002209" }}
                >
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="Enter First Name"
                          value={address.firstName}
                          onChange={handleChange}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          required
                          className="input-addressdetails search-input"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Enter Last Name"
                          value={address.lastName}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          onChange={handleChange}
                          required
                          className="input-addressdetails search-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    <Col md={4}>
                      <Form.Group controlId="phoneCode">
                        <Form.Control
                          as="select"
                          name="phoneCode"
                          value={address.phoneCode}
                          onChange={handleChange}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          required
                          className="input-addressdetails search-input"
                        >
                          <option value="+1">+1 (USA)</option>
                          <option value="+91">+91 (India)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+61">+61 (Australia)</option>
                          <option value="+81">+81 (Japan)</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col md={8}>
                      <Form.Group controlId="phoneNumber">
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          placeholder="Enter Phone Number"
                          value={address.phoneNumber}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          onChange={handleChange}
                          required
                          className="input-addressdetails search-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="address1" className="mt-3">
                    <Form.Control
                      type="text"
                      name="address1"
                      placeholder="Enter Address Line 1"
                      value={address.address1}
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                      }}
                      onChange={handleChange}
                      required
                      className="input-addressdetails search-input"
                    />
                  </Form.Group>

                  <Form.Group controlId="address2" className="mt-3">
                    <Form.Control
                      type="text"
                      name="address2"
                      placeholder="Enter Address Line 2 (Optional)"
                      value={address.address2}
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                      }}
                      onChange={handleChange}
                      className="input-addressdetails search-input"
                    />
                  </Form.Group>

                  <Row className="mt-3">
                    <Col md={4}>
                      <Form.Group controlId="city">
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="Enter Your City"
                          value={address.city}
                          onChange={handleChange}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          required
                          className="input-addressdetails search-input"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="state">
                        <Form.Control
                          type="text"
                          name="state"
                          placeholder="Enter Your State"
                          value={address.state}
                          onChange={handleChange}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          required
                          className="input-addressdetails search-input"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="pincode">
                        <Form.Control
                          type="text"
                          name="pincode"
                          placeholder="Enter Pincode"
                          value={address.pincode}
                          onChange={handleChange}
                          style={{
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                            border: "1px solid lightgray",
                          }}
                          required
                          className="input-addressdetails search-input"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group controlId="country" className="mt-3">
                    <Form.Control
                      as="select"
                      name="country"
                      value={address.country}
                      onChange={handleChange}
                      style={{
                        fontSize: "16px",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: "#ffffff",
                        border: "1px solid lightgray",
                      }}
                      required
                      className="input-addressdetails search-input"
                    >
                      <option value="">Select Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="India">India</option>
                      <option value="Australia">Australia</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Japan">Japan</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                    </Form.Control>
                  </Form.Group>

                  <div className="d-flex justify-content-between mt-3 flex-wrap">
                    <Button
                      type="submit"
                      variant="outline-success"
                      className="mb-2 address-Btn"
                      style={{ fontSize: "18px", letterSpacing: "1px", color: "#002209", fontFamily:"montserrat", fontWeight:"bold" }}
                    >
                      ADD ADDRESS
                    </Button>

                    <div>
                      <Button
                        variant="outline-success"
                        onClick={handleCancel}
                        className="me-2 mb-2 address-Btn"
                        style={{
                          color: "#002209",
                          fontSize: "20px",
                          letterSpacing: "1px",
                          fontFamily:"montserrat",
                          fontWeight:"600"
                        }}
                      >
                        Reset
                      </Button>

                      <Button
                        onClick={() => navigate("/")}
                        variant="outline-success"
                        className="mb-2 address-Btn"
                        style={{
                          color: "#002209",
                          fontSize: "20px",
                          letterSpacing: "1px",
                          fontFamily:"montserrat",
                          fontWeight:"600"
                        }}
                      >
                        Cancel
                      </Button>

                      
                    </div>
                  </div>
                </Form>
              )}

              {savedAddresses.length > 0 && !showForm && (
                <div className="mt-4">
                  <h5 style={{ color: "#002209" }}>Saved Addresses</h5>
                  <Row>
                    {savedAddresses.map((addr) => (
                      <Col md={6} key={addr._id} className="mb-3">
                        <Card className="p-3 shadow-sm border-0" style={{ background: "#f8f9fa" }}>
                          <p>{addr.firstName} {addr.lastName}</p>
                          <p>{addr.email}</p>
                          <p>{addr.mobileNumber}</p>
                          <p>{addr.address}</p>
                          <p>{addr.city}, {addr.state}, {addr.pincode}</p>
                          <p>{addr.country}</p>
                           <Button
                            variant="danger"
                            onClick={() => handleDeleteAddress(addr)}
                            style={{ fontSize: "14px", fontWeight: "600", marginTop: "10px" }}
                          >
                            Delete Address
                          </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}*/}

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import NavbarMenu from "../../components/NavMenuBar";

export default function Address_Details() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phoneCode: "+91",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  // Fetch addresses & default address on mount
  useEffect(() => {
    fetchAddresses();
    const defaultAddr = JSON.parse(localStorage.getItem("userAddress"));
    setDefaultAddress(defaultAddr);
  }, []);

  const fetchAddresses = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const allAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    if (!storedUser?.email) return;
    const userAddresses = allAddresses.filter(a => a.email === storedUser.email);
    setSavedAddresses(userAddresses);
    setShowForm(userAddresses.length === 0);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.email) return;

    const newAddress = {
      firstName: address.firstName,
      lastName: address.lastName,
      email: storedUser.email,
      mobileNumber: `${address.phoneCode}${address.phoneNumber}`,
      state: address.state,
      city: address.city,
      address: `${address.address1} ${address.address2}`.trim(),
      pincode: address.pincode,
      country: address.country,
    };

    const existingAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const updatedAddresses = [...existingAddresses, newAddress];

    // Save in addresses list
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    // Also set as default address for checkout
    localStorage.setItem("userAddress", JSON.stringify(newAddress));
    setDefaultAddress(newAddress);

    fetchAddresses();
    resetForm();
    alert("✅ Address added successfully!");
  };

  const handleDeleteAddress = (addrToDelete) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser?.email) return;

    const existingAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const updatedAddresses = existingAddresses.filter(
      addr =>
        !(
          addr.email === addrToDelete.email &&
          addr.mobileNumber === addrToDelete.mobileNumber &&
          addr.address === addrToDelete.address
        )
    );

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

    // If deleted address is default → remove default
    const currentDefault = JSON.parse(localStorage.getItem("userAddress"));
    if (
      currentDefault &&
      currentDefault.mobileNumber === addrToDelete.mobileNumber &&
      currentDefault.address === addrToDelete.address
    ) {
      localStorage.removeItem("userAddress");
      setDefaultAddress(null);
    }

    fetchAddresses();
  };

  const handleSetDefault = (addr) => {
    localStorage.setItem("userAddress", JSON.stringify(addr));
    setDefaultAddress(addr);
    alert("Default address updated for Checkout.");
  };

  const resetForm = () => {
    setAddress({
      firstName: "",
      lastName: "",
      phoneCode: "+91",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  return (
    <>
      <NavbarMenu />
      <Container style={{ maxWidth: "900px", marginTop: "30px" }} className="d-flex justify-content-between align-items-center flex-column">
        <div className="d-flex justify-content-between align-items-center mb-4" style={{ width: "70%" }}>
          <h4 style={{ fontFamily: "Montserrat", fontWeight: "600", color: "#002209" }}>
            Address Book
          </h4>
          <Button
            variant="outline-dark"
            onClick={() => setShowForm(!showForm)}
            style={{ fontSize: "14px", fontWeight: "500", fontFamily: "Poppins" }}
          >
            {showForm ? "Hide Form" : "Add New Address"}
          </Button>
        </div>

        {showForm && (
          <Card className="p-4 mb-4" style={{ border: "1px solid #ddd", borderRadius: "10px", width: "70%" }}>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Control type="text" placeholder="First Name" name="firstName" value={address.firstName} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={6}>
                  <Form.Control type="text" placeholder="Last Name" name="lastName" value={address.lastName} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={4}>
                  <Form.Select name="phoneCode" value={address.phoneCode} onChange={handleChange} required style={{ fontFamily: "Poppins" }}>
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                  </Form.Select>
                </Col>
                <Col md={8}>
                  <Form.Control type="text" placeholder="Phone Number" name="phoneNumber" value={address.phoneNumber} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={12}>
                  <Form.Control type="text" placeholder="Address Line 1" name="address1" value={address.address1} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={12}>
                  <Form.Control type="text" placeholder="Address Line 2 (Optional)" name="address2" value={address.address2} onChange={handleChange} style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={4}>
                  <Form.Control type="text" placeholder="City" name="city" value={address.city} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={4}>
                  <Form.Control type="text" placeholder="State" name="state" value={address.state} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={4}>
                  <Form.Control type="text" placeholder="Pincode" name="pincode" value={address.pincode} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
                <Col md={12}>
                  <Form.Select name="country" value={address.country} onChange={handleChange} required style={{ fontFamily: "Poppins" }}>
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </Form.Select>
                </Col>
              </Row>
              <div className="mt-3 d-flex justify-content-end gap-3">
                <Button type="submit" variant="dark" style={{ fontSize: "14px", fontWeight: "500", fontFamily: "Poppins" }}>
                  Save Address
                </Button>
                <Button variant="outline-secondary" onClick={resetForm} style={{ fontSize: "14px", fontFamily: "Poppins" }}>
                  Reset
                </Button>
              </div>
            </Form>
          </Card>
        )}

        {/* Saved Addresses */}
        {savedAddresses.length > 0 && (
          <Row className="g-3" style={{ width: "70%" }}>
            {savedAddresses.map((addr, idx) => (
              <Col md={6} key={idx}>
                <Card style={{ backgroundColor: "#FFF3E7", padding: "15px", border: "1px solid #ddd" }}>
                  <p style={{ margin: "0", fontFamily: "Poppins", fontWeight: "500" }}>{addr.firstName} {addr.lastName}</p>
                  <p style={{ margin: "0", fontSize: "14px" }}>{addr.mobileNumber}</p>
                  <p style={{ margin: "0", fontSize: "14px" }}>{addr.address}</p>
                  <p style={{ margin: "0", fontSize: "14px" }}>{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p style={{ margin: "0", fontSize: "14px" }}>{addr.country}</p>

                  {/* Default Address Tag */}
                  {defaultAddress && addr.mobileNumber === defaultAddress.mobileNumber && addr.address === defaultAddress.address && (
                    <p style={{ color: "green", fontSize: "13px", margin: "5px 0 0" }}>Default Address</p>
                  )}

                  <div className="mt-2 d-flex justify-content-between">
                    <Button variant="link" onClick={() => handleDeleteAddress(addr)} style={{ fontSize: "13px", padding: "0", color: "#D9534F" }}>
                      Delete
                    </Button>
                    {(!defaultAddress || defaultAddress.mobileNumber !== addr.mobileNumber || defaultAddress.address !== addr.address) && (
                      <Button variant="link" onClick={() => handleSetDefault(addr)} style={{ fontSize: "13px", padding: "0", color: "#0d6efd" }}>
                        Set as Default
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
