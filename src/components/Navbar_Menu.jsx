import { useState, useEffect } from "react";
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

const CATEGORIES_URL = "https://api.themysoreoils.com/api/categories";

export default function Navbar_Menu() {
  const [isOpen, setIsOpen] = useState(false); // categories (desktop dropdown)
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Offcanvas (mobile)
  const [showDrawer, setShowDrawer] = useState(false);
  // Optional: mobile search button (icon only — plug your search when ready)
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Redux cart count + bounce
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
    location.pathname.startsWith("/categories") ||
    location.pathname.startsWith("/spicescategories");

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

  // Close drawer on route change
  useEffect(() => {
    setShowDrawer(false);
  }, [location.pathname]);

  const toSlug = (s) => String(s || "").toLowerCase().replace(/\s+/g, "-");

  return (
    <>
      <Navbar expand="md" className="navbar-sticky py-2" sticky="top">
        <Container fluid className="px-3">

          {/* ========== MOBILE HEADER ROW (< md) ========== */}
          <div className="d-flex d-md-none w-100 align-items-center justify-content-between">
            {/* LEFT: icons (search, wishlist, cart, account) */}
            <div className="d-flex align-items-center gap-2">
              <button
                aria-label="Open search"
                className="icon-btn"
                type="button"
                onClick={() => setShowSearch((s) => !s)}
              >
                <img src={loupe} alt="Search" className="icon-img" loading="lazy" />
              </button>

              <Link to="/wishlist" aria-label="Wishlist" className="icon-box">
                <img src={faHeart} alt="Wishlist" className="icon-img" loading="lazy" />
              </Link>

              <Link to="/carts" className="cart-wrapper" aria-label="Cart">
                <div className={`cart-icon ${animate ? "cart-bounce" : ""} icon-box`}>
                  <img src={Cart} alt="Cart" className="icon-img" loading="lazy" />
                  {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </div>
              </Link>

              <Link to="/login" aria-label="Account" className="icon-box">
                <img src={Account} alt="Account" className="icon-img" loading="lazy" />
              </Link>
            </div>

            {/* RIGHT: hamburger toggles Offcanvas */}
            <Navbar.Toggle
              aria-controls="main-offcanvas"
              className="border-0 shadow-none"
              onClick={() => setShowDrawer(true)}
            />
          </div>

          {/* ========== DESKTOP BAR (>= md) ========== */}
          <div className="d-none d-md-flex w-100 align-items-center justify-content-between gap-3">
            {/* Logo (desktop) */}
            <Link to="/" className="d-inline-flex align-items-center">
              <img
                src="/media/MysuruOilsLogo.png"
                alt="Mysuru Oils"
                style={{ height: 65, objectFit: "contain" }}
              />
            </Link>

            {/* Links (desktop) */}
            <Nav className="align-items-center" style={{ gap: 24 }}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-hover-effect active-link" : "nav-hover-effect")}
              >
                HOME
              </NavLink>

              <NavLink
                to="/best-seller"
                className={({ isActive }) => (isActive ? "nav-hover-effect active-link" : "nav-hover-effect")}
              >
                BEST SELLER
              </NavLink>

              {/* Categories dropdown (desktop) */}
              <NavDropdown
                title={
                  <span className="nav-title" style={{fontFamily:"poppins", color:"#fff", fontWeight:"700", fontSize:"20px"}}>
                    CATEGORIES
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`ms-2 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </span>
                }
                id="desktop-categories"
                onToggle={(open) => setIsOpen(open)}
                className={isOpen || isCategoryActive ? "active-link" : ""}
              >
                <div style={{ width: 260 , fontFamily:"poppins", fontSize:"18px", fontWeight: 700}}>
                  {loading && <NavDropdown.Item disabled>Loading…</NavDropdown.Item>}
                  {error && <NavDropdown.Item disabled>{error}</NavDropdown.Item>}
                  {!loading && !error && categories.length === 0 && (
                    <NavDropdown.Item disabled>No categories available</NavDropdown.Item>
                  )}
                  {!loading && !error && categories.map((category) => (
                    <NavDropdown.Item
                      key={category._id}
                      as={Link}
                      to={`/categories?category=${encodeURIComponent(category.slug || toSlug(category.name))}`}
                    >
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </div>
              </NavDropdown>
            </Nav>

            {/* Right icons (desktop) */}
            <div className="d-flex align-items-center gap-3">
              <button className="icon-btn" aria-label="Open search" onClick={() => setShowSearch((s) => !s)}>
                <img src={loupe} alt="Search" className="icon-img" />
              </button>

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

          {/* ========== OFFCANVAS DRAWER (MOBILE ONLY) ========== */}
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
            {/* Header: logo left, close button right */}
            <Offcanvas.Header className="mo-header" closeButton>
              <Link to="/" className="mo-logo" onClick={() => setShowDrawer(false)}>
                <img src="/media/MysuruOilsLogo.png" alt="Mysuru Oils" />
              </Link>
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

                {/* Mobile-friendly Categories (accordion) */}
                <div className={`mo-accordion ${isOpen ? "open" : ""}`}>
                  <button
                    className="mo-acc-btn"
                    aria-expanded={isOpen}
                    aria-controls="mo-acc-panel"
                    onClick={() => setIsOpen((v) => !v)}
                  >
                    <span >CATEGORIES</span>
                    <FontAwesomeIcon icon={faAngleDown} className="chev" />
                  </button>

                  <div id="mo-acc-panel" className="mo-acc-panel" hidden={!isOpen}>
                    <div className="mo-acc-inner">
                      {loading && <div className="mo-muted">Loading…</div>}
                      {error && <div className="mo-muted">{error}</div>}
                      {!loading && !error && categories.length === 0 && (
                        <div className="mo-muted">No categories available</div>
                      )}
                      {!loading && !error &&
                        categories.map((category) => (
                          <Link
                            key={category._id}
                            to={`/categories?category=${encodeURIComponent(category.slug || toSlug(category.name))}`}
                            className="mo-acc-link"
                            onClick={() => setShowDrawer(false)}
                          >
                            {category.name}
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Optional: hook your mobile search UI here if you need it */}
      {showSearch && (
        <div className="d-md-none" style={{ background: "#0b1220", color: "#fff", padding: 12 }}>
          {/* Replace this with your actual mobile search form/overlay */}
          <div style={{ opacity: 0.8, fontSize: 13 }}>Search UI placeholder (mobile)</div>
        </div>
      )}
    </>
  );
}
