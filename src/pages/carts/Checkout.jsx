{/*import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Row,
  Col,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import ScrollToTop from "../../components/ScrollToTop";
//import axios from "axios";
import Navbar_Menu from "../../components/Navbar_Menu";
import NavbarMenu from "../../components/NavMenuBar";

export default function Checkout({ onSubmit }) {
  {/*const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const navigate = useNavigate();
  const paymentMode = "Online";
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const userJSON = localStorage.getItem("user");
  const storedUser = userJSON ? JSON.parse(userJSON) : null;

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

  const [saveAddress, setSaveAddress] = useState(false);

  // Fetch user-specific addresses on mount
  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    window.scrollTo(0, 0);

    if (storedUser && storedUser.email) {
      axios
        .get(`http://localhost:8011/api/addresses/email/${storedUser.email}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setSavedAddresses(response.data);
            setSelectedAddress(response.data[0]);
            setAddress({
              firstName: response.data[0].firstName || "",
              lastName: response.data[0].lastName || "",
              phoneCode: response.data[0].mobileNumber.slice(0, 3) || "+91",
              phoneNumber: response.data[0].mobileNumber.slice(3) || "",
              address1: response.data[0].address.split(" ")[0] || "",
              address2: response.data[0].address.split(" ").slice(1).join(" ") || "",
              city: response.data[0].city || "",
              state: response.data[0].state || "",
              pincode: response.data[0].pincode || "",
              country: response.data[0].country || "",
            });
            setIsEditing(false);
          } else {
            setIsEditing(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching addresses:", error);
          setIsEditing(true);
        });
    } else {
      setIsEditing(true);
    }

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phoneCode: addr.mobileNumber.slice(0, 3) || "+91",
      phoneNumber: addr.mobileNumber.slice(3) || "",
      address1: addr.address.split(" ")[0] || "",
      address2: addr.address.split(" ").slice(1).join(" ") || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      country: addr.country || "",
    });
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleAddAddress = () => {
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
    setSaveAddress(false);
    setIsEditing(true);
    setEditingAddressId(null);
  };

  const handleEditClick = (addr) => {
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phoneCode: addr.mobileNumber.slice(0, 3) || "+91",
      phoneNumber: addr.mobileNumber.slice(3) || "",
      address1: addr.address.split(" ")[0] || "",
      address2: addr.address.split(" ").slice(1).join(" ") || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      country: addr.country || "",
    });
    setSaveAddress(true);
    setIsEditing(true);
    setEditingAddressId(addr._id);
  };

  const handleCancel = () => {
    if (selectedAddress) {
      setAddress({
        firstName: selectedAddress.firstName || "",
        lastName: selectedAddress.lastName || "",
        phoneCode: selectedAddress.mobileNumber.slice(0, 3) || "+91",
        phoneNumber: selectedAddress.mobileNumber.slice(3) || "",
        address1: selectedAddress.address.split(" ")[0] || "",
        address2: selectedAddress.address.split(" ").slice(1).join(" ") || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        pincode: selectedAddress.pincode || "",
        country: selectedAddress.country || "",
      });
      setIsEditing(false);
      setSaveAddress(false);
      setEditingAddressId(null);
    } else {
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
      setEditingAddressId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!saveAddress) {
      alert("Please check 'Save address' to save the address.");
      return;
    }

    if (!storedUser || !storedUser.email) {
      alert("User email not found. Please login again.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
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

      let response;
      if (editingAddressId) {
        response = await axios.put(`http://localhost:8011/api/addresses/${editingAddressId}`, payload);
      } else {
        response = await axios.post("http://localhost:8011/api/addresses", payload);
      }

      if (response.status === 200 || response.status === 201) {
        alert(editingAddressId ? "Address updated successfully!" : "Address saved successfully!");
        const updatedAddress = response.data.address;
        if (editingAddressId) {
          setSavedAddresses(
            savedAddresses.map((addr) =>
              addr._id === editingAddressId ? updatedAddress : addr
            )
          );
        } else {
          setSavedAddresses([...savedAddresses, updatedAddress]);
        }
        setSelectedAddress(updatedAddress);
        setAddress({
          firstName: updatedAddress.firstName || "",
          lastName: updatedAddress.lastName || "",
          phoneCode: updatedAddress.mobileNumber.slice(0, 3) || "+91",
          phoneNumber: updatedAddress.mobileNumber.slice(3) || "",
          address1: updatedAddress.address.split(" ")[0] || "",
          address2: updatedAddress.address.split(" ").slice(1).join(" ") || "",
          city: updatedAddress.city || "",
          state: updatedAddress.state || "",
          pincode: updatedAddress.pincode || "",
          country: updatedAddress.country || "",
        });
        setIsEditing(false);
        setEditingAddressId(null);
      } else {
        alert(`Failed to ${editingAddressId ? "update" : "save"} address. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${editingAddressId ? "updating" : "saving"} address:`, error);
      alert(`An error occurred while ${editingAddressId ? "updating" : "saving"} address.`);
    } finally {
      setIsLoading(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.discountedPrice) || 0) * (parseInt(item.quantity) || 1),
    0
  );
  const shipping = 50;
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + gst;

  const handlePayNow = async () => {
    if (!selectedAddress || !selectedAddress._id) {
      alert("Please select or add a valid address before proceeding to payment.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to proceed.");
      return;
    }

    setIsLoading(true);

    try {
      const orderPayload = {
        addressId: selectedAddress._id,
        amount: total.toFixed(2), // Total includes GST
        paymentMode,
        quantity: cartItems.reduce((sum, item) => sum + parseInt(item.quantity || 1), 0),
        productImage: cartItems.length > 0 ? cartItems[0].image : "",
        productName: cartItems.length > 0 ? cartItems[0].name : "", // Added productName
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          discountedPrice: item.discountedPrice,
        })),
        tax: gst.toFixed(2), // Include GST in payload for reference
      };

      const response = await axios.post("http://localhost:8011/api/orders", orderPayload);

      if (response.status === 200 || response.status === 201) {
        alert("Order placed successfully!");
        dispatch({ type: "cart/clearCart" });
        navigate("/thankyou");
      } else {
        alert("Failed to place order, please try again.");
      }
    } catch (error) {
      console.error("Order API error:", error);
      alert("An error occurred while placing your order.");
    } finally {
      setIsLoading(false);
    }
  };*/}

  {/*const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [saveAddress, setSaveAddress] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

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

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    window.scrollTo(0, 0);

    const saved = localStorage.getItem("addresses");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSavedAddresses(parsed);
      setSelectedAddress(parsed[0]);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }

    return () => clearTimeout(timeout);
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phoneCode: addr.mobileNumber.slice(0, 3) || "+91",
      phoneNumber: addr.mobileNumber.slice(3) || "",
      address1: addr.address.split(" ")[0] || "",
      address2: addr.address.split(" ").slice(1).join(" ") || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      country: addr.country || "",
    });
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleAddAddress = () => {
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
    setSaveAddress(false);
    setIsEditing(true);
    setEditingAddressId(null);
  };

  const handleEditClick = (addr) => {
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phoneCode: addr.mobileNumber.slice(0, 3) || "+91",
      phoneNumber: addr.mobileNumber.slice(3) || "",
      address1: addr.address.split(" ")[0] || "",
      address2: addr.address.split(" ").slice(1).join(" ") || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      country: addr.country || "",
    });
    setSaveAddress(true);
    setIsEditing(true);
    setEditingAddressId(addr._id);
  };

  const handleCancel = () => {
    if (selectedAddress) {
      handleSelectAddress(selectedAddress);
    } else {
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
      setEditingAddressId(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAddress = {
      ...address,
      mobileNumber: `${address.phoneCode}${address.phoneNumber}`,
      address: `${address.address1} ${address.address2}`.trim(),
      _id: editingAddressId || Date.now().toString(), // mock unique ID
    };

    let updatedAddresses = [...savedAddresses];

    if (editingAddressId) {
      updatedAddresses = updatedAddresses.map((addr) =>
        addr._id === editingAddressId ? newAddress : addr
      );
    } else {
      updatedAddresses.push(newAddress);
    }

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    setSavedAddresses(updatedAddresses);
    setSelectedAddress(newAddress);
    alert(editingAddressId ? "Address updated successfully!" : "Address saved successfully!");
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.discountedPrice) || 0) * (parseInt(item.quantity) || 1),
    0
  );
  const shipping = 0;
  //const gst = subtotal * 0.18;
  const total = subtotal + shipping ;

  const handlePayNow = () => {
    if (!selectedAddress) {
      alert("Please select or add an address before proceeding.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Payment successful! Redirecting...");
    dispatch({ type: "cart/clearCart" });
    navigate("/thankyou");
  };

  const handleDeleteAddress = (id) => {
  const updated = savedAddresses.filter((addr) => addr._id !== id);
  setSavedAddresses(updated);
  localStorage.setItem("addresses", JSON.stringify(updated));

  if (selectedAddress?._id === id) {
    setSelectedAddress(updated.length > 0 ? updated[0] : null);
  }

  alert("Address deleted successfully!");
};

const handleSelectDefaultAddress = () => {
  if (savedAddresses.length > 0) {
    const defaultAddress = savedAddresses[0];
    setSelectedAddress(defaultAddress);
    alert("Address selected: " + defaultAddress.firstName); // or use a toast
  }
};



  return (
    <>
    <NavbarMenu/>
      <Container>
  <Row>
    {/* SHIPPING ADDRESS SECTION */}
  {/*<Col md={6} className="mt-5">
      <div style={{ backgroundColor: "white", color: "#002209" }}>
        <h1 style={{ fontSize: "25px", fontWeight: "700", textAlign: "left", padding: "3% 0", marginLeft:"75px" , fontFamily:"poppins"}}>
          SHIPPING ADDRESS
        </h1>
         <Container style={{ width: "80%" }}>
            {!isEditing && savedAddresses.length > 0 ? (
              <>
               <Row>
  {savedAddresses.map((addr) => (
    <Col md={12} key={addr._id} className="mb-4">
      <Card
        style={{
          border: selectedAddress?._id === addr._id ? "2px solid #D3B353" : "2px solid #002209",
          borderRadius: "15px",
          padding: "15px",
          cursor: "pointer",
          backgroundColor: selectedAddress?._id === addr._id ? "#f8f9fa" : "white",
        }}
        onClick={() => handleSelectAddress(addr)}
      >
        <Card.Body>
          <div className="d-flex align-items-center mb-2">
        <input
          type="radio"
          name="selectedAddress"
          checked={selectedAddress?._id === addr._id}
          onChange={() => handleSelectAddress(addr)}
          style={{ marginRight: "10px" }}
        />
        <label style={{ fontFamily: "poppins", fontWeight: "500" }}>Select Address</label>
      </div>
          <p style={{fontFamily:"poppins"}}><strong>{addr.firstName} {addr.lastName}</strong></p>
          <p style={{fontFamily:"poppins"}}>{addr.mobileNumber}</p>
          <p style={{fontFamily:"poppins"}}>{addr.address}</p>
          <p style={{fontFamily:"poppins"}}>{addr.city}, {addr.state}, {addr.pincode}</p>
          <p style={{fontFamily:"poppins"}}>{addr.country}</p>
          
          <div className="d-flex gap-2">
            <Button
            style={{fontFamily:"poppins"}}
              variant="outline-primary"
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(addr);
              }}
            >
              Edit Address
            </Button>
            <Button
            style={{fontFamily:"poppins"}}
              variant="outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteAddress(addr._id);
                
              }}
            >
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
<div className="d-flex align-items-center justify-content-start gap-2">
                <Button
                  variant="primary"
                  onClick={handleAddAddress}
                  style={{ marginBottom: "20px", fontFamily:"poppins" }}
                >
                  Add Address
                </Button>
               


               
                </div>
              </>
            ) : (
              <div style={{ borderRadius: "5px" }} >
                <Form onSubmit={handleSubmit} style={{ fontSize: "20px" }}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="firstName">
                        <Form.Control
                          type="text"
                          name="firstName"
                          style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px" }}
                          placeholder="First Name"
                          value={address.firstName}
                          onChange={handleChange}
                          required
                          className="mb-4"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="lastName">
                        <Form.Control
                          type="text"
                          name="lastName"
                          style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                          placeholder="Last Name"
                          value={address.lastName}
                          onChange={handleChange}
                          required
                          className="mb-4"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group controlId="address1" className="mt-3">
                    <Form.Control
                      type="text"
                      name="address1"
                      style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                      placeholder="Address 1"
                      value={address.address1}
                      onChange={handleChange}
                      required
                      className="mb-4"
                    />
                  </Form.Group>
                  <Form.Group controlId="address2" className="mt-3">
                    <Form.Control
                      type="text"
                      name="address2"
                      style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                      placeholder="Address 2 (optional)"
                      value={address.address2}
                      onChange={handleChange}
                      className="mb-4"
                    />
                  </Form.Group>
                  <Row className="mt-3">
                    <Col md={4}>
                      <Form.Group controlId="city">
                        <Form.Control
                          type="text"
                          name="city"
                          placeholder="City"
                          value={address.city}
                          onChange={handleChange}
                          style={{ fontSize: "16px" , fontFamily:"poppins", padding:"10px" }}
                          required
                          className="mb-4"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="state">
                        <Form.Control
                          type="text"
                          name="state"
                          placeholder="State"
                          value={address.state}
                          onChange={handleChange}
                          style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                          required
                          className="mb-4"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="pincode">
                        <Form.Control
                          type="text"
                          name="pincode"
                          placeholder="Pincode"
                          value={address.pincode}
                          onChange={handleChange}
                          style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                          required
                          className="mb-4"
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
                          style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                          value={address.phoneCode}
                          onChange={handleChange}
                          required
                          className="mb-4"
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
                          style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                          placeholder="Phone Number"
                          value={address.phoneNumber}
                          onChange={handleChange}
                          required
                          className="mb-4"
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
                      style={{ fontSize: "16px", fontFamily:"poppins", padding:"10px"  }}
                      required
                      className="mb-4"
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
                  
                  <div className="d-flex justify-content-between mt-3">
                    <Button variant="primary" type="submit" disabled={isLoading} style={{fontFamily:"poppins"}}>
                      {isLoading ? "Saving..." : editingAddressId ? "Update Address" : "Save Address"}
                    </Button>
                    <Button variant="secondary" onClick={handleCancel} disabled={isLoading} style={{fontFamily:"poppins"}}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Container>
       </div>
    </Col>
            <Col md={2}></Col>
    {/* ORDER SUMMARY SECTION */}
  
  {/*} <Col md={4} className="mt-5">
      <div style={{ backgroundColor: "white", color: "#002209",borderLeft:"1px solid #c1c1c1",  padding:"0 20px" }}>
        <h1 style={{ fontSize: "25px", fontWeight: "700", textAlign: "left", padding: "3% 0", fontFamily:"poppins" }}>
          ORDER SUMMARY
        </h1>
        {cartItems.map((item) => {
          const itemPrice = parseFloat(item.discountedPrice) || 0;
          const itemQuantity = parseInt(item.quantity) || 1;
          const totalItemPrice = itemPrice * itemQuantity;

          return (
            <>
            <Row key={item.id} className="align-items-center mb-3 mt-5">
              <Col xs={4} >
                <img src={item.image} alt={item.name} style={{ width: "100%", objectFit: "contain" }} />
              </Col>
              <Col xs={8}>
                <h5 style={{fontFamily:"poppins"}}>{item.name}</h5>
                <p style={{fontFamily:"poppins"}}>Price: Rs {itemPrice}</p>
                <p style={{fontFamily:"poppins"}}>Qty: {itemQuantity}</p>
                <p style={{fontFamily:"poppins"}}>Total: Rs {totalItemPrice.toFixed(2)}</p>
              </Col>
            </Row>
             </>
          );
         
        })}

        {/* Totals & Pay Now */}
       {/*} <div style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
          <div className="d-flex justify-content-between" style={{fontFamily:"poppins"}}><span>SUB TOTAL</span><span>Rs {subtotal.toFixed(2)}</span></div>
          <div className="d-flex justify-content-between "  style={{fontFamily:"poppins"}}><span>SHIPPING</span><span>Rs {shipping.toFixed(2)}</span></div>
         {/*} <div className="d-flex justify-content-between" style={{fontFamily:"poppins"}}><span>GST (18%)</span><span>Rs {gst.toFixed(2)}</span></div>*/}
         {/*} <div className="d-flex justify-content-between mt-2 fw-bold" style={{fontFamily:"poppins"}}><span>TOTAL <br/><span style={{fontFamily:"poppins", fontWeight:"400"}}>Inclusive of taxes</span></span><span>Rs {total.toFixed(2)}</span></div>

          <Button
            className="mt-3 search-button-slider"
            style={{ width: "100%", backgroundColor: "#D3B353", border: "none", padding:"10px" }}
            onClick={handlePayNow}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "PAY NOW"}
          </Button>
          <p style={{ fontSize: "12px", textAlign: "right", marginTop: "10px" }}>
            You'll be redirected to PhonePe to complete payment.
          </p>
        </div>
      </div>
    </Col>
  
  </Row>
</Container>

    </>
  );
}*/}

import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import NavbarMenu from "../../components/NavMenuBar";

export default function Checkout({ onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const navigate = useNavigate();
  const paymentMode = "Online"; // change to "COD" if needed
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const userJSON = localStorage.getItem("user");
  const storedUser = userJSON ? JSON.parse(userJSON) : null;

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

  const [saveAddress, setSaveAddress] = useState(false);

  // ---------- Helpers ----------
  // Build API-ready items array: [{ productName, productImage, price, quantity }]
  const cartToApiItems = (items = []) =>
    items.map((item) => ({
      productName: item.name || "",
      productImage: item.image || "",
      price: Number(item.discountedPrice) || 0,
      quantity: Number(item.quantity) || 0,
    }));

  // Reusable totals computed from normalized items
  const apiItems = cartToApiItems(cartItems);
  const subtotal = apiItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const shipping = 0;
  const gst = subtotal * 0.18; // 18% GST (adjust if needed)
  const total = subtotal + shipping + gst;

  // Fetch user-specific addresses on mount
  useEffect(() => {
    window.scrollTo(0, 0);

    if (storedUser && storedUser.email) {
      axios
        .get(`https://api.themysoreoils.com/api/addresses/email/${storedUser.email}`)
        .then((response) => {
          const list = response.data || [];
          setSavedAddresses(list);

          if (list.length > 0) {
            setSelectedAddress(list[0]);
            // prefill local form state from first address
            setAddress({
              firstName: list[0].firstName || "",
              lastName: list[0].lastName || "",
              phoneCode: (list[0].mobileNumber || "").slice(0, 3) || "+91",
              phoneNumber: (list[0].mobileNumber || "").slice(3) || "",
              address1: (list[0].address || "").split(" ")[0] || "",
              address2: (list[0].address || "").split(" ").slice(1).join(" ") || "",
              city: list[0].city || "",
              state: list[0].state || "",
              pincode: list[0].pincode || "",
              country: list[0].country || "",
            });
            setIsEditing(false);
          } else {
            // no addresses → show form
            setIsEditing(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching addresses:", error);
          setIsEditing(true);
        });
    } else {
      setIsEditing(true);
    }
  }, []); // eslint-disable-line

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phoneCode: (addr.mobileNumber || "").slice(0, 3) || "+91",
      phoneNumber: (addr.mobileNumber || "").slice(3) || "",
      address1: (addr.address || "").split(" ")[0] || "",
      address2: (addr.address || "").split(" ").slice(1).join(" ") || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      country: addr.country || "",
    });
    setIsEditing(false);
    setEditingAddressId(null);
  };

  const handleAddAddress = () => {
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
    setSaveAddress(false);
    setIsEditing(true);
    setEditingAddressId(null);
  };

  const handleEditClick = (addr) => {
    setAddress({
      firstName: addr.firstName || "",
      lastName: addr.lastName || "",
      phoneCode: (addr.mobileNumber || "").slice(0, 3) || "+91",
      phoneNumber: (addr.mobileNumber || "").slice(3) || "",
      address1: (addr.address || "").split(" ")[0] || "",
      address2: (addr.address || "").split(" ").slice(1).join(" ") || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      country: addr.country || "",
    });
    setSaveAddress(true);
    setIsEditing(true);
    setEditingAddressId(addr._id);
  };

  const handleCancel = () => {
    if (selectedAddress) {
      handleSelectAddress(selectedAddress);
      setSaveAddress(false);
    } else {
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
    if (!storedUser || !storedUser.email) {
      alert("User email not found. Please login again.");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
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
        alert(editingAddressId ? "Address updated successfully!" : "Address saved successfully!");
        const updatedAddress = response.data.address;

        let newList;
        if (editingAddressId) {
          newList = savedAddresses.map((a) => (a._id === editingAddressId ? updatedAddress : a));
        } else {
          newList = [...savedAddresses, updatedAddress];
        }

        setSavedAddresses(newList);
        setSelectedAddress(updatedAddress);
        setIsEditing(false);
        setEditingAddressId(null);
      } else {
        alert(`Failed to ${editingAddressId ? "update" : "save"} address. Please try again.`);
      }
    } catch (error) {
      console.error(`Error ${editingAddressId ? "updating" : "saving"} address:`, error);
      alert(`An error occurred while ${editingAddressId ? "updating" : "saving"} address.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = async () => {
    // Guard rails
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
      // ✅ Build API-normalized items array
      const items = cartToApiItems(cartItems);

      // Recalculate using the same items we’ll send
      const computedSubtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const shippingFee = 0;
      const taxAmount = computedSubtotal * 0.18;
      const grandTotal = computedSubtotal + shippingFee + taxAmount;

      // ✅ EXACT API structure you shared
      const orderPayload = {
        addressId: selectedAddress._id,
        amount: Number(grandTotal.toFixed(2)), // number
        paymentMode,                           // "Online" | "COD"
        items,                                 // [{ productName, productImage, price, quantity }]
        // Optional:
        // tax: Number(taxAmount.toFixed(2)),
        // shippingFee,
      };

      const response = await axios.post(
        "https://api.themysoreoils.com/api/orders",
        orderPayload
      );

      if (response.status === 200 || response.status === 201) {
        alert("Order placed successfully!");
        dispatch({ type: "cart/clearCart" });
        navigate("/thankyou");
      } else {
        alert("Failed to place order, please try again.");
      }
    } catch (error) {
      console.error("Order API error:", error);
      alert("An error occurred while placing your order.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (addrId) => {
    if (!addrId) return;
    if (!window.confirm("Delete this address?")) return;

    try {
      setIsLoading(true);
      await axios.delete(`https://api.themysoreoils.com/api/addresses/${addrId}`);

      const remaining = savedAddresses.filter((a) => a._id !== addrId);
      setSavedAddresses(remaining);

      // If we deleted the selected one, pick another or open form
      if (selectedAddress?._id === addrId) {
        if (remaining[0]) {
          setSelectedAddress(remaining[0]);
          handleSelectAddress(remaining[0]);
        } else {
          setSelectedAddress(null);
          setIsEditing(true); // no addresses left → show form
        }
      }

      alert("Address deleted.");
    } catch (err) {
      console.error("Delete address error:", err);
      alert("Failed to delete address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavbarMenu />
      <Container className="mt-4">
        <Row>
          {/* Left Section */}
          <Col md={6} style={{ marginBottom: "30px" }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontFamily: "poppins", fontWeight: 600 }}>Enter Delivery Address</h4>
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

            {/* Saved addresses list */}
            {!isEditing && savedAddresses.length > 0 && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 style={{ fontFamily: "poppins", margin: 0 }}>Choose a saved address</h5>
                </div>

                {savedAddresses.map((addr) => {
                  const isSelected = selectedAddress?._id === addr._id;
                  return (
                    <Card
                      key={addr._id}
                      className="mb-2"
                      style={isSelected ? { borderColor: "#28a745" } : {}}
                    >
                      <Card.Body className="d-flex justify-content-between">
                        <div style={{ fontFamily: "poppins", fontSize: "15px" }}>
                          <Form.Check
                            type="radio"
                            name="savedAddress"
                            id={`addr-${addr._id}`}
                            checked={isSelected}
                            onChange={() => handleSelectAddress(addr)}
                            className="mb-2"
                            label={
                              <>
                                <strong>{addr.firstName} {addr.lastName}</strong><br />
                                {addr.address}<br />
                                {addr.city}, {addr.state} - {addr.pincode}<br />
                                {addr.country}<br />
                                Phone: {addr.mobileNumber}
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
                            onClick={() => handleDeleteAddress(addr._id)} // delete the clicked card
                            style={{ fontFamily: "poppins" }}
                            disabled={isLoading}
                          >
                            Delete
                          </Button>

                          {!isSelected && (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => handleSelectAddress(addr)}
                              style={{ fontFamily: "poppins" }}
                            >
                              Deliver here
                            </Button>
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </>
            )}

            {/* Address Form — show if editing OR no saved addresses */}
            {(isEditing || savedAddresses.length === 0) && (
              <Card className="mt-3">
                <Card.Body>
                  <h5 style={{ fontFamily: "poppins" }}>
                    {editingAddressId ? "Edit Address" : "Add New Address"}
                  </h5>
                  <Form onSubmit={handleSubmit}>
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

                    <Form.Control
                      className="mb-2"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={address.phoneNumber}
                      onChange={handleChange}
                      required
                      style={{ fontFamily: "poppins" }}
                    />

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
                        label="Save this address for this session"
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

            {/* Current selection summary (optional) */}
            {!isEditing && selectedAddress && (
              <Card className="mt-3">
                <Card.Body>
                  <h5 style={{ fontFamily: "poppins", marginBottom: 10 }}>Delivery Address</h5>
                  <p style={{ fontFamily: "poppins", fontSize: 16 }}>
                    {selectedAddress.firstName} {selectedAddress.lastName}<br />
                    {selectedAddress.address}<br />
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}<br />
                    {selectedAddress.country}<br />
                    Phone: {selectedAddress.mobileNumber}
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col md={2}></Col>

          {/* Right Section */}
          <Col md={4}>
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
              >
                Deliver to this address
              </Button>

              <div className="mt-4" style={{ fontFamily: "poppins", fontSize: "16px" }}>
                <p><strong>Order Summary:</strong></p>
                {cartItems.map((item) => (
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
                      <p className="mb-1 fw-semibold" style={{ fontSize: "14px" }}>{item.name}</p>
                      <p className="mb-1" style={{ fontSize: "13px", color: "#666" }}>
                        Qty: {item.quantity}
                      </p>
                      <p className="mb-0" style={{ fontSize: "13px", color: "#111" }}>
                        Price: ₹{(Number(item.discountedPrice || 0) * Number(item.quantity || 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

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
                  <span>GST (18%):</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold mt-2">
                  <span>Total:</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
