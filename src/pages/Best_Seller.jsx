import {
  Container,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Navbar_Menu from "../components/Navbar_Menu";
import { FaHeart } from "react-icons/fa";

const API_BASE = "https://api.themysoreoils.com";

// ---------- helpers ----------
const toNum = (v) => {
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : 0;
};

const buildImageUrl = (path) => {
  if (!path) return "/media/default.jpg";
  const p = String(path);
  if (p.startsWith("http")) return p;
  if (p.startsWith("/media")) return p; // keep local media
  return `${API_BASE}${p.startsWith("/") ? p : `/${p}`}`;
};

/**
 * Compute prices across variants:
 * - If v.discountPrice > 0 and < v.price  → sale = v.discountPrice, mrp = v.price
 * - If v.discountPrice > v.price          → sale = v.price, mrp = v.discountPrice (MRP stored in discountPrice)
 * - Else                                  → sale = v.price, mrp = max(v.price, product.discountPrice)
 * Picks the variant with the LOWEST sale.
 * If no variants, falls back to product-level fields similarly.
 */
const computeVariantPricePair = (product) => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const productLevelMRP = toNum(product?.discountPrice);

  if (variants.length) {
    let bestSale = Infinity;
    let bestMrp = Infinity;

    for (const v of variants) {
      const base = toNum(v?.price);
      const dp = toNum(v?.discountPrice);
      let sale = base;
      let mrp = base;

      if (dp > 0 && dp < base) {
        sale = dp;
        mrp = base;
      } else if (dp > base) {
        sale = base;
        mrp = dp;
      } else if (productLevelMRP > base) {
        sale = base;
        mrp = productLevelMRP;
      }

      if (sale < bestSale) {
        bestSale = sale;
        bestMrp = mrp;
      }
    }

    if (!Number.isFinite(bestSale)) bestSale = 0;
    if (!Number.isFinite(bestMrp)) bestMrp = bestSale;
    return { sale: bestSale, mrp: bestMrp };
  }

  // Fallback (no variants)
  const base =
    toNum(product?.price) ||
    toNum(product?.originalPrice) ||
    0;
  const dp =
    toNum(product?.discountPrice) ||
    toNum(product?.discountedPrice) ||
    0;

  let sale = base;
  let mrp = base;
  if (dp > 0 && dp < base) {
    sale = dp;
    mrp = base;
  } else if (dp > base) {
    sale = base;
    mrp = dp;
  } else if (productLevelMRP > base) {
    mrp = productLevelMRP;
  }
  return { sale, mrp };
};

export default function Best_Seller() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        const data = Array.isArray(res.data) ? res.data : res.data?.products || [];

        const formatted = data.map((product) => {
          const { sale, mrp } = computeVariantPricePair(product);
          const image = buildImageUrl(product.images?.[0] || "/media/default.jpg");
          return {
            id: product._id,
            name: product.name,
            image,
            originalPrice: mrp,         // MRP (strike)
            discountedPrice: sale,      // selling price (prominent)
          };
        });

        setProducts(formatted);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToWishlist = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Please log in to add to wishlist.");
      navigate("/login");
      return;
    }
    try {
      await axios.post(`${API_BASE}/api/wishlist/add`, {
        userId: user.id,
        productId,
      });
      alert("Product added to wishlist!");
    } catch (err) {
      if (err.response?.data?.message === "Product already in wishlist") {
        alert("Product is already in your wishlist.");
      } else {
        console.error("Error adding to wishlist:", err);
        alert("Something went wrong. Try again.");
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (name) => {
    // Your PDP route expects the name without spaces (based on your other screens)
    navigate(`/oil-products/${name.replace(/\s+/g, "")}`);
  };

  return (
    <>
      <Navbar_Menu />
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div>
          {/* SEARCH */}
          <Container className="mt-3">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* GRID */}
          <div
            style={{
              backgroundColor: "#ffff",
              padding: "20px",
              color: "#002209",
            }}
          >
            <Container className="mt-4">
              <h1
                style={{
                  textAlign: "center",
                  letterSpacing: "1px",
                  fontSize: "50px",
                  fontWeight: "800",
                }}
              >
                BEST SELLER
              </h1>

              <div
                className="product-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: "50px",
                  rowGap: "40px",
                  margin: "auto",
                  marginTop: "3%",
                  width: "90%",
                }}
              >
                {filteredProducts.length === 0 ? (
                  <p style={{ textAlign: "center", marginTop: "40px" }}>
                    No products found.
                  </p>
                ) : (
                  filteredProducts.map((item) => {
                    const hasDiscount =
                      toNum(item.originalPrice) > toNum(item.discountedPrice) &&
                      toNum(item.discountedPrice) > 0;

                    return (
                      <div
                        key={item.id}
                        className="product-card"
                        style={{
                          border: "2px solid #00614A",
                          boxShadow: "1px 1px 6px #00614A",
                          borderRadius: "20px",
                          width: "85%",
                          maxWidth: "600px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "24px auto",
                          padding: "12px 40px",
                          gap: "25px",
                          backgroundColor: "#fff",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "160px",
                            height: "200px",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.currentTarget.src = "/media/default.jpg";
                          }}
                        />
                        <div
                          className="product-info"
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignSelf: "center",
                            marginLeft: "3%",
                            color: "#00614A",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <h4
                              style={{
                                fontWeight: "700",
                                fontSize: "22px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.name}
                            </h4>
                            <Button
                              variant="none"
                              onClick={() => handleAddToWishlist(item.id)}
                              style={{ fontSize: "20px", color: "#00614A" }}
                              title="Add to Wishlist"
                            >
                              <FaHeart />
                            </Button>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              gap: "5px",
                              marginBottom: "10px",
                            }}
                          >
                            {[visiblestar, visiblestar, visiblestar, visiblestar, hiddenstar].map(
                              (star, i) => (
                                <img
                                  key={i}
                                  src={star}
                                  alt="star"
                                  style={{ width: "16px", height: "16px" }}
                                />
                              )
                            )}
                          </div>

                          <div
                            className="product-price"
                            style={{
                              display: "flex",
                              alignItems: "baseline",
                              gap: "8px",
                              marginBottom: "16px",
                            }}
                          >
                            {hasDiscount && (
                              <p
                                style={{
                                  opacity: 0.5,
                                  textDecoration: "line-through",
                                  fontSize: "18px",
                                  margin: 0,
                                  fontWeight: 700,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Rs {item.originalPrice}
                              </p>
                            )}
                            <p
                              style={{
                                fontSize: "28px",
                                fontWeight: 700,
                                margin: 0,
                                whiteSpace: "nowrap",
                              }}
                            >
                              Rs {hasDiscount ? item.discountedPrice : item.originalPrice}
                            </p>
                          </div>

                          <div>
                            <Button
                              onClick={() => handleCardClick(item.name)}
                              variant="none"
                              className="view-button-slider"
                              style={{
                                border: "2px solid #00614A",
                                color: "#00614A",
                                padding: "6px 12px",
                                borderRadius: "25px",
                                fontSize: "12px",
                              }}
                            >
                              VIEW PRODUCT
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Container>
          </div>

          <Reviews />
          <ScrollToTop />
          <Footer />
        </div>
      </div>
    </>
  );
}
