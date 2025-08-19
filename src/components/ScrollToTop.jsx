import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        {isVisible && (
       <button
       onClick={scrollToTop}
       className="scrolltop"
       style={{
         position: "fixed",
         bottom: "70px",
         right: "20px",
         width: "50px",
         height: "50px",
         fontSize: "20px",
         fontWeight: "bold",
         background: "#D3B353",
         color: "#002209",
         border: "1px solid #002209",
         borderRadius: "10%",
         cursor: "pointer",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         transition: "background 0.3s, color 0.3s, box-shadow 0.3s",
         boxShadow: "2px 2px 0px #002209",
         marginBottom: "10px",
         zIndex: "99999",
       }}
       onMouseOver={(e) => {
         e.target.style.background = "#D3B353";
         e.target.style.color = "#002209";
       }}
       onMouseOut={(e) => {
         e.target.style.background = "#002209";
         e.target.style.color = "#D3B353";
         e.target.style.boxShadow = "2px 2px 0px #D3B353";
       }}
     >
       ↑
     </button>
     
        )}
      </div>
    </>
  );
};

export default ScrollToTop;
