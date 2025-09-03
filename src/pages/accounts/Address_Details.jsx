import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import NavbarMenu from "../../components/NavMenuBar";
import {
  addressStore,
  normalizeFormToStorage,
  splitStorageToForm,
} from "../AddressStore";

export default function Address_Details() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  const [address, setAddress] = useState({
    email: "",
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

  useEffect(() => {
    const list = addressStore.getAll();
    setSavedAddresses(list);

    let sel = addressStore.getSelected();
    if (!sel && list.length) sel = list[list.length - 1];
    setSelected(sel || null);

    // If we have a selection, prefill; otherwise use last draft
    if (sel) {
      const form = splitStorageToForm(sel);
      if (form) setAddress((prev) => ({ ...prev, ...form }));
      setShowForm(false);
    } else {
      const draft = addressStore.readDraft();
      setAddress((prev) => ({ ...prev, ...draft }));
      setShowForm(true);
    }
  }, []);

  const getAddrId = (a) => a?._id || a?.id;

{/*}  const handleChange = (e) => {
    const next = { ...address, [e.target.name]: e.target.value };
    setAddress(next);
    addressStore.saveDraft(next); // keep draft synced
  };*/}

  const phone10 = /^[0-9]{10}$/;
  const [phoneError, setPhoneError] = useState("");

   const handleChange = (e) => {
  const { name, value } = e.target;
  const next = { ...address, [e.target.name]: e.target.value };
    setAddress(next);
    addressStore.saveDraft(next); // keep draft synced

  if (name === "mobilenumber") {
    // keep digits only and hard-limit to 10
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setFormData((p) => ({ ...p, [name]: digits }));
    setPhoneError(phone10.test(digits) ? "" : "Enter exactly 10 digits");
    return;
  }

  setFormData((p) => ({ ...p, [name]: value }));
};

  const resetForm = () => {
    setAddress({
      email: address.email || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.firstName || !address.lastName || !address.phoneNumber || !address.address1 || !address.city || !address.state || !address.pincode || !address.country) {
      alert("Please fill all required fields.");
      return;
    }

    // Save in the shared store & select it
    const saved = addressStore.upsertFromForm(address, { select: true });
    setSavedAddresses(addressStore.getAll());
    setSelected(saved);
    setShowForm(false);
    alert("✅ Address saved!");
  };

  const handleDeleteAddress = (addr) => {
    const updated = addressStore.removeById(getAddrId(addr));
    setSavedAddresses(updated);
    setSelected(addressStore.getSelected());
  };

  const handleSetDefault = (addr) => {
    addressStore.select(addr);
    setSelected(addressStore.getSelected());
    alert("Default address updated for Checkout.");
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
                <Col md={12}>
                  <Form.Control type="email" placeholder="Email" name="email" value={address.email} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
                </Col>
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
                   <Form.Group controlId="mobilenumber">
                    
                    <Form.Control className="mb-3"
                      type="tel"
                      inputMode="numeric"
                      name="phoneNumber"
                      placeholder="Mobile Number"
                      value={address.phoneNumber}
                      onChange={handleChange}
                      onBlur={(e) => setPhoneError(phone10.test(e.target.value) ? "" : "Enter exactly 10 digits")}
                      required
                      maxLength={10}
                      pattern="^[0-9]{10}$"
                      title="Enter valid phone number"
                      isInvalid={!!phoneError}
                      style={{ fontFamily: "poppins" }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {phoneError || "Enter exactly 10 digits."}
                    </Form.Control.Feedback>
                  </Form.Group>
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
                  <Form.Control type="text" placeholder="Country" name="country" value={address.country} onChange={handleChange} required style={{ fontFamily: "Poppins" }} />
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
          <Row className="g-2" style={{ width: "70%" }}>
            {savedAddresses.map((addr) => {
              const n = splitStorageToForm(addr);
              const isDefault = getAddrId(selected) === getAddrId(addr);
              return (
                <Col md={6} key={getAddrId(addr)}>
                  <Card style={{ backgroundColor: "#FFF3E7", padding: "15px", border: "1px solid #ddd" }}>
                    <p style={{ margin: "0", fontFamily: "Poppins", fontWeight: "500" }}>
                      {n.firstName} {n.lastName}
                    </p>
                    <p style={{ margin: "0", fontSize: "14px" }}>{n.phoneCode}{n.phoneNumber}</p>
                    <p style={{ margin: "0", fontSize: "14px" }}>{(n.address1 + " " + n.address2).trim()}</p>
                    <p style={{ margin: "0", fontSize: "14px" }}>{n.city}, {n.state} - {n.pincode}</p>
                    <p style={{ margin: "0", fontSize: "14px" }}>{n.country}</p>

                    {isDefault && (
                      <p style={{ color: "green", fontSize: "13px", margin: "5px 0 0" }}>
                        Default Address
                      </p>
                    )}

                    <div className="mt-2 d-flex justify-content-between">
                      <Button
                        variant="link"
                        onClick={() => handleDeleteAddress(addr)}
                        style={{ fontSize: "13px", padding: "0", color: "#D9534F" }}
                      >
                        Delete
                      </Button>
                      {!isDefault && (
                        <Button
                          variant="link"
                          onClick={() => handleSetDefault(addr)}
                          style={{ fontSize: "13px", padding: "0", color: "#0d6efd" }}
                        >
                          Set as Default
                        </Button>
                      )}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}
