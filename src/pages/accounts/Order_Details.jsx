{/*import Accordion from "react-bootstrap/Accordion";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import DownloadPDF from "../../components/DownloadPDF";
import { Link } from "react-router-dom";

export default function Order_Details() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.email) {
          //setError("User not logged in.");
          setLoading(false);
          return;
        }

        const ordersResponse = await axios.get("https://api.themysoreoils.com/api/orders");
        const orders = ordersResponse.data;

        if (!orders || orders.length === 0) {
          setError("No orders found.");
          setLoading(false);
          return;
        }

        const latestOrder = orders[0];
        setOrder(latestOrder);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch order details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load order details.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) return <Container>Loading order details...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!order) return <Container>No order details available.</Container>;

  const shipping = 50;
  const subtotalWithTax = order.amount - shipping;
  const tax = subtotalWithTax - subtotalWithTax / 1.18;
  const subtotal = subtotalWithTax / 1.18;
  const total = order.amount;

  const orderItems = [
    {
      id: order._id,
      name: order.productName || "Product",
      image: order.productImage,
      quantity: order.quantity,
      discountedPrice: subtotal / order.quantity,
    },
  ];

  return (
    <Container>
      <Accordion>
        <Accordion.Item
          eventKey="1"
          style={{ boxShadow: "1px 1px 6px #D3B353", border: "none" }}
        >
          <Accordion.Header className="custom-header">
            <span
              className="accordion-title"
              style={{
                fontWeight: "700",
                color: "#002209",
                fontSize: "22px",
              }}
            >
              Order Details
            </span>
          </Accordion.Header>

          <Accordion.Body className="custom-header" style={{ color: "#002209" }}>
            <div className="p-3 mt-2 order-box">
              <div className="d-flex justify-content-between">
                <h5 className="invoice-title">ORDER INVOICE</h5>
                <DownloadPDF
                  order={order}
                  address={order.address}
                  orderItems={orderItems}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
              </div>

              <div style={{ overflowX: "auto" }}>
                <Table className="mt-4">
                  <thead>
                    <tr className="table-head-row">
                      <th>Product</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-end">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => {
                      const itemPrice = parseFloat(item.discountedPrice) || 0;
                      const itemQuantity = parseInt(item.quantity) || 1;
                      const totalItemPrice = itemPrice * itemQuantity;

                      return (
                        <tr key={item.id} style={{ textAlign: "center", color: "#002209" }}>
                          <td style={{ padding: "10px", width: "50%" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <div style={{ border: "1px solid #00614A", width: "120px" }}>
                                <img
                                  src={item.image || "/media/cart-product.png"}
                                  alt="product-items"
                                  style={{
                                    width: "40px",
                                    height: "auto",
                                    objectFit: "contain",
                                  }}
                                  onError={(e) => {
                                    e.target.src = "/media/cart-product.png";
                                  }}
                                />
                              </div>
                              <div style={{ marginLeft: "20px", color: "#002209", textAlign: "left" }}>
                                <h3 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "5px" }}>
                                  {item.name}
                                </h3>
                                <div>
                                  <div style={{ fontSize: "20px", fontWeight: "700" }}>
                                    Rs {itemPrice.toFixed(2)}
                                  </div>
                                  <div style={{ textDecoration: "line-through", fontSize: "16px", opacity: 0.5 }}>
                                    Rs {(itemPrice * 2).toFixed(2)}
                                  </div>
                                  <p style={{ fontSize: "14px" }}>200 ml</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{itemQuantity}</td>
                          <td className="text-end fw-bold">Rs {totalItemPrice.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <div className="d-flex justify-content-between">
                <div className="w-50">
                  <p>Shipping Address</p>
                  {order.address ? (
                    <p>
                      {order.address.firstName} {order.address.lastName}
                      <br />
                      {order.address.address}
                      <br />
                      {order.address.city}, {order.address.state}, {order.address.pincode}
                      <br />
                      {order.address.country}
                    </p>
                  ) : (
                    <p>Address not available</p>
                  )}
                </div>
                <div style={{ width: "30%" }}>
                  <Row style={{ width: "100%", margin: "10px 0px" }}>
                    <Col className="text-end">
                      <p>SUB TOTAL</p>
                      <p>SHIPPING</p>
                      <p>GST (18%)</p>
                      <p className="fw-bold">AMOUNT PAID</p>
                    </Col>
                    <Col className="text-end">
                      <p>Rs {subtotal.toFixed(2)}</p>
                      <p>Rs {shipping.toFixed(2)}</p>
                      <p>Rs {tax.toFixed(2)}</p>
                      <p>Rs {total.toFixed(2)}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            {/* TRACKING ORDER */}
          {/*}  <div className="tracking-container">
              <div className="mt-3 p-3 order-box">
                <h5 className="tracking-title">Track Order</h5>
                <p className="fw-bold">
                  Order #{order._id.slice(-8)} - {order.status}
                </p>

                <Row className="text-center align-items-center my-4">
                  {[
                    {
                      label: "Order Placed",
                      icon: "/media/orderPlaced.png",
                      isActive: true,
                      isMatched: true,
                      time: order.createdAt,
                    },
                    {
                      label: "Order Dispatched",
                      icon: "/media/orderDispatched.png",
                      isActive: order.status === "Ready for Dispatch" || order.status === "Delivered",
                      isMatched: order.status === "Ready for Dispatch" || order.status === "Delivered",
                      time: order.updatedAt,
                    },
                    {
                      label: "Delivered Successfully",
                      icon: "/media/delivered.png",
                      isActive: order.status === "Delivered",
                      isMatched: order.status === "Delivered",
                      time: new Date(),
                    },
                  ].map((step, i) => (
                    <Col
                      key={i}
                      xs={12}
                      sm={4}
                      className="d-flex flex-column align-items-center mb-4"
                      style={{ color: step.isMatched ? "#002209" : "gray" }}
                    >
                      <div
                        className="circle-track"
                        style={{
                          backgroundColor: step.isActive ? "#002209" : "transparent",
                          color: "white",
                          border: step.isActive ? "none" : "1px solid lightgray",
                          borderRadius: "50%",
                          padding: "10px",
                        }}
                      >
                        <img
                          src={step.icon}
                          style={{
                            width: "40px",
                            filter: step.isActive ? "brightness(0) invert(1)" : "none",
                          }}
                        />
                      </div>
                      <h5 className="h5-tracktitle">{step.label}</h5>
                      <p className="p-tracktitle">
                        {step.time
                          ? new Date(step.time).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "—"}
                      </p>
                      <p className="p-tracktitle">
                        {step.time
                          ? new Date(step.time).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                          : "—"}
                      </p>
                    </Col>
                  ))}
                </Row>

                <div className="text-center mt-3">
                 {(order.status === "Ready for Dispatch" || order.status === "Dispatched") && (
  <h5 className="h5-delivery">
    Expected Delivery by{" "}
    {new Date(new Date(order.updatedAt).getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
    })}
  </h5>
)}

{order.status === "Delivered" && (
  <h5 className="h5-delivery">
    Delivered on{" "}
    {new Date(order.updatedAt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "long",
      day: "numeric",
    })}
  </h5>
)}

                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}*/}

import { Container, Table, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import DownloadPDF from "../../components/DownloadPDF";

export default function Order_Details() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.email) {
          setLoading(false);
          return;
        }

        const ordersResponse = await axios.get("https://api.themysoreoils.com/api/orders");
        const allOrders = ordersResponse.data;

        const userOrders = allOrders.filter(order =>
          order.address?.email === storedUser.email
        );

        if (userOrders.length === 0) {
          setError("No orders found for this user.");
          setLoading(false);
          return;
        }

        setOrders(userOrders);
        setLoading(false);
      } catch (err) {
        console.error("❌ Failed to fetch order details:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Failed to load order details.");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) return <Container>Loading order details...</Container>;
  if (error) return <Container>{error}</Container>;
  if (!orders || orders.length === 0) return <Container>No order details available.</Container>;

  return (
    <Container>
      {orders.map((order, index) => {
        const shipping = order.shippingFee || 50;

        // ✅ Always create normalized array
        const products = Array.isArray(order.items)
          ? order.items.map(item => ({
              productName: item.productName || "",
              productImage: item.productImage || "",
              price: Number(item.price) || 0,
              quantity: Number(item.quantity) || 0
            }))
          : [{
              productName: order.productName || "",
              productImage: order.productImage || "",
              price: Number(order.amount) || 0,
              quantity: Number(order.quantity) || 0
            }];

        const subtotal = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
        const tax = 0;
        const total = subtotal + shipping + tax;

        return (
          <div key={order._id} style={{ boxShadow: "1px 1px 6px #D3B353", padding: "20px", borderRadius: "10px", marginTop: "30px" }}>
            <h2 style={{ fontWeight: "700", color: "#002209", fontSize: "24px" }}>
              Order #{index + 1}
            </h2>

            {/* Invoice */}
            <div className="p-3 mt-4 order-box">
              <div className="d-flex justify-content-between">
                <h5 className="invoice-title">ORDER INVOICE</h5>
                <DownloadPDF
                  order={order}
                  address={order.address}
                  orderItems={products} // ✅ Pass normalized array
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
              </div>

              {/* Products Table */}
              <div style={{ overflowX: "auto" }}>
                <Table className="mt-4">
                  <thead>
                    <tr className="table-head-row">
                      <th>Product</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-end">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, i) => (
                      <tr key={i} style={{ textAlign: "center", color: "#002209" }}>
                        <td style={{ padding: "10px", width: "50%" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ border: "none", width: "100px" }}>
                              <img
                                src={
                                  item.productImage
                                    ? item.productImage.startsWith("http")
                                      ? item.productImage
                                      : `https://api.themysoreoils.com/${item.productImage}`
                                    : "/media/cart-product.png"
                                }
                                alt={item.productName}
                                style={{ width: "60px", objectFit: "contain" }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/media/cart-product.png";
                                }}
                              />
                            </div>
                            <div style={{ marginLeft: "20px", textAlign: "left" }}>
                              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>{item.productName}</h3>
                              <div>
                                <div style={{ fontSize: "16px", fontWeight: "700" }}>
                                  Rs {item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td className="text-end fw-bold">
                          Rs {(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Shipping & Total */}
              <div className="d-flex justify-content-between mt-4">
                <div className="w-50">
                  <p>Shipping Address</p>
                  {order.address ? (
                    <p>
                      {order.address.firstName} {order.address.lastName}<br />
                      {order.address.address}<br />
                      {order.address.city}, {order.address.state}, {order.address.pincode}<br />
                      {order.address.country}
                    </p>
                  ) : (
                    <p>Address not available</p>
                  )}
                </div>
                <div style={{ width: "30%" }}>
                  <Row>
                    <Col className="text-end">
                      <p>SUBTOTAL</p>
                      <p>SHIPPING</p>
                      <p className="fw-bold">AMOUNT PAID</p>
                    </Col>
                    <Col className="text-end">
                      <p>Rs {subtotal.toFixed(2)}</p>
                      <p>Rs {shipping.toFixed(2)}</p>
                      <p>Rs {total.toFixed(2)}</p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            {/* Order Tracking */}
            <div className="tracking-container mt-5">
              <h5 className="tracking-title">Track Order</h5>
              <p className="fw-bold">Order #{order._id.slice(-8)} - {order.status}</p>

              <Row className="text-center align-items-center my-4">
                {[
                  { label: "Order Placed", icon: "/media/orderPlaced.png", isActive: true, time: order.createdAt },
                  { label: "Order Dispatched", icon: "/media/orderDispatched.png", isActive: order.status === "Ready for Dispatch" || order.status === "Delivered", time: order.updatedAt },
                  { label: "Delivered Successfully", icon: "/media/delivered.png", isActive: order.status === "Delivered", time: new Date() },
                ].map((step, i) => (
                  <Col key={i} xs={12} sm={4} className="mb-4">
                    <div
                      style={{
                        backgroundColor: step.isActive ? "#002209" : "transparent",
                        border: step.isActive ? "none" : "1px solid lightgray",
                        borderRadius: "50%",
                        padding: "10px",
                        margin: "auto",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={step.icon}
                        alt={step.label}
                        style={{
                          width: "30px",
                          filter: step.isActive ? "brightness(0) invert(1)" : "none",
                        }}
                      />
                    </div>
                    <h6>{step.label}</h6>
                    <p style={{ fontSize: "12px" }}>
                      {step.time ? new Date(step.time).toLocaleDateString() : "—"}
                    </p>
                    <p style={{ fontSize: "12px" }}>
                      {step.time ? new Date(step.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "—"}
                    </p>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        );
      })}
    </Container>
  );
}
