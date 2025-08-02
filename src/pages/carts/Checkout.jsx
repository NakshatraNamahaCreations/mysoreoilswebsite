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
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarMenu from "../../components/NavMenuBar";

export default function Checkout() {
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (parseFloat(item.discountedPrice) || 0) * (parseInt(item.quantity) || 1),
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  useEffect(() => {
    const stored = localStorage.getItem("addresses");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSavedAddresses(parsed);
      setSelectedAddress(parsed[0]);
    }
  }, []);

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
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

  const handlePayNow = () => {
    if (!selectedAddress) return alert("Please select a delivery address.");
    if (cartItems.length === 0) return alert("Cart is empty");
    alert("Order placed!");
    dispatch({ type: "cart/clearCart" });
    navigate("/thankyou");
  };

  return (
    <>
      <NavbarMenu />
      <Container className="mt-4">
        <Row>
          {/* Left Section */}
          <Col md={6} style={{marginBottom:"30px"}}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 style={{ fontFamily: "poppins", fontWeight: 600 }}>Select a delivery address</h4>
              <Button
               style={{fontFamily:"poppins"}}
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                  setAddress({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    address: "",
                    city: "",
                    state: "",
                    pincode: "",
                    country: "India"
                  });
                }}
              >
                + Add New Address
              </Button>
            </div>

           

            <div className="mt-4">
              {savedAddresses.map((addr) => (
                <Card
                  key={addr._id}
                  onClick={() => handleSelectAddress(addr)}
                  style={{
                    border: selectedAddress?._id === addr._id ? "2px solid #c45500" : "1px solid #ddd",
                    marginBottom: "15px",
                    backgroundColor: selectedAddress?._id === addr._id ? "#fff8e1" : "#fff",
                    cursor: "pointer"
                  }}
                >
                  <Card.Body>
                    <Form.Check
                      type="radio"
                      name="selectedAddress"
                      checked={selectedAddress?._id === addr._id}
                      onChange={() => handleSelectAddress(addr)}
                      label={
                        <div style={{ fontFamily: "poppins" }}>
                          <strong>{addr.firstName} {addr.lastName}</strong><br />
                          {addr.address}, {addr.city}, {addr.state} - {addr.pincode}<br />
                          Phone: {addr.phoneNumber}<br />
                          {addr.country}
                        </div>
                      }
                    />
                    <div className="d-flex align-items-center justify-content-start gap-3 mt-2">
                    <Button
                    style={{fontFamily:"poppins", fontWeight:"500", padding:"6px 15px"}}
                      size="sm"
                      variant="outline-secondary"
                      className=" search-button-slider"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent radio select
                        setIsEditing(true);
                        setAddress(addr);
                      }}
                    >
                      Edit
                    </Button>
                     <Button
            style={{fontFamily:"poppins", padding:"6px 15px"}}
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
              ))}
            </div>

            {/* Add/Edit Address Form */}
            {isEditing && (
              <Card className="mt-3">
                <Card.Body>
                  <h5 style={{ fontFamily: "poppins" }}>{address._id ? "Edit Address" : "Add New Address"}</h5>
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      let updatedList;

                      if (address._id) {
                        // Edit mode
                        updatedList = savedAddresses.map(a =>
                          a._id === address._id ? address : a
                        );
                      } else {
                        // Add mode
                        const newAddress = { ...address, _id: Date.now().toString() };
                        updatedList = [...savedAddresses, newAddress];
                      }

                      localStorage.setItem("addresses", JSON.stringify(updatedList));
                      setSavedAddresses(updatedList);
                      setSelectedAddress(address);
                      setIsEditing(false);
                    }}
                  >
                    <Row >
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="First Name"
                          value={address.firstName}
                          onChange={(e) => setAddress({ ...address, firstName: e.target.value })}
                          required
                          style={{fontFamily:"poppins"}}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Last Name"
                          value={address.lastName}
                          onChange={(e) => setAddress({ ...address, lastName: e.target.value })}
                          required
                           style={{fontFamily:"poppins"}}
                        />
                      </Col>
                    </Row>
                    <Form.Control
                      className="mb-2"
                      placeholder="Phone Number"
                      value={address.phoneNumber}
                      onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
                      required
                       style={{fontFamily:"poppins"}}
                    />
                    <Form.Control
                      className="mb-2"
                      placeholder="Address"
                      value={address.address}
                      onChange={(e) => setAddress({ ...address, address: e.target.value })}
                      required
                       style={{fontFamily:"poppins"}}
                    />
                    <Row>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="City"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          required
                           style={{fontFamily:"poppins"}}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="State"
                          value={address.state}
                          onChange={(e) => setAddress({ ...address, state: e.target.value })}
                          required
                           style={{fontFamily:"poppins"}}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Pincode"
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          required
                           style={{fontFamily:"poppins"}}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          className="mb-2"
                          placeholder="Country"
                          value={address.country}
                          onChange={(e) => setAddress({ ...address, country: e.target.value })}
                          required
                           style={{fontFamily:"poppins"}}
                        />
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end gap-2 mt-2">
                      <Button variant="secondary" onClick={() => setIsEditing(false)}  style={{fontFamily:"poppins"}}>Cancel</Button>
                      <Button variant="primary" type="submit"  style={{fontFamily:"poppins"}}>{address._id ? "Update" : "Save Address"}</Button>
                    </div>
                  </Form>
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
                  fontFamily: "poppins"
                }}
              >
                Deliver to this address
              </Button>
              <div className="mt-4" style={{ fontFamily: "poppins", fontSize: "16px" }}>
                <p><strong>Order Summary:</strong></p>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ marginBottom: "10px" }} >
                    <Col xs={4} >
                <img src={item.image} alt={item.name} style={{ width: "100%", objectFit: "contain" }} />
              </Col>
                    <p style={{ marginBottom: "4px" }}><strong>{item.name}</strong></p>
                    <p style={{ marginBottom: "2px" }}>Qty: {item.quantity}</p>
                    <p style={{ marginBottom: "2px" }}>Price: ₹{parseFloat(item.discountedPrice).toFixed(2)}</p>
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
