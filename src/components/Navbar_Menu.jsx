{/*import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import './CartIcon.css';
import axios from "axios";

// Image imports
import faHeart from "/media/Whishlistheart.png";
import Account from "/media/Account.png";
import loupe from "/media/loupe.png";
import Cart from "/media/Cart.png"

export default function Navbar_Menu() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const handleSearchToggle = () => setShowSearch(!showSearch);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching:", query);
  };

  const location = useLocation();
 
  const [isOpen, setIsOpen] = useState(false);
   const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const navigate = useNavigate();

 const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
  if (cartItems.length > 0) {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }
}, [cartItems]);

// Define category routes for active state
  const categoryRoutes = ["/chutney-podis", "/pickels", "/karas", "/sweets"];
  const isCategoryActive =
    location.pathname.startsWith("/categories") ||
    location.pathname.startsWith("/spicescategories");

    // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Adjust the API URL based on your backend setup
        const response = await axios.get("https://api.themysoreoils.com/api/categories");
        // Filter only active categories
        const activeCategories = response.data.filter(
          (category) => category.status === "Active"
        );
        setCategories(activeCategories);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch categories");
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);



  return (
    <Navbar expand="lg" className="navbar-sticky banner">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between navbar-collapse">
          {/* Left Nav Links */}
          {/*<Nav className="me-auto navbar-links" style={{ fontSize: "20px", gap: "25px", display: "flex", alignItems: "center" }}>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-hover-effect active-link" : "nav-hover-effect"} style={{ color: "#fff", letterSpacing: "1px", fontWeight: '700' }}>
              HOME
            </NavLink>
            <NavLink to="/best-seller" className={({ isActive }) => isActive ? "nav-hover-effect active-link" : "nav-hover-effect"} style={{ color: "#fff", letterSpacing: "1px", fontWeight: '700' }}>
              BEST SELLER
            </NavLink>

            <NavDropdown
              title={
                <span style={{
                  color: "#fff",
                  letterSpacing: "1px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center"
                }}>
                  CATEGORIES
                  <FontAwesomeIcon icon={faAngleDown} style={{
                    marginLeft: "10px",
                    transition: "transform 0.3s ease",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: "#fff"
                  }} />
                </span>
              }
              className={`nav-hover-effect ${isOpen || isCategoryActive ? "active-link" : ""}`}
              id="basic-nav-dropdown"
              onToggle={(open) => setIsOpen(open)}
            >
             {/*} <div style={{ width: "220px" }}>
                {[
                  { path: "/categories", label: "Oils" },
                  { path: "/dry-fruits", label: "Dry Fruits" },
                  { path: "/MilletCategories", label: "Millets" },
                  { path: "/Snacks", label: "Snacks" },
                  { path: "/IceCreamCategories", label: "Ice Cream" },
                  { path: "/CosmeticsCategory", label: "Cosmetics" },
                  { path: "/home-essentials", label: "Home Essentials" },
                  { path: "/fruits", label: "Fruits" },
                  { path: "/vegetables", label: "Vegetables" },
                  { path: "/Clay-Utensils", label: "Utensils" },
                  { path: "/Gifting-Solutions", label: "Gifting Solutions" }
                ].map(({ path, label }) => (
                  <NavDropdown.Item
                    key={path}
                    as={Link}
                    to={path}
                    className="nav-hover-effect-categories"
                    style={{
                      color: "black",
                      fontSize: "18px",
                      letterSpacing: "1px",
                      fontWeight: "700",
                    }}
                  >
                    {label}
                  </NavDropdown.Item>
                ))}
              </div>*/}

             {/*} <div style={{ width: "220px" }}>
                  {loading ? (
                    <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
                  ) : error ? (
                    <NavDropdown.Item disabled>{error}</NavDropdown.Item>
                  ) : categories.length === 0 ? (
                    <NavDropdown.Item disabled>No categories available</NavDropdown.Item>
                  ) : (
                    categories.map((category) => (
                     <NavDropdown.Item
  key={category._id}
  as={Link}
  to={`/categories?category=${category.name.replace(/\s+/g, "-").toLowerCase()}`}
  className="nav-hover-effect-categories"
  style={{
    color: "black",
    fontSize: "18px",
    letterSpacing: "1px",
    fontWeight: "700",
  }}
>
  {category.name}
</NavDropdown.Item>

                    ))
                  )}
                </div>
            </NavDropdown>
          </Nav>

          {/* Right Icons */}
        {/*}  <div className="d-flex gap-3 text-white navbar-icons">
            {/* Search */}
          {/*}  <div className="icon-box" onClick={handleSearchToggle} style={{ cursor: "pointer" }}>
              <img src={loupe} alt="Search-Icon" className="icon-img" />
            </div>

            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="d-flex align-items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="form-control"
                  style={{ maxWidth: "200px" }}
                  autoFocus
                />
              </form>
            )}

            {/* Wishlist */}
          {/*}  <div className="icon-box">
              <Link to="/wishlist">
                <img src={faHeart} alt="Wishlist-Icon" className="icon-img" />
              </Link>
            </div>

            {/* Cart with bounce animation */}
          {/*}  <Link to="/carts" className="cart-wrapper">
              <div className={`cart-icon ${animate ? 'cart-bounce' : ''} icon-box`}>
                <img src={Cart} alt="cart-icon" className="icon-img"/>
                {itemCount > 0 && (
                  <span className="cart-count">{itemCount}</span>
                )}
              </div>
            </Link>

            {/* Account */}
           {/*} <div className="icon-box">
              <Link to="/login">
                <img src={Account} alt="Account-Icon" className="icon-img" />
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}*/}
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import "./CartIcon.css";

// Images
import faHeart from "/media/Whishlistheart.png";
import Account from "/media/Account.png";
import loupe from "/media/loupe.png";
import Cart from "/media/Cart.png";

// ====== CONFIG ======
const CATEGORIES_URL = "https://api.themysoreoils.com/api/categories";
const PRODUCTS_URL = "https://api.themysoreoils.com/api/products"; // list endpoint (NOT /search)
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h cache

// In-memory cache for this session
let __PRODUCT_INDEX_MEMO = null;

// Build/load a lightweight product index and cache it
async function loadProductIndex() {
  if (__PRODUCT_INDEX_MEMO && Array.isArray(__PRODUCT_INDEX_MEMO)) return __PRODUCT_INDEX_MEMO;

  // localStorage cache
  try {
    const raw = localStorage.getItem("productIndexCache");
    if (raw) {
      const { at, items } = JSON.parse(raw);
      if (Array.isArray(items) && Date.now() - at < CACHE_TTL_MS) {
        __PRODUCT_INDEX_MEMO = items;
        return items;
      }
    }
  } catch {}

  // Fetch from API
  const res = await axios.get(PRODUCTS_URL);
  const items = Array.isArray(res.data) ? res.data : (res.data?.items || []);

  const index = items.map((p) => {
    // Prefer real product fields; never fall back to category
    const displayName = String(p.productName || p.name || p.title || "").trim();
    const nameNoSpaces = displayName.replace(/\s+/g, "");

    return {
      _id: p._id,
      name: displayName,
      link: `/oil-products/${nameNoSpaces}`, // same format as your Categories page
      imageUrl: p.images?.[0]
        ? `https://api.themysoreoils.com${p.images[0]}`
        : "/media/placeholder.png",
      categoryName: p.category || "",
      slug: p.slug || p._id,
    };
  });

  __PRODUCT_INDEX_MEMO = index;
  try {
    localStorage.setItem("productIndexCache", JSON.stringify({ at: Date.now(), items: index }));
  } catch {}
  return index;
}

// Simple contains match (case-insensitive)
function matchIncludes(hay, needle) {
  return String(hay || "").toLowerCase().includes(String(needle || "").toLowerCase());
}

// Product match on name or category
function productMatches(p, q) {
  const s = q.toLowerCase();
  return (
    String(p.name || "").toLowerCase().includes(s) ||
    String(p.categoryName || "").toLowerCase().includes(s)
  );
}

export default function Navbar_Menu() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [productIndexReady, setProductIndexReady] = useState(false);

  const searchWrapRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Cart badge (Redux)
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cartItems]);

  const isCategoryActive =
    location.pathname.startsWith("/categories") || location.pathname.startsWith("/spicescategories");

  // Fetch categories once
  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await axios.get(CATEGORIES_URL);
        const active = (res.data || []).filter((c) => c.status === "Active");
        setCategories(active);
      } catch (e) {
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  // Warm up product index
  useEffect(() => {
    let mounted = true;
    loadProductIndex()
      .then(() => mounted && setProductIndexReady(true))
      .catch(() => mounted && setProductIndexReady(false));
    return () => { mounted = false; };
  }, []);

  const handleSearchToggle = () => {
    setShowSearch((s) => !s);
    setShowSuggestions(false);
    if (!showSearch) setTimeout(() => setShowSuggestions(true), 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // click outside to close suggestion panel
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Debounced suggestions (client-side)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({ products: [], categories: [] });
      return;
    }
    let cancelled = false;
    setIsSearching(true);
    const t = setTimeout(async () => {
      try {
        // categories – local filter
        const catMatches = categories.filter((c) => matchIncludes(c.name, query)).slice(0, 6);

        // products – from client-side index
        let prodMatches = [];
        if (productIndexReady) {
          const idx = await loadProductIndex();
          prodMatches = idx.filter((p) => productMatches(p, query)).slice(0, 6);
        }

        if (!cancelled) setSuggestions({ products: prodMatches, categories: catMatches });
      } finally {
        if (!cancelled) setIsSearching(false);
        if (!cancelled) setShowSuggestions(true);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query, categories, productIndexReady]);

  const toSlug = (s) => s.toLowerCase().replace(/\s+/g, "-");

  return (
    <Navbar expand="lg" className="navbar-sticky banner">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between navbar-collapse">
          {/* Left */}
          <Nav
            className="me-auto navbar-links"
            style={{ fontSize: "20px", gap: "25px", display: "flex", alignItems: "center" }}
          >
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "nav-hover-effect active-link" : "nav-hover-effect")}
              style={{ color: "#fff", letterSpacing: "1px", fontWeight: "700" }}
            >
              HOME
            </NavLink>
            <NavLink
              to="/best-seller"
              className={({ isActive }) => (isActive ? "nav-hover-effect active-link" : "nav-hover-effect")}
              style={{ color: "#fff", letterSpacing: "1px", fontWeight: "700" }}
            >
              BEST SELLER
            </NavLink>

            <NavDropdown
              title={
                <span
                  style={{
                    color: "#fff",
                    letterSpacing: "1px",
                    fontWeight: "700",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  CATEGORIES
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    style={{
                      marginLeft: "10px",
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: "#fff",
                    }}
                  />
                </span>
              }
              className={`nav-hover-effect ${isOpen || isCategoryActive ? "active-link" : ""}`}
              id="basic-nav-dropdown"
              onToggle={(open) => setIsOpen(open)}
            >
              <div style={{ width: "240px" }}>
  {loading ? (
    <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
  ) : error ? (
    <NavDropdown.Item disabled>{error}</NavDropdown.Item>
  ) : categories.length === 0 ? (
    <NavDropdown.Item disabled>No categories available</NavDropdown.Item>
  ) : (
    categories
      .filter((category) => category.name.toLowerCase() === "oils") // ✅ only Oils category
      .map((category) => (
        <NavDropdown.Item
          key={category._id}
          as={Link}
          to={`/categories?category=${encodeURIComponent(
            category.slug || toSlug(category.name)
          )}`}
          className="nav-hover-effect-categories"
          style={{
            color: "black",
            fontSize: "18px",
            letterSpacing: "1px",
            fontWeight: "700",
          }}
        >
          {category.name}
        </NavDropdown.Item>
      ))
  )}
</div>

            </NavDropdown>
          </Nav>

          {/* Right & Search */}
          <div className="d-flex gap-3 text-white navbar-icons" ref={searchWrapRef}>
            <div className="icon-box position-relative" onClick={handleSearchToggle} style={{ cursor: "pointer" }}>
              <img src={loupe} alt="Search-Icon" className="icon-img" />
            </div>

            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="d-flex align-items-center position-relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products or categories…"
                  className="form-control"
                  style={{ maxWidth: "260px" }}
                  autoFocus
                  onFocus={() => query && setShowSuggestions(true)}
                />

                {/* Suggestions */}
                {showSuggestions && (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
                  <div
                    className="position-absolute bg-white rounded shadow"
                    style={{
                      top: "110%",
                      left: 0,
                      width: "360px",
                      maxHeight: "380px",
                      overflowY: "auto",
                      zIndex: 1050,
                      padding: "8px",
                    }}
                  >
                    {isSearching && (
                      <div className="px-2 py-1 text-muted" style={{ fontSize: 14 }}>
                        Searching…
                      </div>
                    )}

                    {suggestions.products.length > 0 && (
                      <>
                        <div className="px-2 pt-1 pb-2 text-secondary" style={{ fontSize: 12, fontWeight: 700 }}>
                          PRODUCTS
                        </div>
                        {suggestions.products.map((p) => (
                          <button
                            key={p._id}
                            type="button"
                            className="dropdown-item d-flex align-items-center"
                            onClick={() => {
                              setShowSuggestions(false);
                              navigate(p.link);
                            }}
                          >
                            <img
                              src={p.imageUrl}
                              alt={p.name}
                              style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4, marginRight: 8 }}
                            />
                            <div className="d-flex flex-column">
                              <span style={{ fontSize: 14, fontWeight: 600, color:"#000" }}>{p.name}</span>
                              {p.categoryName && (
                                <span className="text-muted" style={{ fontSize: 12 }}>
                                  {p.categoryName}
                                </span>
                              )}
                            </div>
                          </button>
                        ))}
                        <div className="dropdown-divider" />
                      </>
                    )}

                    {suggestions.categories.length > 0 && (
                      <>
                        <div className="px-2 pt-1 pb-2 text-secondary" style={{ fontSize: 12, fontWeight: 700 }}>
                          CATEGORIES
                        </div>
                       {suggestions.categories
  .filter((c) => c.name.toLowerCase() === "oils") 
  .map((c) => (
    <button
      key={c._id}
      type="button"
      className="dropdown-item"
      onClick={() => {
        setShowSuggestions(false);
        navigate(
          `/categories?category=${encodeURIComponent(
            c.slug || c.name.toLowerCase().replace(/\s+/g, "-")
          )}`
        );
      }}
    >
      {c.name}
    </button>
))}
                      </>
                    )}

                    <div className="mt-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary w-100"
                        onClick={() => {
                          setShowSuggestions(false);
                          navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                        }}
                      >
                        View all results for “{query.trim()}”
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}

            {/* Icons */}
            <div className="icon-box">
              <Link to="/wishlist">
                <img src={faHeart} alt="Wishlist-Icon" className="icon-img" />
              </Link>
            </div>

            <Link to="/carts" className="cart-wrapper">
              <div className={`cart-icon ${animate ? "cart-bounce" : ""} icon-box`}>
                <img src={Cart} alt="cart-icon" className="icon-img" />
                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
              </div>
            </Link>

            <div className="icon-box">
              <Link to="/login">
                <img src={Account} alt="Account-Icon" className="icon-img" />
              </Link>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
