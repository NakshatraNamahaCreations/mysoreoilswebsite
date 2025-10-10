{/*import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import NavbarMenu from "../../components/NavMenuBar";
import {
  addressStore,
  splitStorageToForm,
  normalizeBackendToStorage, // (not used directly, but handy if needed)
} from "../AddressStore"

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isEditing, setIsEditing] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

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

  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---- Pricing helpers ----
  const toNum = (v) => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const unitSellingPrice = (item) =>
    toNum(item.discountedPrice ?? item.discountPrice ?? item.price ?? item.originalPrice);

  const lineQty = (item) => Math.max(1, toNum(item.quantity));

  const cartToApiItems = (items = []) =>
    (items || []).map((item) => ({
      productName: item.name || "",
      productImage: item.image || "",
      price: unitSellingPrice(item),
      quantity: lineQty(item),
      weight: item.weight || "",
      unit: item.unit || "",
    }));

  const apiItems = cartToApiItems(cartItems);
  const subtotal = apiItems.reduce((sum, it) => sum + toNum(it.price) * toNum(it.quantity), 0);
  const shipping = 0;
  const gst = 0;
  const total = subtotal + shipping + gst;

  const getAddrId = (a) => a?._id || a?.id;

  // ---- Load from shared store on mount ----
  useEffect(() => {
    const list = addressStore.getAll();
    setSavedAddresses(list);

    let sel = addressStore.getSelected();
    if (!sel && list.length) sel = list[list.length - 1];

    if (sel) {
      setSelectedAddress(sel);
      const form = splitStorageToForm(sel);
      if (form) setAddress((prev) => ({ ...prev, ...form }));
      setIsEditing(false);
    } else {
      // no selection → hydrate with draft if present
      const draft = addressStore.readDraft();
      setAddress((prev) => ({ ...prev, ...draft }));
    }
  }, []);

  const phone10 = /^[0-9]{10}$/;
  const [phoneError, setPhoneError] = useState("");

  // Persist draft as user types
  {/*const handleChange = (e) => {
    const next = { ...address, [e.target.name]: e.target.value };
    setAddress(next);
    addressStore.saveDraft(next);
  };*/}

   {/*const handleChange = (e) => {
  const { name, value } = e.target;
      const next = { ...address, [e.target.name]: e.target.value };
    setAddress(next);
    addressStore.saveDraft(next);

  if (name === "phonenumber") {
    // keep digits only and hard-limit to 10
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setAddress((p) => ({ ...p, [name]: digits }));
    setPhoneError(phone10.test(digits) ? "" : "Enter exactly 10 digits");
    return;
  }

  setAddress((p) => ({ ...p, [name]: value }));
};

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    const form = splitStorageToForm(addr);
    if (form) setAddress((prev) => ({ ...prev, ...form }));
    setIsEditing(false);
    setEditingAddressId(null);
    addressStore.select(addr);
  };

  const handleAddAddress = () => {
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
    setSaveAddress(false);
    setIsEditing(true);
    setEditingAddressId(null);
  };

  const handleEditClick = (addr) => {
    const n = splitStorageToForm(addr);
    setAddress({
      email: n.email || "",
      firstName: n.firstName || "",
      lastName: n.lastName || "",
      phoneCode: n.phoneCode || "+91",
      phoneNumber: n.phoneNumber || "",
      address1: n.address1 || "",
      address2: n.address2 || "",
      city: n.city || "",
      state: n.state || "",
      pincode: n.pincode || "",
      country: n.country || "",
      _id: n._id,
    });
    setSaveAddress(true);
    setIsEditing(true);
    setEditingAddressId(getAddrId(addr) || null);
  };

  const handleCancel = () => {
    if (selectedAddress) {
      handleSelectAddress(selectedAddress);
      setSaveAddress(false);
    } else {
      handleAddAddress();
    }
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!saveAddress) {
      alert("Please check 'Save address' to save the address.");
      return;
    }
    if (!address.email) {
      alert("Email is required to save the address.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        mobileNumber: `${address.phoneCode}${address.phoneNumber}`,
        state: address.state,
        city: address.city,
        address: `${address.address1} ${address.address2 || ""}`.trim(),
        pincode: address.pincode,
        country: address.country,
      };

      let response;
      if (editingAddressId) {
        response = await axios.put(
          `https://api.themysoreoils.com/api/addresses/${editingAddressId}`,
          payload
        );
      } else {
        response = await axios.post(
          "https://api.themysoreoils.com/api/addresses",
          payload
        );
      }

      if (response.status === 200 || response.status === 201) {
        const saved = addressStore.upsertFromBackend(response.data.address, { select: true });
        setSavedAddresses(addressStore.getAll());
        setSelectedAddress(saved);
        setIsEditing(false);
        setEditingAddressId(null);
        alert(editingAddressId ? "Address updated successfully!" : "Address saved successfully!");
      } else {
        alert(`Failed to ${editingAddressId ? "update" : "save"} address. Please try again.`);
      }
    } catch (error) {
      console.error(`Address ${editingAddressId ? "update" : "save"} error:`, error);
      alert("An error occurred while saving the address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = (id) => {
    const updated = addressStore.removeById(id);
    setSavedAddresses(updated);
    setSelectedAddress(addressStore.getSelected());
    alert("Address deleted successfully!");
  };

  const handlePayNow = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add items to proceed.");
      navigate("/categories");
      return;
    }
    const sel = addressStore.getSelected();
    if (!sel || !getAddrId(sel)) {
      alert("Please select or add a valid address before proceeding to payment.");
      return;
    }

    setIsLoading(true);
    try {
      const items = cartToApiItems(cartItems);
      const computedSubtotal = items.reduce(
        (sum, it) => sum + toNum(it.price) * toNum(it.quantity),
        0
      );
      const shippingFee = 0;
      const grandTotal = computedSubtotal + shippingFee;

      const paymentResponse = await axios.post(
        "https://api.themysoreoils.com/api/payment/initiate",
        {
          amount: Math.round(grandTotal),
          callbackUrl: "https://api.themysoreoils.com/api/payment-failed",
          items,
          addressId: getAddrId(sel),
        }
      );

      const redirectUrl =
        paymentResponse?.data?.phonepeResponse?.redirectUrl ||
        paymentResponse?.data?.redirectUrl;

      if (redirectUrl) {
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({ items, grandTotal, selectedAddress: sel })
        );
        window.location.href = redirectUrl;
      } else {
        setIsLoading(false);
        alert("Payment initiation failed. No redirect URL.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err?.response?.data || err);
      setIsLoading(false);
      alert("Error initiating payment.");
    }
  };

  return (
    <>
      <NavbarMenu />
      <Container className="mt-4">
        <Row>
          {/* Left Section */}
         {/*} <Col md={6} style={{ marginBottom: "30px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontFamily: "poppins", fontWeight: 600 }}>Enter Delivery Address</h4>
              <div className="d-flex gap-2">
                {!isEditing && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleAddAddress}
                    style={{ fontFamily: "poppins" }}
                  >
                    + Add Address
                  </Button>
                )}
              </div>
            </div>

            {/* Saved addresses list */}
          {/*}  {!isEditing && savedAddresses.length > 0 && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 style={{ fontFamily: "poppins", margin: 0 }}>Choose a saved address</h5>
                </div>

                {savedAddresses.map((addr) => {
                  const isSelected = (getAddrId(selectedAddress) === getAddrId(addr));
                  const n = splitStorageToForm(addr);
                  return (
                    <Card
                      key={getAddrId(addr)}
                      className="mb-2"
                      style={isSelected ? { borderColor: "#28a745" } : {}}
                    >
                      <Card.Body className="d-flex justify-content-between">
                        <div style={{ fontFamily: "poppins", fontSize: "15px" }}>
                          <Form.Check
                            type="radio"
                            name="savedAddress"
                            id={`addr-${getAddrId(addr)}`}
                            checked={isSelected}
                            onChange={() => handleSelectAddress(addr)}
                            className="mb-2"
                            label={
                              <>
                                <strong>{n.firstName} {n.lastName}</strong><br />
                                {(n.address1 + " " + n.address2).trim()}<br />
                                {n.city}, {n.state} - {n.pincode}<br />
                                {n.country}<br />
                                Phone: {n.phoneCode}{n.phoneNumber}<br />
                                Email: {n.email}
                              </>
                            }
                          />
                        </div>

                        <div className="d-flex align-items-start gap-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleEditClick(addr)}
                            style={{ fontFamily: "poppins" }}
                          >
                            Edit
                          </Button>

                          <Button
                            className="ms-2"
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteAddress(getAddrId(addr))}
                            style={{ fontFamily: "poppins" }}
                            disabled={isLoading}
                          >
                            Delete
                          </Button>

                         {/*} {!isSelected && (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleSelectAddress(addr)}
                              style={{ fontFamily: "poppins" }}
                            >
                              Deliver here
                            </Button>
                          )}*/}
                       {/*} </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </>
            )}

            {/* Address Form */}
         {/*}   {(isEditing || savedAddresses.length === 0) && (
              <Card className="mt-3">
                <Card.Body>
                  <h5 style={{ fontFamily: "poppins" }}>
                    {editingAddressId ? "Edit Address" : "Add New Address"}
                  </h5>
                  <Form onSubmit={handleSubmit}>
                    <Form.Control
                      type="email"
                      className="mb-2"
                      placeholder="Email"
                      name="email"
                      value={address.email}
                      onChange={handleChange}
                      required
                      style={{ fontFamily: "poppins" }}
                    />

                    <Row>
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          className="mb-2"
                          placeholder="First Name"
                          name="firstName"
                          value={address.firstName}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Last Name"
                          name="lastName"
                          value={address.lastName}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Code (+91)"
                          name="phoneCode"
                          value={address.phoneCode}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={8}>
                        <Form.Group controlId="phoneNumber">
  
  <Form.Control
    className="mb-3"
    type="tel"
    inputMode="numeric"
    name="phoneNumber"                 // ✅ match state key
    placeholder="Mobile Number"
    value={address.phoneNumber}        // ✅ from state
    onChange={handleChange}
    onBlur={(e) =>
      setPhoneError(phone10.test(e.target.value) ? "" : "Enter exactly 10 digits")
    }
    required
    maxLength={10}
    pattern="^[0-9]{10}$"
    title="Enter exactly 10 digits"
    isInvalid={!!phoneError}
    style={{ fontFamily: "poppins" }}
  />
  <Form.Control.Feedback type="invalid">
    {phoneError || "Enter exactly 10 digits."}
  </Form.Control.Feedback>
</Form.Group>

                      </Col>
                    </Row>

                    <Form.Control
                      className="mb-2"
                      placeholder="Address Line 1"
                      name="address1"
                      value={address.address1}
                      onChange={handleChange}
                      required
                      style={{ fontFamily: "poppins" }}
                    />
                    <Form.Control
                      className="mb-2"
                      placeholder="Address Line 2"
                      name="address2"
                      value={address.address2}
                      onChange={handleChange}
                      style={{ fontFamily: "poppins" }}
                    />

                    <Row>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="City"
                          name="city"
                          value={address.city}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="State"
                          name="state"
                          value={address.state}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Pincode"
                          name="pincode"
                          value={address.pincode}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Country"
                          name="country"
                          value={address.country}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                    </Row>

                    <Form.Group controlId="saveAddress" className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Save address"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        style={{ fontFamily: "poppins", fontSize: "16px" }}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2 mt-2">
                      {editingAddressId && (
                        <Button variant="outline-secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                      <Button variant="primary" type="submit" disabled={isLoading}>
                        {editingAddressId ? "Update Address" : "Save Address"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={2}></Col>

          {/* Right Section */}
         {/*} <Col md={4}>
            <Card style={{ padding: "20px", backgroundColor: "#fff" }}>
              <Button
                onClick={handlePayNow}
                style={{
                  width: "100%",
                  backgroundColor: "#FFD814",
                  color: "#111",
                  border: "none",
                  fontWeight: "600",
                  padding: "10px",
                  fontFamily: "poppins",
                }}
                disabled={isLoading}
              >
                Deliver to this address
              </Button>

              <div className="mt-4" style={{ fontFamily: "poppins", fontSize: "16px" }}>
                <p><strong>Order Summary:</strong></p>
                {(cartItems ?? []).map((item) => {
                  const sell = unitSellingPrice(item);
                  const qty = lineQty(item);
                  return (
                    <div key={item.id} className="d-flex align-items-start mb-3" style={{ gap: "10px" }}>
                      <div style={{ width: "70px", flexShrink: 0 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "100%", objectFit: "contain", borderRadius: "4px" }}
                        />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <p className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>{item.name}</p>
                        <p className="mb-1" style={{ fontSize: "13px", color: "#666" }}>
                          Qty: {qty}
                          {item.weight && item.unit ? ` • ${item.weight} ${item.unit}` : ""}
                        </p>
                        <p className="mb-0" style={{ fontSize: "13px", color: "#111" }}>
                          Price: ₹{(sell * qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <hr />
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>₹{shipping.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>GST:</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mt-2">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <Button
                  className="mt-3"
                  onClick={() => navigate("/categories")}
                  style={{
                    width: "100%",
                    backgroundColor: "#FFD814",
                    color: "#111",
                    border: "none",
                    fontWeight: "600",
                    padding: "10px",
                    fontFamily: "poppins",
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}*/}


import { Container, Form, Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import NavbarMenu from "../../components/NavMenuBar";
import {
  addressStore,
  splitStorageToForm,
  normalizeBackendToStorage, // (not used directly, but handy if needed)
} from "../AddressStore";
import { Breadcrumb } from "react-bootstrap";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [isEditing, setIsEditing] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

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

  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ---- Pricing helpers ----
  const toNum = (v) => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const unitSellingPrice = (item) =>
    toNum(item.discountedPrice ?? item.discountPrice ?? item.price ?? item.originalPrice);

  const lineQty = (item) => Math.max(1, toNum(item.quantity));

  const cartToApiItems = (items = []) =>
    (items || []).map((item) => ({
      productName: item.name || "",
      productImage: item.image || "",
      price: unitSellingPrice(item),
      quantity: lineQty(item),
      weight: item.weight || "",
      unit: item.unit || "",
    }));

  const apiItems = cartToApiItems(cartItems);
  const subtotal = apiItems.reduce((sum, it) => sum + toNum(it.price) * toNum(it.quantity), 0);
  const shipping = 0;
  const gst = 0;
  const total = subtotal + shipping + gst;

  const getAddrId = (a) => a?._id || a?.id;

  // ---- Load from shared store on mount ----
  useEffect(() => {
    const list = addressStore.getAll();
    setSavedAddresses(list);

    let sel = addressStore.getSelected();
    if (!sel && list.length) sel = list[list.length - 1];

    if (sel) {
      setSelectedAddress(sel);
      const form = splitStorageToForm(sel);
      if (form) setAddress((prev) => ({ ...prev, ...form }));
      setIsEditing(false);
    } else {
      // no selection → hydrate with draft if present
      const draft = addressStore.readDraft();
      setAddress((prev) => ({ ...prev, ...draft }));
    }
  }, []);

  // ---- Phone validation ----
  const phone10 = /^[0-9]{10}$/;
  const [phoneError, setPhoneError] = useState("");

  // Persist draft as user types (with phone sanitization)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 10); // digits-only, max 10
      setAddress((prev) => {
        const next = { ...prev, phoneNumber: digits };
        addressStore.saveDraft(next);
        return next;
      });
      setPhoneError(phone10.test(digits) ? "" : "Enter exactly 10 digits");
      return;
    }

    setAddress((prev) => {
      const next = { ...prev, [name]: value };
      addressStore.saveDraft(next);
      return next;
    });
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    const form = splitStorageToForm(addr);
    if (form) setAddress((prev) => ({ ...prev, ...form }));
    setIsEditing(false);
    setEditingAddressId(null);
    addressStore.select(addr);
  };

  const handleAddAddress = () => {
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
    setSaveAddress(false);
    setIsEditing(true);
    setEditingAddressId(null);
  };

  const handleEditClick = (addr) => {
    const n = splitStorageToForm(addr);
    setAddress({
      email: n.email || "",
      firstName: n.firstName || "",
      lastName: n.lastName || "",
      phoneCode: n.phoneCode || "+91",
      phoneNumber: n.phoneNumber || "",
      address1: n.address1 || "",
      address2: n.address2 || "",
      city: n.city || "",
      state: n.state || "",
      pincode: n.pincode || "",
      country: n.country || "",
      _id: n._id,
    });
    setSaveAddress(true);
    setIsEditing(true);
    setEditingAddressId(getAddrId(addr) || null);
  };

  const handleCancel = () => {
    if (selectedAddress) {
      handleSelectAddress(selectedAddress);
      setSaveAddress(false);
    } else {
      handleAddAddress();
    }
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!saveAddress) {
      alert("Please check 'Save address' to save the address.");
      return;
    }
    if (!address.email) {
      alert("Email is required to save the address.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        firstName: address.firstName,
        lastName: address.lastName,
        email: address.email,
        mobileNumber: `${address.phoneCode}${address.phoneNumber}`,
        state: address.state,
        city: address.city,
        address: `${address.address1} ${address.address2 || ""}`.trim(),
        pincode: address.pincode,
        country: address.country,
      };

      let response;
      if (editingAddressId) {
        response = await axios.put(
          `https://api.themysoreoils.com/api/addresses/${editingAddressId}`,
          payload
        );
      } else {
        response = await axios.post("https://api.themysoreoils.com/api/addresses", payload);
      }

      if (response.status === 200 || response.status === 201) {
        const saved = addressStore.upsertFromBackend(response.data.address, { select: true });
        setSavedAddresses(addressStore.getAll());
        setSelectedAddress(saved);
        setIsEditing(false);
        setEditingAddressId(null);
        alert(editingAddressId ? "Address updated successfully!" : "Address saved successfully!");
      } else {
        alert(`Failed to ${editingAddressId ? "update" : "save"} address. Please try again.`);
      }
    } catch (error) {
      console.error(`Address ${editingAddressId ? "update" : "save"} error:`, error);
      alert("An error occurred while saving the address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = (id) => {
    const updated = addressStore.removeById(id);
    setSavedAddresses(updated);
    setSelectedAddress(addressStore.getSelected());
    alert("Address deleted successfully!");
  };

  // ---- Payment ----
  
const handlePayNow = async () => {
  // Guard rails for invalid cart or address
  if (!cartItems || cartItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    navigate("/categories"); // redirect to categories
    return;
  }

  if (!selectedAddress || !selectedAddress._id) {
    alert("Please select or add a valid address before proceeding to payment.");
    return;
  }

  setIsLoading(true);

  try {
    // Prepare the items array for payment initiation
    const items = cartToApiItems(cartItems);

    // Calculate the total amount
    const computedSubtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const shippingFee = 0;
    const taxAmount = computedSubtotal * 0;
    const grandTotal = computedSubtotal + shippingFee + taxAmount;

    // Initiate the payment
    const paymentResponse = await axios.post(
      "https://api.themysoreoils.com/api/payment/initiate",
      {
        amount: grandTotal, // for testing, replace with grandTotal later
        callbackUrl: "https://themysoreoils.com/thankyou", 
        items,
        addressId: selectedAddress._id, 
      }
    );

    // ✅ Adjust to use merchantTransactionId
    const redirectUrl = paymentResponse.data?.phonepeResponse?.redirectUrl;
    const orderId = 
      paymentResponse.data?.phonepeResponse?.orderId || 
      paymentResponse.data?.phonepeResponse?.merchantTransactionId;

    if (redirectUrl && orderId) {
      // Save order details
      localStorage.setItem(
        "orderDetails",
        JSON.stringify({
          items,
          grandTotal,
          addressId: selectedAddress._id,
          orderId,
        })
      );
      // Redirect to PhonePe payment page
      window.location.href = redirectUrl;
    } else {
      setIsLoading(false);
      alert("Payment initiation failed. No redirect URL.");
    }
  } catch (err) {
    console.error("Payment initiation error:", err.response?.data || err);
    setIsLoading(false);
    alert("Error initiating payment.");
  }
};


{/*}  const handlePayNow = async () => {
  // Guard rails for invalid cart or address
  if (!cartItems || cartItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    navigate("/categories"); // redirect to categories
    return;
  }

  if (!selectedAddress || !selectedAddress._id) {
    alert("Please select or add a valid address before proceeding to payment.");
    return;
  }

  setIsLoading(true);

  try {
    // Prepare the items array for payment initiation
    const items = cartToApiItems(cartItems);

    // Calculate the total amount
    const computedSubtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
    const shippingFee = 0;
    const taxAmount = computedSubtotal * 0.18;
    const grandTotal = computedSubtotal + shippingFee + taxAmount;

    // Initiate the payment first
    const paymentResponse = await axios.post(
      "https://api.themysoreoils.com/api/payment/initiate",
      {
        amount: 1,//grandTotal
        callbackUrl: "https://themysoreoils.com/thankyou", // Adjust callback URL as needed
        items,
         addressId: selectedAddress._id, 
      }
    );

const redirectUrl = paymentResponse.data.phonepeResponse?.redirectUrl;
const orderId = paymentResponse.data.phonepeResponse?.orderId;

   if (redirectUrl && orderId) {
  // save order data temporarily
  
  localStorage.setItem(
    "orderDetails",
    JSON.stringify({ items, grandTotal, addressId: selectedAddress._id ,orderId})
  );
  window.location.href = redirectUrl;
} else {
      setIsLoading(false);
      alert("Payment initiation failed. No redirect URL.");
    }
  } catch (err) {
    console.error("Payment initiation error:", err.response?.data || err);
    setIsLoading(false);
    alert("Error initiating payment.");
  }
};*/}


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
        Checkout
      </Breadcrumb.Item>
      
    </Breadcrumb>
  </div>
        </Container> 
      <Container className="mt-4">
        <Row>
          {/* Left Section */}
          <Col md={6} style={{ marginBottom: "30px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontFamily: "poppins", fontWeight: 600 }}>Enter Delivery Address</h4>
              <div className="d-flex gap-2">
                {!isEditing && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={handleAddAddress}
                    style={{ fontFamily: "poppins" }}
                  >
                    + Add Address
                  </Button>
                )}
              </div>
            </div>

            {/* Saved addresses list */}
            {!isEditing && savedAddresses.length > 0 && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 style={{ fontFamily: "poppins", margin: 0 }}>Choose a saved address</h5>
                </div>

                {savedAddresses.map((addr) => {
                  const isSelected = getAddrId(selectedAddress) === getAddrId(addr);
                  const n = splitStorageToForm(addr);
                  return (
                    <Card
                      key={getAddrId(addr)}
                      className="mb-2"
                      style={isSelected ? { borderColor: "#28a745" } : {}}
                    >
                      <Card.Body className="d-flex justify-content-between">
                        <div style={{ fontFamily: "poppins", fontSize: "15px" }}>
                          <Form.Check
                            type="radio"
                            name="savedAddress"
                            id={`addr-${getAddrId(addr)}`}
                            checked={isSelected}
                            onChange={() => handleSelectAddress(addr)}
                            className="mb-2"
                            label={
                              <>
                                <strong>
                                  {n.firstName} {n.lastName}
                                </strong>
                                <br />
                                {(n.address1 + " " + n.address2).trim()}
                                <br />
                                {n.city}, {n.state} - {n.pincode}
                                <br />
                                {n.country}
                                <br />
                                Phone: {n.phoneCode}
                                {n.phoneNumber}
                                <br />
                                Email: {n.email}
                              </>
                            }
                          />
                        </div>

                        <div className="d-flex align-items-start gap-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleEditClick(addr)}
                            style={{ fontFamily: "poppins" }}
                          >
                            Edit
                          </Button>

                          <Button
                            className="ms-2"
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteAddress(getAddrId(addr))}
                            style={{ fontFamily: "poppins" }}
                            disabled={isLoading}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </>
            )}

            {/* Address Form */}
            {(isEditing || savedAddresses.length === 0) && (
              <Card className="mt-3">
                <Card.Body>
                  <h5 style={{ fontFamily: "poppins" }}>
                    {editingAddressId ? "Edit Address" : "Add New Address"}
                  </h5>
                  <Form onSubmit={handleSubmit}>
                    <Form.Control
                      type="email"
                      className="mb-2"
                      placeholder="Email"
                      name="email"
                      value={address.email}
                      onChange={handleChange}
                      required
                      style={{ fontFamily: "poppins" }}
                    />

                    <Row>
                      <Col md={6}>
                        <Form.Control
                          type="text"
                          className="mb-2"
                          placeholder="First Name"
                          name="firstName"
                          value={address.firstName}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Last Name"
                          name="lastName"
                          value={address.lastName}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Code (+91)"
                          name="phoneCode"
                          value={address.phoneCode}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={8}>
                        <Form.Group controlId="phoneNumber">
                          <Form.Control
                            className="mb-3"
                            type="tel"
                            inputMode="numeric"
                            name="phoneNumber"
                            placeholder="Mobile Number"
                            value={address.phoneNumber}
                            onChange={handleChange}
                            onBlur={(e) =>
                              setPhoneError(
                                phone10.test(e.target.value) ? "" : "Enter exactly 10 digits"
                              )
                            }
                            required
                            maxLength={10}
                            pattern="^[0-9]{10}$"
                            title="Enter exactly 10 digits"
                            isInvalid={!!phoneError}
                            style={{ fontFamily: "poppins" }}
                          />
                          <Form.Control.Feedback type="invalid">
                            {phoneError || "Enter exactly 10 digits."}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Control
                      className="mb-2"
                      placeholder="Address Line 1"
                      name="address1"
                      value={address.address1}
                      onChange={handleChange}
                      required
                      style={{ fontFamily: "poppins" }}
                    />
                    <Form.Control
                      className="mb-2"
                      placeholder="Address Line 2"
                      name="address2"
                      value={address.address2}
                      onChange={handleChange}
                      style={{ fontFamily: "poppins" }}
                    />

                    <Row>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="City"
                          name="city"
                          value={address.city}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="State"
                          name="state"
                          value={address.state}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Pincode"
                          name="pincode"
                          value={address.pincode}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Country"
                          name="country"
                          value={address.country}
                          onChange={handleChange}
                          required
                          style={{ fontFamily: "poppins" }}
                        />
                      </Col>
                    </Row>

                    <Form.Group controlId="saveAddress" className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label="Save address"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        style={{ fontFamily: "poppins", fontSize: "16px" }}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2 mt-2">
                      {editingAddressId && (
                        <Button variant="outline-secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                      <Button variant="primary" type="submit" disabled={isLoading}>
                        {editingAddressId ? "Update Address" : "Save Address"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            <Button
                  className="mt-3"
                  onClick={() => navigate("/categories")}
                  style={{
                    width: "fit-content",
                    backgroundColor: "#FFD814",
                    color: "#111",
                    border: "none",
                    fontWeight: "600",
                    padding: "10px",
                    fontFamily: "poppins",
                  }}
                >
                  Continue Shopping
                </Button>
          </Col>

          <Col md={2}></Col>

          {/* Right Section */}
          <Col md={4}>
            <Card style={{ padding: "20px", backgroundColor: "#fff" }}>
              

              <div className="mt-4" style={{ fontFamily: "poppins", fontSize: "16px" }}>
                <p>
                  <strong>Order Summary:</strong>
                </p>
                {(cartItems ?? []).map((item) => {
                  const sell = unitSellingPrice(item);
                  const qty = lineQty(item);
                  return (
                    <div
                      key={item.id}
                      className="d-flex align-items-start mb-3"
                      style={{ gap: "10px" }}
                    >
                      <div style={{ width: "70px", flexShrink: 0 }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "100%", objectFit: "contain", borderRadius: "4px" }}
                        />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <p className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>
                          {item.name}
                        </p>
                        <p className="mb-1" style={{ fontSize: "13px", color: "#666" }}>
                          Qty: {qty}
                          {item.weight && item.unit ? ` • ${item.weight} ${item.unit}` : ""}
                        </p>
                        <p className="mb-0" style={{ fontSize: "13px", color: "#111" }}>
                          Price: ₹{(sell * qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <hr />
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Shipping:</span>
                  <span>₹{shipping.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>GST:</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mt-2">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <Button
                onClick={handlePayNow}
                style={{
                  width: "100%",
                  backgroundColor: "#FFD814",
                  color: "#111",
                  border: "none",
                  fontWeight: "600",
                  padding: "10px",
                  fontFamily: "poppins",
                }}
                disabled={isLoading}
              >
                Proceed to Payment
              </Button>

                
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
