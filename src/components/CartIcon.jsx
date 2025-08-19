import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import './CartIcon.css';

const NavbarCartIcon = () => {
  // Default to empty array if cart.items is undefined
  const cartItems = useSelector((state) => state.cart?.items || []);
  const [animate, setAnimate] = useState(false);

  // Trigger animation on cart item change
  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  return (
    <div className="position-relative">
      <FaShoppingCart
        className={`cart-icon ${animate ? "cart-bump" : ""}`}
        size={28}
        color="white"
      />

      {cartItems.length > 0 && (
        <span className="cart-count-badge">{cartItems.length}</span>
      )}
    </div>
  );
};

export default NavbarCartIcon;
