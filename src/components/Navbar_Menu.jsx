import Container from "react-bootstrap/Container";
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
  const isCategoryActive = location.pathname.startsWith("/categories") || location.pathname.startsWith("/spicescategories");
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <Navbar expand="lg" className="navbar-sticky banner">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between navbar-collapse">
          {/* Left Nav Links */}
          <Nav className="me-auto navbar-links" style={{ fontSize: "20px", gap: "25px", display: "flex", alignItems: "center" }}>
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
              <div style={{ width: "220px" }}>
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
              </div>
            </NavDropdown>
          </Nav>

          {/* Right Icons */}
          <div className="d-flex gap-3 text-white navbar-icons">
            {/* Search */}
            <div className="icon-box" onClick={handleSearchToggle} style={{ cursor: "pointer" }}>
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
            <div className="icon-box">
              <Link to="/wishlist">
                <img src={faHeart} alt="Wishlist-Icon" className="icon-img" />
              </Link>
            </div>

            {/* Cart with bounce animation */}
            <Link to="/carts" className="cart-wrapper">
              <div className={`cart-icon ${animate ? 'cart-bounce' : ''} icon-box`}>
                <img src={Cart} alt="cart-icon" className="icon-img"/>
                {itemCount > 0 && (
                  <span className="cart-count">{itemCount}</span>
                )}
              </div>
            </Link>

            {/* Account */}
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
