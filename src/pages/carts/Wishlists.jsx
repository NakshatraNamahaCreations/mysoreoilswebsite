import {
  Container,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import Navbar_Menu from "../../components/Navbar_Menu";
import { FaTrash } from "react-icons/fa";

export default function Wishlists() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // --- helpers ---
  const toNum = (v) => {
    const n = typeof v === "string" ? parseFloat(v) : Number(v);
    return Number.isFinite(n) ? n : 0;
  };
  const variantSale = (v) => {
    const p = toNum(v?.price);
    const d = toNum(v?.discountPrice);
    return d > 0 && d < p ? d : p;
  };
  const bestPriceForProduct = (p) => {
    const vs = Array.isArray(p?.variants) ? p.variants : [];
    if (!vs.length) {
      // fallback to product-level fields if any (rare)
      const dp = toNum(p?.discountPrice);
      const op = toNum(p?.variants?.[0]?.price);
      const sale = dp > 0 && dp < op ? dp : op;
      const mrp = op > 0 ? op : sale;
      return { sale, mrp };
    }
    return vs.reduce(
      (acc, v) => {
        const sale = variantSale(v);
        const mrp = toNum(v?.price) || sale;
        if (acc.sale === null || sale < acc.sale) return { sale, mrp };
        return acc;
      },
      { sale: null, mrp: null }
    );
  };
  const fullImg = (path) =>
    path ? `https://api.themysoreoils.com${String(path).startsWith("/") ? "" : "/"}${path}` : "/media/cart-product.png";

  // fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) return;
      try {
        const res = await axios.get(`https://api.themysoreoils.com/api/wishlist/${user.id}`);
        const arr = Array.isArray(res.data) ? res.data : [];
        // decorate each product with display prices
        const decorated = arr.map((p) => {
          const { sale, mrp } = bestPriceForProduct(p);
          return {
            ...p,
            _displaySale: toNum(sale),
            _displayMrp: toNum(mrp),
          };
        });
        setProducts(decorated);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setProducts([]);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Please log in to remove from wishlist.");
      navigate("/login");
      return;
    }
    try {
      await axios.delete("https://api.themysoreoils.com/api/wishlist/remove", {
        data: { userId: user.id, productId },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product removed from wishlist!");
    } catch (error) {
      if (error.response?.data?.message === "Item not found in wishlist") {
        alert("Product not found in your wishlist.");
      } else {
        console.error("Error removing from wishlist:", error);
        alert("Something went wrong. Try again.");
      }
    }
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((card) =>
        String(card?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const handleCardClick = (name) => {
    // your product route pattern usually uses name without spaces; if you use hyphens, keep this:
    navigate(`/oil-products/${String(name || "").replace(/\s+/g, "")}`);
    // or: navigate(`/oil-products/${String(name || "").replace(/\s+/g, "-")}`);
  };

  return (
    <>
      <Navbar_Menu />
      <div
        className="page-content"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
      >
        <div style={{ backgroundColor: "#fff", padding: "20px", color: "#002209" }}>
          <Container className="mt-4">
            <h1
              style={{
                textAlign: "center",
                letterSpacing: "1px",
                fontSize: "50px",
                fontWeight: "800",
                textTransform: "uppercase",
              }}
            >
              Your Wishlist
            </h1>

            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <img src="/media/wishlist.png" style={{ width: "250px" }} />
                <p style={{ fontFamily: "poppins" }}>No products found in your wishlist.</p>
                <Button
                  variant="dark"
                  style={{ padding: "10px 30px", fontFamily: "Poppins", marginTop: "20px" }}
                  onClick={() => navigate("/categories")}
                >
                  Shop Now
                </Button>
              </div>
            ) : (
              <div
                className="product-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  columnGap: "50px",
                  rowGap: "40px",
                  padding: "10px",
                  margin: "3% auto",
                  width: "90%",
                }}
              >
                {filteredProducts.map((item) => {
                  const img = fullImg(item?.images?.[0]);
                  const sale = toNum(item?._displaySale);
                  const mrp = toNum(item?._displayMrp);
                  const hasDiscount = sale > 0 && mrp > sale;

                  return (
                    <div
                      key={item._id}
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
                        src={img}
                        alt={item.name}
                        className="product-image"
                        style={{ width: "100px", height: "auto", objectFit: "cover", margin: 0 }}
                        onError={(e) => { e.currentTarget.src = "/media/cart-product.png"; }}
                      />

                      <div
                        className="product-info"
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignSelf: "center",
                          marginLeft: "5%",
                          color: "#00614A",
                        }}
                      >
                        <h4 style={{ fontWeight: 700, fontSize: "32px" }}>{item.name}</h4>

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
                              <img key={i} src={star} alt="star" style={{ width: 16, height: 16 }} />
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
                              }}
                            >
                              Rs {mrp}
                            </p>
                          )}
                          <p style={{ fontSize: "28px", fontWeight: 700, margin: 0 }}>
                            {hasDiscount ? `Rs ${sale}` : `Rs ${mrp || sale || 0}`}
                          </p>
                        </div>

                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <Button
                            onClick={() => handleCardClick(item.name)} // pass NAME, not _id
                            variant="none"
                            className="view-button-slider"
                          >
                            VIEW PRODUCT
                          </Button>
                          <Button
                            variant="none"
                            onClick={() => handleRemoveFromWishlist(item._id)}
                            style={{ color: "#FF0000" }}
                            title="Remove from Wishlist"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
