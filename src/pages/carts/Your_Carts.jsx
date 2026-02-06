// import Navbar_Menu from "../../components/Navbar_Menu";
{/*import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Table,
  Button,
} from "react-bootstrap";
import Emptycart from "/media/Emptycart.png";
import Products_Sliders from "../Products_Sliders";
import Reviews from "../Reviews";
// import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
// import AddCart from "/media/AddCart.png";
import { Link } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import { useState, useEffect } from "react";
import Navbar_Menu from "../../components/Navbar_Menu";

export default function Your_Carts() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  // const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  // Fix: Ensure price and quantity are numbers to avoid NaN
const subtotal = cartItems.reduce(
  (total, item) =>
    total +
    (parseFloat(item.discountedPrice) || 0) * (parseInt(item.quantity) || 1),
  0
);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  

  return (
    <>
    <Navbar_Menu/>
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {/* SEARCH */}
    {/*} <Container className="mt-3">
          <InputGroup
            className="mb-5 footer-subscribe-input"
            style={{
              maxWidth: "750px",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Form.Control
              placeholder="Search our products..."
              style={{
                borderRadius: "5px",
                fontSize: "16px",
                color: "#002209",
                fontWeight: "500",
              }}
              className="me-2 search-input input-account-forms"
            />

            <div
              className="search-button-slider"
              style={{
                padding: "5px 24px",
                textAlign: "center",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              SEARCH
            </div>
          </InputGroup>
        </Container>

        {/* YOUR CART */}

        {/*<div
          style={{
            backgroundColor: "#ffff",
            padding: "20px",
            color: "#002209",
          }}
        >
          <Container>
            {cartItems.length === 0 ? (
              <div
                style={{
                  margin: "2% 0% 10% 0%",
                  textAlign: "center",
                  color: "#002209",
                }}
              >
                <div>
                  <img
                    src={Emptycart}
                    alt="cart"
                    style={{ width: "25%", height: "auto", objectFit: "cover" }}
                  />
                </div>
                <h1
                  style={{
                    letterSpacing: "1px",
                    fontSize: "50px",
                    fontWeight: "800",
                    fontFamily:"montserrat"
                  }}
                  className="h1-shopping-empty"
                >
                  YOUR CART IS EMPTY
                </h1>
                <h4
                  style={{
                    fontSize: "22px",
                    letterSpacing: "1px",
                    fontWeight: "400",
                  }}
                >
                  Looks like you haven't added anything to your cart yet.
                </h4>
                <h4
                  style={{
                    fontSize: "22px",
                    letterSpacing: "1px",
                    fontWeight: "400",
                  }}
                >
                  Come let's add your favourite products
                </h4>
                <Link to="/best-seller" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "250px",
                      height: "70px",
                      margin: "40px auto",
                      cursor: "pointer",
                      backgroundColor: "#D3B353",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        color: "#002209",
                        textAlign: "center",

                        margin: 0,
                      }}
                      className="shop-btn"
                    >
                      SHOP NOW
                    </h3>
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <div>
                  <h1
                    style={{
                      letterSpacing: "1px",
                      fontSize: "50px",
                      fontWeight: "800",
                      textAlign: "center",
                      marginBottom: "30px",
                      margin: "5% 0% 5% 0%",
                      color: "#002209",
                      fontFamily: "Montserrat",
                    }}
                  >
                    YOUR CART
                  </h1>

                  <div>
                    {/* Cart Table */}
                  {/*}  <Table
                      className="custom-table"
                      hover
                      responsive
                      style={{ margin: "auto" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "10px",
                              color: "#002209",
                              fontSize: "20px",
                              letterSpacing: "1px",
                              fontFamily:"montserrat"
                            }}
                          >
                            Product
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              color: "#002209",
                              fontSize: "20px",
                              letterSpacing: "1px",
                              fontFamily:"montserrat"
                            }}
                          >
                            Quantity
                          </th>
                          <th
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              color: "#002209",
                              fontSize: "20px",
                              letterSpacing: "1px",
                              fontFamily:"montserrat"
                            }}
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => {
                          console.log("Cart Item:", item);
                          // const itemPrice = parseFloat(item.discountedPrice) || 0;
                          // const itemQuantity = parseInt(item.quantity) || 1;

                          const itemPrice =
                            parseFloat(item.discountedPrice) || 0;
                          const itemQuantity = parseInt(item.quantity) || 1;
                          const totalItemPrice = itemPrice * itemQuantity;

                          return (
                            <tr key={item.id} style={{ textAlign: "center" }}>
                              <td style={{ padding: "10px", width: "50%" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "left",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      
                                      width: "120px",
                                      height: "auto",
                                    }}
                                  >
                                    <img
                                      src={item.image}
                                      alt="product-items"
                                      style={{
                                        width: "100px",
                                        height: "auto",
                                        objectFit: "contain",
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      marginLeft: "20px",
                                      color: "#002209",
                                      textAlign: "left",
                                    }}
                                  >
                                    <h3
                                      style={{
                                        fontSize: "24px",
                                        marginBottom: "5px",
                                        fontWeight: "700",
                                        fontFamily:"montserrat"
                                      }}
                                    >
                                      {item.name}
                                    </h3>
                                    <div>
                                      <div
                                        style={{
                                          fontSize: "20px",
                                          fontWeight: "700",
                                          fontFamily:"montserrat"
                                        }}
                                      >
                                        Rs {itemPrice.toFixed(0)}
                                      </div>
                                      <div
                                        style={{
                                          textDecoration: "line-through",
                                          fontSize: "16px",
                                          opacity: "0.5",
                                          fontWeight: "700",
                                          fontFamily:"montserrat"
                                        }}
                                      >
                                        Rs {item.originalPrice}
                                      </div>
                                      <p
                                        style={{
                                          fontSize: "14px",
                                          color: "#002209",
                                          lineHeight: "0.8",
                                          fontFamily:"montserrat"
                                        }}
                                      >
                                        {" "}
                                        {item.selectedWeight} ml
                                      </p>
                                    </div>

                                   <Button
                                      variant="transparent"
                                      style={{
                                        fontSize: "12px",
                                        padding: "5px 0px",
                                        // marginTop: "15px",
                                        fontWeight: "600",
                                        lineHeight: "1",
                                        textDecoration: "underline",
                                        textTransform: "uppercase",
                                      }}
                                      onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                      }
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: "10px" }}>
                                {/* Quantity Controls */}
                             {/*}  <div
                                  className="d-flex align-items-center justify-content-center"
                                  style={{ width: "100%", }}
                                >
                                  <Button
                                    onClick={() =>
                                      dispatch(
                                        updateQuantity({
                                          id: item.id,
                                        
                                          quantity: Math.max(
                                            1,
                                            itemQuantity - 1
                                          ),
                                        })
                                      )
                                    }
                                    // className="quantity-btn1"
                                    style={{
                                      backgroundColor: "#002209",
                                      border: "2px solid #002209",
                                      color: "white",
                                      fontWeight: "700",
                                      borderRadius: "0",
                                      fontSize: "12px",
                                      padding: "6px 10px",
                                    }}
                                  >
                                    -
                                  </Button>

                                  <span
                                    className="w-25 text-center"
                                    style={{
                                      border: "2px solid #002209",
                                      padding: "6px",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {itemQuantity}
                                  </span>

                                  <Button
                                    onClick={() =>
                                      dispatch(
                                        updateQuantity({
                                          id: item.id,
                                          quantity: item.quantity + 1,
                                        })
                                      )
                                    }
                                    className="quantity-btn1"
                                    style={{
                                      backgroundColor: "#002209",
                                      border: "2px solid #002209",
                                      color: "white",
                                      fontWeight: "700",
                                      borderRadius: "0",
                                      fontSize: "12px",
                                      padding: "6px 10px",
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>

                                 <Button
                                  variant="light"
                                  style={{
                                    borderRadius: "5px",
                                    border: "2px solid #002209",
                                    cursor: "pointer",
                                    marginRight: "15px",
                                    fontWeight: "700",
                                  }}
                                  className="quantity-btn"
                                  onClick={() =>
                                    dispatch(
                                      updateQuantity({
                                        id: item.id,
                                        quantity: Math.max(1, itemQuantity - 1),
                                      })
                                    )
                                  }
                                >
                                  −
                                </Button>
                                <span
                                  style={{
                                    width: "40px",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {itemQuantity}
                                </span>
                                <Button
                                  variant="light"
                                  style={{
                                    borderRadius: "5px",
                                    border: "2px solid #002209",
                                    backgroundColor: "#002209",
                                    cursor: "pointer",
                                    marginLeft: "15px",
                                    fontWeight: "700",
                                    color: "white",
                                  }}
                                  className="quantity-btn"
                                  onClick={() =>
                                    dispatch(
                                      updateQuantity({
                                        id: item.id,
                                        quantity: item.quantity + 1,
                                      })
                                    )
                                  }
                                >
                                  +
                                </Button> 
                              </td>
                              <td
                                style={{
                                  padding: "10px",
                                  fontSize: "26px",
                                  letterSpacing: "0.5px",
                                  color: "#002209",
                                  fontWeight: "700",
                                  fontFamily:"montserrat"
                                }}
                              >
                                Rs {totalItemPrice.toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>

                  {/* Subtotal Section */}
                 {/*} <div
                    className="d-flex justify-content-end gap-4 mt-2 "
                    style={{ marginBottom: "10%" }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        fontFamily:"montserrat"
                      }}
                    >
                      SUB TOTAL
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: "700",
                          fontFamily:"montserrat"
                        }}
                      >
                        Rs {subtotal.toFixed(2)}  
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontFamily:"montserrat"
                        }}
                      >
                        Taxes, discounts, and shipping <br />
                        calculated at checkout.
                      </p>
                      <div
                        style={{
                          position: "relative",
                          width: "200px",
                          height: "50px",
                          // margin: "20px",
                          display: "flex",
                          alignItems: "end",
                          justifyContent: "end",
                          overflow: "hidden",
                          cursor: "pointer",
                          color: "white",
                          backgroundColor: "#D3B353",
                          fontFamily:"montserrat"
                        }}
                        className="hover-fill"
                        onClick={() =>
                          navigate("/checkout", {
                            state: { cartItems, subtotal },
                          })
                        }
                      >
                        <h3
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "20px",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            color: "white",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          CHECK OUT
                        </h3>
                      </div>
                    </div>
                  </div>
                   <div
                  style={{
                    display: "block",
                    justifySelf: "end",
                    margin: "5% 0",
                    color: "#002209",
                  }}
                >
                  <h1
                    style={{
                      letterSpacing: "0.5px",
                      fontWeight: "600",
                      fontSize: "22px",
                      textAlign: "right",
                    }}
                  >
                    SUB TOTAL:{" "}
                    <span style={{ fontSize: "24px", fontWeight: "700" }}>
                    &#8377; {subtotal.toFixed(2)}
                    </span>
                  </h1>
                  <p
                    style={{
                      fontSize: "14px",
                      letterSpacing: "0.5px",
                      fontWeight: "400",
                    }}
                  >
                    Taxes, discounts, and shipping calculated at checkout.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "200px",
                        height: "50px",
                        margin: "20px",
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "end",
                        overflow: "hidden",
                        cursor: "pointer",
                        color: "white",
                        backgroundColor: "#D3B353",
                      }}
                      className="hover-fill"
                      onClick={() =>
                        navigate("/checkout", {
                          state: { cartItems, subtotal },
                        })
                      }
                    >
                      <h3
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "20px",
                          fontWeight: "700",
                          letterSpacing: "1px",
                          color: "white",
                          textAlign: "center",
                          width: "100%",
                        }}
                      >
                        CHECK OUT
                      </h3>
                    </div>
                  </div>
                </div> 
                </div>
              </>
            )}
          </Container>

          {/* YOU MAY ALSO LIKE */}
      {/*}    <div style={{ backgroundColor: "#ffff", color: "#002209" }}>
            <h1
              style={{
                fontSize: "50px",
                letterSpacing: "1px",
                textAlign: "center",
                fontWeight: "800",
                fontFamily:"montserrat"
              }}
              className="mobile-font"
            >
              YOU MAY ALSO LIKE
            </h1>
            <div>
              <Products_Sliders />
            </div>
          </div>
        </div>

        {/* REVIEWS */}
    {/*}  <Reviews />

        <ScrollToTop />
      </div>
    </>
  );
}*/}

{/*import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar_Menu from "../../components/Navbar_Menu";
import ScrollToTop from "../../components/ScrollToTop";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (parseFloat(item.originalPrice) || 0) * (parseInt(item.quantity) || 1),
    0
  );

  const discount = cartItems.reduce(
    (total, item) =>
      total +
      ((parseFloat(item.originalPrice) - parseFloat(item.discountedPrice)) || 0) *
        (parseInt(item.quantity) || 1),
    0
  );

  const grandTotal = subtotal - discount;

  return (
    <>
      <Navbar_Menu />
      <ScrollToTop />
     <Container className="my-5">
  <h2 style={{ fontFamily: "poppins" }} className="mb-4">
    Cart : {cartItems.length} Items
  </h2>
  <Row>
    {/* LEFT SIDE: Cart Items */}
  {/*}  <Col md={7}>
    {/* 🚚 Delivery Notice */}
   {/*} {subtotal >= 1500 && subtotal < 2000 && (
      <div className="alert alert-info" style={{ fontFamily: "poppins" }}>
        You're just ₹{2000 - subtotal} away from <strong>Free Delivery</strong>! 🎉
      </div>
    )}
    {subtotal >= 2000 && (
      <div className="alert alert-success" style={{ fontFamily: "poppins" }}>
        Congratulations! You're eligible for <strong>Free Delivery</strong> 🚚💨
      </div>
    )}
      {cartItems.map((item) => {
        const itemTotal =
          (parseFloat(item.discountedPrice) || 0) * (parseInt(item.quantity) || 1);
        return (
          <Row key={item.id} className="mb-4 p-3 border rounded">
            <Col xs={8} md={4} className="d-flex align-items-center justify-content-center mb-3 mb-md-0">
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", height: "auto" }}
              />
            </Col>
            <Col xs={8} md={4}>
              <h4 style={{ fontFamily: "poppins", fontWeight: "bold" , fontSize:"18px"}}>{item.name}</h4>
              <div style={{ textDecoration: "line-through", fontFamily: "poppins" }}>
                ₹{item.originalPrice}
              </div>
              <InputGroup className="my-2" style={{ width: "120px" }}>
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Math.max(1, item.quantity - 1),
                      })
                    )
                  }
                >
                  -
                </Button>
                <Form.Control
                  value={item.quantity}
                  readOnly
                  className="text-center"
                  style={{ fontFamily: "poppins" }}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </Button>
              </InputGroup>
              <div className="fw-bold" style={{ fontFamily: "poppins", fontSize: "20px" }}>
                ₹{item.discountedPrice}
              </div>
              <Button
                variant="link"
                className="text-danger p-0 mt-2"
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{fontFamily:"poppins"}}
              >
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
       
    </Col>

    {/* RIGHT SIDE: Price Summary */}
    {/*<Col md={5}>
      <div className="border p-4">
        <h5 style={{ fontFamily: "poppins", fontWeight: "600" }}>Price Detail</h5>
        <p style={{ fontFamily: "poppins" }}>Order Sub-total: ₹{subtotal.toFixed(0)}</p>
        <p style={{ fontFamily: "poppins" }} className="text-success">
          Product Discount on MRP: -₹{discount.toFixed(0)}
        </p>
        <p style={{ fontFamily: "poppins" }}>Estimated Shipping: ₹0</p>
        <h5 style={{ fontFamily: "poppins" }}>Grand Total: ₹{grandTotal.toFixed(0)}</h5>
       <div className="d-flex justify-content-between gap-3 mt-3">
  <Button
    variant="outline-danger"
    className="w-100"
    onClick={() => navigate("/")} 
    style={{ fontFamily: "poppins", backgroundColor:"#004914" , border:"none",color:"#fff"}}
  >
    CONTINUE SHOPPING
  </Button>
  <Button
    variant="danger"
    className="w-100"
    onClick={() => navigate("/checkout")}
    style={{ fontFamily: "poppins" , backgroundColor:"#004914" , border:"none",color:"#fff"}}
  >
    PROCEED TO CHECKOUT
  </Button>
</div>

      </div>
    </Col>
  </Row>
</Container>

    </>
  );
}*/}


{/*import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar_Menu from "../../components/Navbar_Menu";
import ScrollToTop from "../../components/ScrollToTop";
import { useEffect, useState } from "react";
import { addToCart } from "../../redux/cartSlice";

export default function Your_Carts() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (parseFloat(item.originalPrice) || 0) * (parseInt(item.quantity) || 1),
    0
  );

  const discount = cartItems.reduce(
    (total, item) =>
      total +
      ((parseFloat(item.originalPrice) - parseFloat(item.discountedPrice)) || 0) *
        (parseInt(item.quantity) || 1),
    0
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const grandTotal = subtotal - discount;

  const handleAddToWishlist = (product) => {
  const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const isAlreadyWishlisted = existingWishlist.some((item) => item.id === product.id);
  if (!isAlreadyWishlisted) {
    const updatedWishlist = [...existingWishlist, product];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    alert("Item added to wishlist!");
  } else {
    alert("Item already in wishlist.");
  }
};



const handleRemoveFromWishlist = (productId) => {
  const existingWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const updatedWishlist = existingWishlist.filter(item => item.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  setWishlist(updatedWishlist); // Update state if using
};

const handleAddFromWishlist = () => {
  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlistItems.length === 0) {
    alert("Your Wishlist is empty.");
    return;
  }

  wishlistItems.forEach((item) => {
    const isAlreadyInCart = cartItems.some(cartItem => cartItem.id === item.id);
    if (!isAlreadyInCart) {
      dispatch(addToCart({ ...item, quantity: 1 })); // Add with default quantity 1
    }
  });

  alert("Wishlist items added to Cart!");
};



  return (
    <>
      <Navbar_Menu />
      <ScrollToTop />
      <Container className="my-5">
      {cartItems.length > 0 && (
  <h2 className="mb-4 fw-bold" style={{ fontFamily: "Poppins" }}>
    Cart : {cartItems.length} Item{cartItems.length > 1 ? "s" : ""}
  </h2>
)}


        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <img
              src="/media/Emptycart.png"  
              alt="Empty Cart"
              style={{ width: "300px", marginBottom: "20px" }}
            />
            <h3 style={{ fontFamily: "Poppins", marginBottom: "20px" }}>
              Your Cart is Empty
            </h3>
            <Button
              variant="dark"
              onClick={() => navigate("/categories")}
              style={{ fontFamily: "Poppins", padding: "10px 30px" }}
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <Row>
            {/* LEFT SIDE: Cart Items */}
           {/*} <Col md={8}>
              {subtotal >= 1500 && subtotal < 2000 && (
                <Alert variant="info">
                  You're just ₹{2000 - subtotal} away from <strong>Free Delivery</strong>! 🎉
                </Alert>
              )}
              {subtotal >= 2000 && (
                <Alert variant="success">
                  Congratulations! You're eligible for <strong>Free Delivery</strong> 🚚
                </Alert>
              )}

              {cartItems.map((item) => (
                <div key={item.id} className="p-3 border-bottom mb-4">
                  <Row className="align-items-center">
                    <Col xs={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                        style={{ maxWidth: "120px" }}
                      />
                    </Col>
                  <Col xs={8}>
  <h5 className="fw-semibold" style={{ fontFamily: "Poppins" }}>{item.name}</h5>
  <div className="text-muted text-decoration-line-through">
    ₹{(item.originalPrice * item.quantity).toFixed(2)}
  </div>
  <div className="d-flex align-items-center gap-2 my-2">
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={() =>
        dispatch(
          updateQuantity({
            id: item.id,
            quantity: Math.max(1, item.quantity - 1),
          })
        )
      }
    >
      -
    </Button>
    <Form.Control
      value={item.quantity}
      readOnly
      className="text-center"
      style={{ maxWidth: "50px" }}
    />
    <Button
      variant="outline-secondary"
      size="sm"
      onClick={() =>
        dispatch(
          updateQuantity({
            id: item.id,
            quantity: item.quantity + 1,
          })
        )
      }
    >
      +
    </Button>
  </div>
  <div className="fw-bold text-success">
    ₹{(item.discountedPrice * item.quantity).toFixed(2)}
  </div>
  <div className="mt-2">
    <Button
      variant="transparent"
      style={{
        fontSize: "12px",
        padding: "5px 0px",
        fontWeight: "600",
        lineHeight: "1",
        textDecoration: "underline",
        textTransform: "uppercase",
      }}
      onClick={() =>
        dispatch(removeFromCart({
          id: item.id,
          selectedWeight: item.selectedWeight
        }))
      }
    >
      Remove
    </Button>
  </div>
</Col>

                  </Row>
                </div>
              ))}
              <Button
  variant="outline-dark"
  className="mt-3"
  onClick={handleAddFromWishlist}
  style={{ fontFamily: "Poppins" }}
>
  + Add from Wishlist
</Button>

            </Col>

            {/* RIGHT SIDE: Price Summary */}
            {/*<Col md={4}>
              <div className="p-4 border rounded">
                <div className="p-3 bg-light-subtle border rounded mb-3">
                  <p className="mb-1 fw-medium" style={{ fontFamily: "Poppins" }}>
                    🎁 Spend ₹2000 and get free delivery on your order.
                  </p>
                </div>

                <h5 className="fw-bold mb-3" style={{ fontFamily: "Poppins" }}>Price Detail</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontFamily: "Poppins" }}>Sub-total</span>
                  <span style={{ fontFamily: "Poppins" }}>₹{subtotal.toFixed(0)}</span>
                </div>
                {/*<div className="d-flex justify-content-between mb-2 text-success">
                  <span style={{ fontFamily: "Poppins" }}>Product Discount</span>
                  <span style={{ fontFamily: "Poppins" }}>₹{discount.toFixed(0)}</span>
                </div>*/}
              {/*}  <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontFamily: "Poppins" }}>Shipping</span>
                  <span style={{ fontFamily: "Poppins" }}>₹0</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span style={{ fontFamily: "Poppins" }}>Grand Total</span>
                  <span>₹{grandTotal.toFixed(0)}</span>
                </div>

                <Button
                  variant="dark"
                  className="w-100 mt-4"
                  onClick={() => {
                    if (isLoggedIn) {
                      navigate("/checkout");
                    } else {
                      alert("Please login to proceed to checkout.");
                      navigate("/login");
                    }
                  }}
                  style={{ fontFamily: "Poppins" }}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline-dark"
                  className="w-100 mt-3"
                  onClick={() => navigate("/categories")}
                  style={{ fontFamily: "Poppins" }}
                >
                  Continue Shopping
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}*/}

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, addToCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar_Menu from "../../components/Navbar_Menu";
import ScrollToTop from "../../components/ScrollToTop";
import { useEffect, useState } from "react";

export default function Your_Carts() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const round1 = (num) => Math.round(num * 10) / 10;



  // Helpers
  const toNum = (v) => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const unitSellingPrice = (item) =>
    toNum(
      item.discountedPrice ??
      item.discountPrice ??
      item.price ??
      item.originalPrice
    );

  const unitMrp = (item) =>
    toNum(
      item.originalPrice ??
      item.price ??
      item.discountPrice ??
      item.discountedPrice
    );

  const lineQty = (item) => Math.max(1, toNum(item.quantity));
  const lineSellingTotal = (item) => unitSellingPrice(item) * lineQty(item);
  const lineOriginalTotal = (item) => unitMrp(item) * lineQty(item);

  const subtotal = cartItems.reduce(
  (sum, item) => sum + lineSellingTotal(item),
  0
);

const discountPercent = 10;

// ✅ same logic as checkout
const discountAmount = round1((subtotal * discountPercent) / 100);

const shipping = 80;

const taxableAmount = subtotal - discountAmount;

const gst = 0.05;
const gstAmount = round1(taxableAmount * gst);

const grandTotal = round1(taxableAmount + gstAmount + shipping);





  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setIsLoggedIn(true);
  }, []);

  /** Add from Wishlist
   * Only add items that:
   *  - have a truthy image
   *  - have quantity > 0 (use wishlist quantity, not default 1)
   *  - are not already in cart for the same (id, variantId)
   */
  const handleAddFromWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlistItems.length) {
      alert("Your Wishlist is empty.");
      return;
    }

    let added = 0;
    let skippedNoQty = 0;
    let skippedNoImage = 0;
    let skippedDup = 0;

    wishlistItems.forEach((item) => {
      const qty = toNum(item.quantity);
      const hasQty = qty > 0;
      const hasImage = !!item.image;

      if (!hasQty) {
        skippedNoQty++;
        return;
      }
      if (!hasImage) {
        skippedNoImage++;
        return;
      }

      const exists = (cartItems || []).some(
        (ci) => ci.id === item.id && (ci.variantId ?? "") === (item.variantId ?? "")
      );
      if (exists) {
        skippedDup++;
        return;
      }

      dispatch(addToCart({ ...item, quantity: qty }));
      added++;
    });

    const parts = [];
    if (added) parts.push(`✅ Added: ${added}`);
    if (skippedNoQty) parts.push(`⏸️ Skipped (no quantity): ${skippedNoQty}`);
    if (skippedNoImage) parts.push(`🖼️ Skipped (no image): ${skippedNoImage}`);
    if (skippedDup) parts.push(`♻️ Skipped (already in cart): ${skippedDup}`);

    alert(parts.length ? parts.join(" | ") : "Nothing eligible to add from Wishlist.");
  };

  return (
    <>
      <Navbar_Menu />
      <ScrollToTop />
      <Container className="my-5">
        {cartItems.length > 0 && (
          <h2 className="mb-4 fw-bold" style={{ fontFamily: "Poppins" }}>
            Cart : {cartItems.length} Item{cartItems.length > 1 ? "s" : ""}
          </h2>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <img
              src="/media/Emptycart.png"
              alt="Empty Cart"
              style={{ width: "300px", marginBottom: "20px" }}
            />
            <h3 style={{ fontFamily: "Poppins", marginBottom: "20px" }}>
              Your Cart is Empty
            </h3>
            <Button
              variant="dark"
              onClick={() => navigate("/shop")}
              style={{ fontFamily: "Poppins", padding: "10px 30px" }}
            >
              Shop Now
            </Button>
          </div>
        ) : (
          <Row>
            {/* LEFT SIDE: Cart Items */}
            <Col md={8}>
              {grandTotal >= 1500 && grandTotal < 2000 && (
                <Alert variant="info">
                  You're just ₹{Math.max(0, 2000 - Math.round(grandTotal))} away from{" "}
                  <strong>Free Delivery</strong>! 🎉
                </Alert>
              )}
              {grandTotal >= 2000 && (
                <Alert variant="success">
                  Congratulations! You're eligible for <strong>Free Delivery</strong> 🚚
                </Alert>
              )}

              {cartItems.map((item) => {
                const mrp = unitMrp(item);
                const sell = unitSellingPrice(item);
                const hasDiscount = mrp > sell;

                return (
                  <div
                    key={`${item.id}-${item.variantId ?? item.weight ?? ""}-${sell}`}
                    className="p-3 border-bottom mb-4"
                  >
                    <Row className="align-items-center">
                      <Col xs={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ maxWidth: "120px" }}
                        />
                      </Col>

                      <Col xs={8} className="cartsectionright">
                        <h5 className="fw-semibold" style={{ fontFamily: "Poppins" }}>
                          {item.name}
                        </h5>

                        {item.weight && item.unit && (
                          <div className="text-muted" style={{ fontSize: 12, fontFamily:'poppins' }}>
                            {item.weight} {item.unit}
                          </div>
                        )}

                        {hasDiscount && (
                          <div className="text-muted text-decoration-line-through mt-1" style={{fontFamily:"poppins"}}>
                            ₹{lineOriginalTotal(item).toFixed(2)}
                          </div>
                        )}

                        {/* Quantity controls */}
                        <div className="d-flex align-items-center gap-2 my-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  variantId: item.variantId,
                                  quantity: Math.max(1, toNum(item.quantity) - 1),
                                })
                              )
                            }
                          >
                            -
                          </Button>
                          <Form.Control
                            value={item.quantity}
                            readOnly
                            className="text-center"
                            style={{ maxWidth: "50px" }}
                          />
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  variantId: item.variantId,
                                  quantity: toNum(item.quantity) + 1,
                                })
                              )
                            }
                          >
                            +
                          </Button>
                        </div>

                        {/* Selling total x qty */}
                        <div className="fw-bold text-success" style={{fontFamily:"poppins"}}>
                          ₹{lineSellingTotal(item).toFixed(2)}
                        </div>

                        <div className="mt-2">
                          <Button
                            variant="transparent"
                            style={{
                              fontSize: "12px",
                              padding: "5px 0px",
                              fontWeight: "600",
                              lineHeight: "1",
                              textDecoration: "underline",
                              textTransform: "uppercase",
                            }}
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  id: item.id,
                                  variantId: item.variantId,
                                })
                              )
                            }
                          >
                            Remove
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                );
              })}

              <Button
                variant="outline-dark"
                className="mt-3 mb-3"
                onClick={handleAddFromWishlist}
                style={{ fontFamily: "Poppins" }}
              >
                + Add from Wishlist
              </Button>
            </Col>

            {/* RIGHT SIDE: Price Summary */}
            <Col md={4}>
              <div className="p-4 border rounded">
                <div className="p-3 bg-light-subtle border rounded mb-3">
                  <p className="mb-1 fw-medium" style={{ fontFamily: "Poppins" }}>
                    🎁 Spend ₹2000 and get free delivery on your order.
                  </p>
                </div>

                <h5 className="fw-bold mb-3" style={{ fontFamily: "Poppins" }}>
                  Price Detail
                </h5>

                <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontFamily: "Poppins" }}>Sub-total</span>
                  <span style={{ fontFamily: "Poppins" }}>
                    ₹{subtotal.toFixed(0)}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
  <span style={{ fontFamily: "Poppins" }}>Shipping</span>
  <span style={{ fontFamily: "Poppins" }}>₹{shipping.toFixed(0)}</span>
</div>


                <div className="d-flex justify-content-between mb-2">
  <span style={{ fontFamily: "Poppins" }}>GST (5%)</span>
  <span style={{ fontFamily: "Poppins" }}>₹{gstAmount.toFixed(1)}</span>
</div>


                 <div className="d-flex justify-content-between mb-2">
                  <span style={{ fontFamily: "Poppins" }}>Discount(10%)</span>
                  <span style={{ fontFamily: "Poppins" }}>₹{discountAmount.toFixed(1)}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span style={{ fontFamily: "Poppins" }}>Grand Total</span>
                  <span>₹{grandTotal.toFixed(1)}</span>
                </div>

                <Button
                  variant="dark"
                  className="w-100 mt-4"
                  onClick={() => {
                    if (isLoggedIn) {
                      navigate("/checkout");
                    } else {
                      alert("Please login to proceed to checkout.");
                      navigate("/login");
                    }
                  }}
                  style={{ fontFamily: "Poppins" }}
                >
                  Proceed to Checkout
                </Button>

                <Button
  variant="outline-dark"
  className="w-100 mt-3"
  onClick={() => navigate(-1)}
  style={{ fontFamily: "Poppins" }}
>
  Continue Shopping
</Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
