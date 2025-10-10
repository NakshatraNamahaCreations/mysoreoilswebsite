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

{/*import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DownloadPDF from "../../components/DownloadPDF";
import NavbarMenu from "../../components/NavMenuBar";

export default function Order_Details() {
  const [orders, setOrders] = useState([]);
  const [productsIndex, setProductsIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ---------- helpers ----------
  const toNum = (v) => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const variantSalePrice = (variant) => {
    const p = toNum(variant?.price);
    const d = toNum(variant?.discountPrice);
    return d > 0 && d < p ? d : p;
  };

  const bestSaleForProduct = (product) => {
    const vs = Array.isArray(product?.variants) ? product.variants : [];
    if (!vs.length) return { sale: 0, mrp: 0 };
    return vs.reduce(
      (acc, v) => {
        const sale = variantSalePrice(v);
        const mrp = toNum(v?.price) || sale;
        if (acc.sale === null || sale < acc.sale) return { sale, mrp };
        return acc;
      },
      { sale: null, mrp: null }
    );
  };

  // Try to price an order line from backend products
  const backendPriceForItem = (item) => {
    const name = item?.productName;
    if (!name) return null;
    const p = productsIndex[name];
    if (!p) return null;

    // If the order item has variant specifics, try to match
    const weight = String(item?.weight ?? "").trim();
    const unit = String(item?.unit ?? "").trim();

    if (weight && unit && Array.isArray(p.variants)) {
      const v = p.variants.find(
        (vv) =>
          String(vv?.quantity ?? "").trim() === weight &&
          String(vv?.unit ?? "").trim().toLowerCase() === unit.toLowerCase()
      );
      if (v) return variantSalePrice(v);
    }

    // Otherwise, use best (lowest) sale across variants
    return bestSaleForProduct(p).sale ?? null;
  };

  // Normalize items for UI (and compute price from backend)
  const normalizeOrderItems = (order) => {
    const rawItems = Array.isArray(order.items)
      ? order.items
      : [
          {
            productName: order.productName || "",
            productImage: order.productImage || "",
            price: toNum(order.amount) || 0,
            quantity: toNum(order.quantity) || 0,
          },
        ];

    return rawItems.map((it) => {
      const backendPrice = backendPriceForItem(it);
      const price = backendPrice != null ? backendPrice : toNum(it.price);
      return {
        productName: it.productName || "",
        productImage: it.productImage || "",
        quantity: toNum(it.quantity) || 0,
        // keep these if present (so variant matching can succeed)
        weight: it.weight,
        unit: it.unit,
        price,
      };
    });
  };

  // ---------- data fetch ----------
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.email) {
          setOrders([]);
          setLoading(false);
          return;
        }

        // Fetch orders
        const ordersRes = await axios.get("https://api.themysoreoils.com/api/orders");
        const allOrders = ordersRes.data || [];
        const userOrders = allOrders.filter(
          (o) => o?.address?.email === storedUser.email
        );

        // Fetch products for live pricing
        const productsRes = await axios.get("https://api.themysoreoils.com/api/products");
        const productsArr = productsRes.data || [];

        // Build a quick lookup: name -> product
        const idx = {};
        for (const p of productsArr) {
          if (p?.name) idx[p.name] = p;
        }
        setProductsIndex(idx);

        // Store filtered orders (let empty UI handle "no orders" state)
        setOrders(userOrders);
      } catch (err) {
        console.error("❌ Failed to fetch order details:", err?.response?.data || err?.message);
        setError(err?.response?.data?.error || "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) return <Container>Loading order details...</Container>;

  // Fancy empty state (like Wishlist)
  if (!error && (!orders || orders.length === 0)) {
    return (
      <>
    <NavbarMenu/>
      <Container style={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <h1
          style={{
            textAlign: "center",
            letterSpacing: "1px",
            fontSize: "50px",
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          Your Orders
        </h1>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <img
            src="/media/empty-orders.png"
            alt="No orders yet"
            style={{ width: "250px" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/media/wishlist.png"; // fallback image you already have
            }}
          />
          <p style={{ fontFamily: "poppins", marginTop: "12px" }}>
            You haven’t placed any orders yet.
          </p>
          <Button
            variant="dark"
            style={{ padding: "10px 30px", fontFamily: "Poppins", marginTop: "20px" }}
            onClick={() => navigate("/categories")}
          >
            Shop Now
          </Button>
        </div>
      </Container>
      </>
    );
  }

  if (error) return <Container>{error}</Container>;

  return (
    <>
    <NavbarMenu/>
    <Container>
      <h1
        style={{
          textAlign: "center",
          letterSpacing: "1px",
          fontSize: "50px",
          fontWeight: "800",
          textTransform: "uppercase",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        Your Orders
      </h1>

      {orders.map((order, index) => {
        const shipping = toNum(order.shippingFee ?? 0);

        const products = normalizeOrderItems(order);
        const subtotal = products.reduce(
          (acc, p) => acc + toNum(p.price) * toNum(p.quantity),
          0
        );
        const tax = 0;
        const total = subtotal + shipping + tax;

        return (
        
          <div
            key={order._id || index}
            style={{
              boxShadow: "1px 1px 6px #D3B353",
              padding: "20px",
              borderRadius: "10px",
              marginTop: "30px",
            }}
          >
            <h2 style={{ fontWeight: "700", color: "#002209", fontSize: "24px" }}>
              Order #{index + 1}
            </h2>

            {/* Invoice */}
            {/*<div className="p-3 mt-4 order-box">
              <div className="d-flex justify-content-between">
                <h5 className="invoice-title">ORDER INVOICE</h5>
                <DownloadPDF
                  order={order}
                  address={order.address}
                  orderItems={products}
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />
              </div>

              {/* Products Table */}
            {/*}  <div style={{ overflowX: "auto" }}>
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
                                      : `https://api.themysoreoils.com/${item.productImage.replace(
                                          /^\/+/,
                                          ""
                                        )}`
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
                              <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                                {item.productName}
                              </h3>
                              <div>
                                {item.weight && item.unit ? (
                                  <div style={{ fontSize: "14px", opacity: 0.7 }}>
                                    {item.weight} {item.unit}
                                  </div>
                                ) : null}
                                <div style={{ fontSize: "16px", fontWeight: "700" }}>
                                  Rs {toNum(item.price).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{toNum(item.quantity)}</td>
                        <td className="text-end fw-bold">
                          Rs {(toNum(item.price) * toNum(item.quantity)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Shipping & Total */}
            {/*}  <div className="d-flex justify-content-between mt-4">
                <div className="w-50">
                  <p>Shipping Address</p>
                  {order.address ? (
                    <p>
                      {order.address.firstName} {order.address.lastName}
                      <br />
                      {order.address.address}
                      <br />
                      {order.address.city}, {order.address.state} - {order.address.pincode}
                      <br />
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
           {/*} <div className="tracking-container mt-5">
              <h5 className="tracking-title">Track Order</h5>
              <p className="fw-bold">
                Order #{String(order._id || "").slice(-8)} - {order.status}
              </p>

              <Row className="text-center align-items-center my-4">
                {[
                  {
                    label: "Order Placed",
                    icon: "/media/orderPlaced.png",
                    isActive: true,
                    time: order.createdAt,
                  },
                  {
                    label: "Order Dispatched",
                    icon: "/media/orderDispatched.png",
                    isActive:
                      order.status === "Ready for Dispatch" || order.status === "Delivered",
                    time: order.updatedAt,
                  },
                  {
                    label: "Delivered Successfully",
                    icon: "/media/delivered.png",
                    isActive: order.status === "Delivered",
                    time: new Date(),
                  },
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
                      {step.time
                        ? new Date(step.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </p>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        );
      })}
      
    </Container>
    </>
  );
}*/}



import { Container, Table, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DownloadPDF from "../../components/DownloadPDF";
import NavbarMenu from "../../components/NavMenuBar";
import { Breadcrumb } from "react-bootstrap";

export default function Order_Details() {
  const [orders, setOrders] = useState([]);
  const [productsIndex, setProductsIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ---------- helpers ----------
  const toNum = (v) => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const variantSalePrice = (variant) => {
    const p = toNum(variant?.price);
    const d = toNum(variant?.discountPrice);
    return d > 0 && d < p ? d : p;
  };

  const bestSaleForProduct = (product) => {
    const vs = Array.isArray(product?.variants) ? product.variants : [];
    if (!vs.length) return { sale: 0, mrp: 0 };
    return vs.reduce(
      (acc, v) => {
        const sale = variantSalePrice(v);
        const mrp = toNum(v?.price) || sale;
        if (acc.sale === null || sale < acc.sale) return { sale, mrp };
        return acc;
      },
      { sale: null, mrp: null }
    );
  };

  // Try to price an order line from backend products
  const backendPriceForItem = (item) => {
    const name = item?.productName;
    if (!name) return null;
    const p = productsIndex[name];
    if (!p) return null;

    // If the order item has variant specifics, try to match
    const weight = String(item?.weight ?? "").trim();
    const unit = String(item?.unit ?? "").trim();

    if (weight && unit && Array.isArray(p.variants)) {
      const v = p.variants.find(
        (vv) =>
          String(vv?.quantity ?? "").trim() === weight &&
          String(vv?.unit ?? "").trim().toLowerCase() === unit.toLowerCase()
      );
      if (v) return variantSalePrice(v);
    }

    // Otherwise, use best (lowest) sale across variants
    return bestSaleForProduct(p).sale ?? null;
  };

  // Normalize items for UI (and compute price from backend)
  const normalizeOrderItems = (order) => {
    const rawItems = Array.isArray(order.items)
      ? order.items
      : [
          {
            productName: order.productName || "",
            productImage: order.productImage || "",
            price: toNum(order.amount) || 0,
            quantity: toNum(order.quantity) || 0,
          },
        ];

    return rawItems.map((it) => {
      const backendPrice = backendPriceForItem(it);
      const price = backendPrice != null ? backendPrice : toNum(it.price);
      return {
        productName: it.productName || "",
        productImage: it.productImage || "",
        quantity: toNum(it.quantity) || 0,
        // keep these if present (so variant matching can succeed)
        weight: it.weight,
        unit: it.unit,
        price,
      };
    });
  };

  // ---------- data fetch ----------
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedUser = JSON.parse(localStorage.getItem("user"));

        // Hard require login
        if (!storedUser) {
          setLoading(false);
          navigate("/login", { replace: true, state: { from: "/orders" } });
          return;
        }

        const userEmail = (storedUser.email || "").trim().toLowerCase();
        const userId =
          (storedUser.id || storedUser._id || storedUser.userId || "").toString();

        if (!userEmail && !userId) {
          setLoading(false);
          setError("No user identity found. Please log in again.");
          return;
        }

        // Fetch orders (backend returns all -> we filter strictly on client)
        const ordersRes = await axios.get("https://api.themysoreoils.com/api/orders");
        const allOrders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

        // newest first
        allOrders.sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || 0) -
            new Date(a.updatedAt || a.createdAt || 0)
        );

        // STRICT filter: by email (case-insensitive) OR by userId if present in payload
        const userOrders = allOrders.filter((o) => {
          const oEmail = (o?.address?.email || "").trim().toLowerCase();
          const oUserId = (o?.userId || o?.user?._id || "").toString();
          const emailMatch = userEmail && oEmail && oEmail === userEmail;
          const idMatch = userId && oUserId && oUserId === userId;
          return emailMatch || idMatch;
        });

        // Fetch products for live pricing (leave as-is)
        const productsRes = await axios.get("https://api.themysoreoils.com/api/products");
        const productsArr = Array.isArray(productsRes.data) ? productsRes.data : [];

        // Build a quick lookup: name -> product
        const idx = {};
        for (const p of productsArr) {
          if (p?.name) idx[p.name] = p;
        }
        setProductsIndex(idx);

        setOrders(userOrders);
      } catch (err) {
        console.error("❌ Failed to fetch order details:", err?.response?.data || err?.message);
        setError(err?.response?.data?.error || "Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [navigate]);

  if (loading) return <Container>Loading order details...</Container>;

  // Fancy empty state
  if (!error && (!orders || orders.length === 0)) {
    return (
      <>
        <NavbarMenu />
        <Container>
          <div
            className="d-flex justify-content-flex-start align-items-center gap-2"
            style={{ color: "#8d5662", fontSize: "1rem", marginBottom: "30px", padding: "5px" }}
          >
            <Breadcrumb
              style={{ background: "transparent", marginLeft: "10px", marginTop: "5px" }}
            >
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: "/" }}
                className="text-reset text-decoration-none"
                style={{ fontFamily: "poppins" }}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                active
                style={{ color: "#00614a", fontWeight: "bold", fontFamily: "poppins" }}
              >
                Account
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Container>
        <Container style={{ paddingTop: "20px", paddingBottom: "40px" }}>
          <h1
            style={{
              textAlign: "center",
              letterSpacing: "1px",
              fontSize: "50px",
              fontWeight: "800",
              textTransform: "uppercase",
            }}
          >
            Your Orders
          </h1>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <img
              src="/media/empty-orders.png"
              alt="No orders yet"
              style={{ width: "250px" }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/media/wishlist.png";
              }}
            />
            <p style={{ fontFamily: "poppins", marginTop: "12px" }}>
              You haven’t placed any orders yet.
            </p>
            <Button
              variant="dark"
              style={{ padding: "10px 30px", fontFamily: "Poppins", marginTop: "20px" }}
              onClick={() => navigate("/categories")}
            >
              Shop Now
            </Button>
          </div>
        </Container>
      </>
    );
  }

  if (error) return <Container>{error}</Container>;

  return (
    <>
      <NavbarMenu />
      <Container>
        <div
          className="d-flex justify-content-flex-start align-items-center gap-2"
          style={{ color: "#8d5662", fontSize: "1rem", marginBottom: "30px", padding: "5px" }}
        >
          <Breadcrumb
            style={{ background: "transparent", marginLeft: "10px", marginTop: "5px" }}
          >
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: "/" }}
              className="text-reset text-decoration-none"
              style={{ fontFamily: "poppins" }}
            >
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              active
              style={{ color: "#00614a", fontWeight: "bold", fontFamily: "poppins" }}
            >
              Order Details
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Container>

      <Container>
        <h1
          style={{
            textAlign: "center",
            letterSpacing: "1px",
            fontSize: "50px",
            fontWeight: "800",
            textTransform: "uppercase",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          Your Orders
        </h1>

        {orders.map((order, index) => {
          const shipping = toNum(order.shippingFee ?? 0);

          const products = normalizeOrderItems(order);
          const derivedSubtotal = products.reduce(
            (acc, p) => acc + toNum(p.price) * toNum(p.quantity),
            0
          );

          // prefer backend-paid amount if present
          const backendPaid = toNum(order.amount);
          const tax = 0;
          const total = backendPaid > 0 ? backendPaid : derivedSubtotal + shipping + tax;
          const subtotal = backendPaid > 0 ? Math.max(0, total - shipping - tax) : derivedSubtotal;

          return (
            <div
              key={order._id || index}
              style={{
                boxShadow: "1px 1px 6px #D3B353",
                padding: "20px",
                borderRadius: "10px",
                marginTop: "30px",
              }}
            >
              <h2 style={{ fontWeight: "700", color: "#002209", fontSize: "24px" }}>
                Order {order.customOrderId ? `#${order.customOrderId}` : `#${index + 1}`}
              </h2>

              {/* Invoice */}
              <div className="p-3 mt-4 order-box">
                <div className="d-flex justify-content-between">
                  <h5 className="invoice-title">ORDER INVOICE</h5>
                  <DownloadPDF
                    order={order}
                    address={order.address}
                    orderItems={products}
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
                                        : `https://api.themysoreoils.com/${item.productImage.replace(
                                            /^\/+/,
                                            ""
                                          )}`
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
                                <h3 style={{ fontSize: "20px", fontWeight: "700" }}>
                                  {item.productName}
                                </h3>
                                <div>
                                  {item.weight && item.unit ? (
                                    <div style={{ fontSize: "14px", opacity: 0.7 }}>
                                      {item.weight} {item.unit}
                                    </div>
                                  ) : null}
                                  <div style={{ fontSize: "16px", fontWeight: "700" }}>
                                    Rs {toNum(item.price).toFixed(2)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{toNum(item.quantity)}</td>
                          <td className="text-end fw-bold">
                            Rs {(toNum(item.price) * toNum(item.quantity)).toFixed(2)}
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
                        {order.address.firstName} {order.address.lastName}
                        <br />
                        {order.address.address}
                        <br />
                        {order.address.city}, {order.address.state} - {order.address.pincode}
                        <br />
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
               <p className="fw-bold">
  Order #{String(order.customOrderId || order._id || "").slice(-12)} -{" "}
  {order.items[0]?.status || "Pending"}
</p>

                <Row className="text-center align-items-center my-4">
  {[
    {
      label: "Order Placed",
      icon: "/media/orderPlaced.png",
      isActive: true,
      time: order.createdAt,
    },
    {
      label: "Order Dispatched",
      icon: "/media/orderDispatched.png",
      isActive:
        order.items[0]?.status === "Shipped" || order.items[0]?.status === "Delivered",
      time:
        order.items[0]?.status === "Shipped" || order.items[0]?.status === "Delivered"
          ? order.updatedAt
          : null,
    },
    {
      label: "Delivered Successfully",
      icon: "/media/delivered.png",
      isActive: order.items[0]?.status === "Delivered",
      time:
        order.items[0]?.status === "Delivered" ? order.updatedAt : null,
    },
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
        {step.time
          ? new Date(step.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "—"}
      </p>
    </Col>
  ))}
</Row>
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
}
