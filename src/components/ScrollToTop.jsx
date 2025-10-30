import { useEffect, useRef, useState } from "react";
import "./ScrollToTop.css"

const ScrollToTop = ({ threshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > threshold);
        ticking.current = false;
      });
    };

    // run once on mount
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      title="Scroll to top"
      onClick={scrollToTop}
      className={`scrolltop-btn ${isVisible ? "is-visible" : ""}`}
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
