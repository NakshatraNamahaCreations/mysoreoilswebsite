// src/components/Navbar_Menu.jsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

import "./CartIcon.css";

/* Icons/Images */
import faHeart from "/media/Whishlistheart.png";
import Account from "/media/Account.png";
import loupe from "/media/loupe.png";
import Cart from "/media/Cart.png";

/* ====== CONFIG ====== */
const CATEGORIES_URL = "https://api.themysoreoils.com/api/categories";
const PRODUCTS_URL = "https://api.themysoreoils.com/api/products";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h cache

/* ====== PRODUCT INDEX LOADER (with caching) ====== */
let __PRODUCT_INDEX_MEMO = null;

async function loadProductIndex() {
  if (__PRODUCT_INDEX_MEMO && Array.isArray(__PRODUCT_INDEX_MEMO)) return __PRODUCT_INDEX_MEMO;

  // Try localStorage cache
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

  // Fetch fresh
  const res = await axios.get(PRODUCTS_URL);
  const items = Array.isArray(res.data) ? res.data : res.data?.items || [];

  const index = items.map((p) => {
    const displayName = String(p.productName || p.name || p.title || "").trim();
    const nameNoSpaces = displayName.replace(/\s+/g, "");
    return {
      _id: p._id,
      name: displayName,
      link: `/oil-products/${nameNoSpaces}`, // adjust if your route differs
      imageUrl: p.images?.[0] ? `https://api.themysoreoils.com${p.images[0]}` : "/media/placeholder.png",
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

export default function Navbar_Menu() {
  /* ====== State ====== */
  const [isOpen, setIsOpen] = useState(false); // categories dropdown (both)
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartToast, setCartToast] = useState(null);


  // Offcanvas (mobile)
  const [showDrawer, setShowDrawer] = useState(false);

  // Search (desktop + mobile)
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState({ products: [], categories: [] });
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
      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    }
  }, [cartItems]);

  const isCategoryActive =
    location.pathname.startsWith("/shop") ||
    location.pathname.startsWith("/spicescategories");

    const prevCountRef = useRef(0);

useEffect(() => {
  const totalQty = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);

  // Detect ADD (not remove)
  if (totalQty > prevCountRef.current) {
    const lastItem = cartItems[cartItems.length - 1];

    setCartToast({
      name: lastItem.name,
      image: lastItem.image,
    });

    setTimeout(() => setCartToast(null), 1500);
  }

  prevCountRef.current = totalQty;
}, [cartItems]);


  /* ====== Effects ====== */
  // Fetch categories
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

  // Warm product index
  useEffect(() => {
    let mounted = true;
    loadProductIndex()
      .then(() => mounted && setProductIndexReady(true))
      .catch(() => mounted && setProductIndexReady(false));
    return () => {
      mounted = false;
    };
  }, []);

  // Close drawer & search on route change
  useEffect(() => {
    setShowDrawer(false);
    setShowSearch(false);
    setShowSuggestions(false);
  }, [location.pathname]);

  // Click-outside closes suggestions (desktop)
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!searchWrapRef.current) return;
      if (!searchWrapRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", onClickOutside, { passive: true });
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Debounced suggestions (shared for desktop + mobile)
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({ products: [], categories: [] });
      return;
    }
    let cancelled = false;
    setIsSearching(true);

    const t = setTimeout(async () => {
      try {
        const q = query.toLowerCase();

        const catMatches = categories
          .filter((c) => String(c.name || "").toLowerCase().includes(q))
          .slice(0, 8);

        let prodMatches = [];
        if (productIndexReady) {
          const idx = await loadProductIndex();
          prodMatches = idx
            .filter(
              (p) =>
                String(p.name || "").toLowerCase().includes(q) ||
                String(p.categoryName || "").toLowerCase().includes(q)
            )
            .slice(0, 6);
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

  /* ====== Helpers ====== */
  const toSlug = (s) => String(s || "").toLowerCase().replace(/\s+/g, "-");

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
    setShowSuggestions(false);
    // Desktop suggestions will open on input focus; on mobile we'll open after typing
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setShowSuggestions(false);
    setShowSearch(false);
  };

  /* ====== Render ====== */
  return (
    <>
      <Navbar expand="md" className="navbar-sticky" sticky="top">
        <Container fluid className="px-3">
          {/* ===== MOBILE HEADER ROW (< md) ===== */}
          <div className="d-flex d-md-none w-100 align-items-center justify-content-between">
            {/* LEFT: Logo */}
            <Link to="/" className="d-inline-flex align-items-center">
              {/* <img
                src="/media/MysuruOilsLogo.png"
                alt="Mysuru Oils"
                style={{ height: 50, objectFit: "contain", marginRight: "10px" }}
                loading="lazy"
              /> */}
               <img src="/media/mysoillogo.png" alt="elephant logo" style={{height:50, objectFit:"contain"}} className="logohead-img"/>
          <span className="logo-head">The Mysore oils</span>
            </Link>

            {/* RIGHT: search + wishlist + cart + account + hamburger */}
            <div className="d-flex align-items-center gap-2 icons" >
              <button
                aria-label="Open search"
                className="icons-btn"
                type="button"
                onClick={() => setShowSearch((s) => !s)}
              >
                <img src={loupe} alt="Search" className="icons-img" loading="lazy" width={15} height={15}/>
              </button>

              {/* <Link to="/wishlist" aria-label="Wishlist" className="icon-box">
                <img src={faHeart} alt="Wishlist" className="icon-img" loading="lazy" />
              </Link> */}

              <Link to="/carts" className="cart-wrapper" aria-label="Cart">
                <div className={`cart-icon ${animate ? "cart-bounce" : ""} icons-box`}>
                  <img src={Cart} alt="Cart" className="icons-img" loading="lazy" />
                  {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </div>
              </Link>

              {/* <Link to="/login" aria-label="Account" className="icon-box">
                <img src={Account} alt="Account" className="icon-img" loading="lazy" />
              </Link> */}

              {/* Hamburger */}
              <Navbar.Toggle
                aria-controls="main-offcanvas"
                className="border-0 shadow-none"
                onClick={() => setShowDrawer(true)}
              />
            </div>
          </div>

          {/* ===== DESKTOP BAR (>= md) ===== */}
          <div className="d-none d-md-flex w-100 align-items-center justify-content-between gap-3">
            {/* Logo */}
            <Link to="/" className="d-inline-flex align-items-center">
            {/*}  <img
                src="/media/MysuruOilsLogo.png"
                alt="Mysuru Oils"
                style={{ height:95, objectFit: "contain" }}
              />*/}
              <img src="/media/mysoillogo.png" alt="elephant logo" style={{height:90, objectFit:"contain"}}/>
          <span className="logohead">The Mysore oils</span>
              
            </Link>

            {/* Links */}
            <Nav className="align-items-center" style={{ gap: 24 }}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-hover-effect active-link" : "nav-hover-effect"
                }
              >
                HOME
              </NavLink>


              {/* Categories dropdown */}
              <NavDropdown
                title={
                  <span
                    className="nav-title"
                    style={{ fontFamily: "poppins", color: "#fff", fontWeight: 700, fontSize: 16, letterSpacing:"1px" }}
                  >
                    SHOP
                    <FontAwesomeIcon icon={faAngleDown} className={`ms-2 ${isOpen ? "rotate-180" : ""}`} />
                  </span>
                }
                id="desktop-categories"
                onToggle={(open) => setIsOpen(open)}
                className={isOpen || isCategoryActive ? "active-link" : ""}
              >
                <div style={{ width: 260, fontFamily: "poppins", fontSize: 18, fontWeight: 700 }}>
                  {loading && <NavDropdown.Item disabled>Loading…</NavDropdown.Item>}
                  {error && <NavDropdown.Item disabled>{error}</NavDropdown.Item>}
                  {!loading && !error && categories.length === 0 && (
                    <NavDropdown.Item disabled>No categories available</NavDropdown.Item>
                  )}
                  {!loading &&
                    !error &&
                    categories.map((category) => (
                      <NavDropdown.Item
                        key={category._id}
                        as={Link}
                        to={`/shop?category=${encodeURIComponent(
                          category.slug || toSlug(category.name)
                        )}`}
                      >
                        {category.name}
                      </NavDropdown.Item>
                    ))}
                </div>
              </NavDropdown>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-hover-effect active-link" : "nav-hover-effect"
                }
              >
                CONTACT US
              </NavLink>
            </Nav>

            {/* Right icons + desktop search */}
            <div className="d-flex align-items-center gap-3" ref={searchWrapRef}>
              <div className="icon-box position-relative" onClick={handleSearchToggle}>
                <img src={loupe} alt="Search" className="icon-img" loading="lazy" />
              </div>

              {showSearch && (
                <form
                  onSubmit={handleSearchSubmit}
                  className="d-flex align-items-center position-relative d-none d-md-flex"
                >
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products or categories…"
                    className="form-control"
                    style={{ maxWidth: "260px" }}
                    autoFocus
                    onFocus={() => query && setShowSuggestions(true)}
                    inputMode="search"
                    aria-label="Search products or categories"
                  />

                  {/* Suggestions dropdown (desktop) */}
                  {showSuggestions &&
                    (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
                      <div
                        className="position-absolute bg-white rounded shadow desktop-suggest"
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
                            <div
                              className="px-2 pt-1 pb-2 text-secondary"
                              style={{ fontSize: 12, fontWeight: 700 }}
                            >
                              PRODUCTS
                            </div>
                            {suggestions.products.map((p) => (
                              <button
                                key={p._id}
                                type="button"
                                className="dropdown-item d-flex align-items-center"
                                onClick={() => {
                                  setShowSuggestions(false);
                                  setShowSearch(false);
                                  navigate(p.link);
                                }}
                              >
                                <img
                                  src={p.imageUrl}
                                  alt={p.name}
                                  loading="lazy"
                                  style={{
                                    width: 36,
                                    height: 36,
                                    objectFit: "cover",
                                    borderRadius: 4,
                                    marginRight: 8,
                                  }}
                                />
                                <div className="d-flex flex-column">
                                  <span style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                                    {p.name}
                                  </span>
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
                            <div
                              className="px-2 pt-1 pb-2 text-secondary"
                              style={{ fontSize: 12, fontWeight: 700 }}
                            >
                              CATEGORIES
                            </div>
                            {suggestions.categories.map((c) => (
                              <button
                                key={c._id}
                                type="button"
                                className="dropdown-item"
                                onClick={() => {
                                  setShowSuggestions(false);
                                  setShowSearch(false);
                                  navigate(
                                    `/shop?category=${encodeURIComponent(
                                      c.slug ||
                                        String(c.name || "")
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")
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
                              if (!query.trim()) return;
                              setShowSuggestions(false);
                              setShowSearch(false);
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

              <Link to="/wishlist" className="icon-box" aria-label="Wishlist">
                <img src={faHeart} alt="" className="icon-img" />
              </Link>

              <Link to="/carts" className="cart-wrapper" aria-label="Cart">
                <div className={`cart-icon ${animate ? "cart-bounce" : ""} icon-box`}>
                  <img src={Cart} alt="" className="icon-img" />
                  {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </div>
              </Link>

              <Link to="/login" className="icon-box" aria-label="Account">
                <img src={Account} alt="" className="icon-img" />
              </Link>
            </div>
                
          </div>

          {/* ===== OFFCANVAS DRAWER (MOBILE ONLY) ===== */}
          <Navbar.Offcanvas
            id="main-offcanvas"
            aria-labelledby="main-offcanvas-label"
            placement="start"
            className="d-md-none mobile-offcanvas"
            restoreFocus
            scroll={false}
            show={showDrawer}
            onHide={() => setShowDrawer(false)}
          >
            {/* Header: close button only / optional title */}
            <Offcanvas.Header className="mo-header" closeButton>
              <Offcanvas.Title id="main-offcanvas-label" style={{fontFamily:"montserrat", fontWeight:"700"}}>Menu</Offcanvas.Title>
            </Offcanvas.Header>

            {/* Body: left-aligned, stacked menu */}
            <Offcanvas.Body className="mo-body">
              <nav className="mo-links" aria-label="Mobile navigation">
                <NavLink
                  to="/"
                  onClick={() => setShowDrawer(false)}
                  className={({ isActive }) => (isActive ? "mo-link active" : "mo-link")}
                >
                  HOME
                </NavLink>

                <NavLink
                  to="/best-seller"
                  onClick={() => setShowDrawer(false)}
                  className={({ isActive }) => (isActive ? "mo-link active" : "mo-link")}
                >
                  BEST SELLER
                </NavLink>

                {/* Mobile Categories (accordion) */}
                <div className={`mo-accordion ${isOpen ? "open" : ""}`}>
                  <button
                    className="mo-acc-btn"
                    aria-expanded={isOpen}
                    aria-controls="mo-acc-panel"
                    onClick={() => setIsOpen((v) => !v)}
                  >
                    <span>CATEGORIES</span>
                    <FontAwesomeIcon icon={faAngleDown} className="chev" />
                  </button>

                  <div id="mo-acc-panel" className="mo-acc-panel" hidden={!isOpen}>
                    <div className="mo-acc-inner">
                      {loading && <div className="mo-muted">Loading…</div>}
                      {error && <div className="mo-muted">{error}</div>}
                      {!loading && !error && categories.length === 0 && (
                        <div className="mo-muted">No categories available</div>
                      )}
                      {!loading &&
                        !error &&
                        categories.map((category) => (
                          <Link
                            key={category._id}
                            to={`/shop?category=${encodeURIComponent(
                              category.slug ||
                                String(category.name || "").toLowerCase().replace(/\s+/g, "-")
                            )}`}
                            className="mo-acc-link"
                            onClick={() => setShowDrawer(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:"10px", marginTop:"30px"}}>
                <Link to="/wishlist" aria-label="Wishlist" className="icon-box">
                <img src={faHeart} alt="Wishlist" className="icon-img" loading="lazy" />
              </Link>

              <Link to="/login" aria-label="Account" className="icon-box">
                <img src={Account} alt="Account" className="icon-img" loading="lazy" />
              </Link>
              </div>
              </nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Mobile search bar + suggestions (same logic as desktop) */}
      {showSearch && (
        <div
          className="d-md-none"
          style={{
            background: "#0b1220",
            color: "#fff",
            padding: "10px 12px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="d-flex align-items-center gap-2"
          >
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or categories…"
              className="form-control"
              autoFocus
              inputMode="search"
              aria-label="Search products or categories"
              onFocus={() => query && setShowSuggestions(true)}
            />
            <button
              type="submit"
              className="btn btn-light btn-sm"
              style={{ whiteSpace: "nowrap" }}
            >
              Search
            </button>
          </form>

          {showSuggestions &&
            (suggestions.products.length > 0 || suggestions.categories.length > 0) && (
              <div
                className="mt-2 rounded"
                style={{
                  background: "#fff",
                  color: "#000",
                  maxHeight: 320,
                  overflowY: "auto",
                  padding: 8,
                }}
              >
                {isSearching && (
                  <div className="px-2 py-1 text-muted" style={{ fontSize: 14 }}>
                    Searching…
                  </div>
                )}

                {/* Product suggestions (mobile) */}
                {suggestions.products.length > 0 && (
                  <>
                    <div
                      className="px-2 pt-1 pb-2 text-secondary"
                      style={{ fontSize: 12, fontWeight: 700 }}
                    >
                      PRODUCTS
                    </div>
                    {suggestions.products.map((p) => (
                      <button
                        key={p._id}
                        type="button"
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => {
                          setShowSuggestions(false);
                          setShowSearch(false);
                          navigate(p.link);
                        }}
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          loading="lazy"
                          style={{
                            width: 36,
                            height: 36,
                            objectFit: "cover",
                            borderRadius: 4,
                            marginRight: 8,
                          }}
                        />
                        <div className="d-flex flex-column">
                          <span style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>
                            {p.name}
                          </span>
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

                {/* Category suggestions (mobile) */}
                {suggestions.categories.length > 0 && (
                  <>
                    <div
                      className="px-2 pt-1 pb-2 text-secondary"
                      style={{ fontSize: 12, fontWeight: 700 }}
                    >
                      CATEGORIES
                    </div>
                    {suggestions.categories.map((c) => (
                      <button
                        key={c._id}
                        type="button"
                        className="dropdown-item"
                        onClick={() => {
                          setShowSuggestions(false);
                          setShowSearch(false);
                          navigate(
                            `/shop?category=${encodeURIComponent(
                              c.slug ||
                                String(c.name || "")
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")
                            )}`
                          );
                        }}
                      >
                        {c.name}
                      </button>
                    ))}
                  </>
                )}

                {/* View all results (mobile) */}
                <div className="mt-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary w-100"
                    onClick={() => {
                      if (!query.trim()) return;
                      setShowSuggestions(false);
                      setShowSearch(false);
                      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                    }}
                  >
                    View all results for “{query.trim()}”
                  </button>
                </div>
              </div>
            )}
        </div>
      )}

      {cartToast && (
  <div className="nav-cart-toast">
    <img
      src={cartToast.image}
      alt={cartToast.name}
      className="nav-cart-toast-img"
    />
    <div className="nav-cart-toast-text">
      <strong>Added to cart</strong>
      <span>{cartToast.name}</span>
    </div>
  </div>
)}

    </>
  );
}
