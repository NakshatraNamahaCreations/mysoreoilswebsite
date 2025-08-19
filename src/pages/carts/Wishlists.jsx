import {
  Container,
  InputGroup,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import Reviews from "../Reviews";
import Navbar_Menu from "../../components/Navbar_Menu";
import { FaTrash } from "react-icons/fa";
import FooterOne from "../../components/FooterOne";


export default function Wishlists() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) return;

      try {
        const res = await axios.get(
          `https://api.themysoreoils.com/api/wishlist/${user.id}`
        );
        setProducts(res.data); // response is array of product objects
      } catch (error) {
        console.error("Error fetching wishlist:", error);
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

      // Update the wishlist by removing the deleted item
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
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

  const filteredProducts = products.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (name) => {
    navigate(`/oil-products/${name.replace(/\s+/g, "-")}`); // Fixed: Use hyphens for URL
  };

  return (
   
    <>
    <Navbar_Menu/>
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div>
          

          {/* WISHLIST SECTION */}
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
                  textTransform: "uppercase",
                }}
              >
                Your Wishlist
              </h1>

             {filteredProducts.length === 0 ? (
  <div style={{ textAlign: "center", marginTop: "40px" }}>
    <img src="/media/wishlist.png" style={{width:"250px"}}/>
    <p style={{fontFamily:"poppins"}}>No products found in your wishlist.</p>
    
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
                  {filteredProducts.map((item) => (
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
                        src={`https://api.themysoreoils.com${item.images?.[0]}`}
                        alt={item.name}
                        className="product-image"
                        style={{
                          width: "70px",
                          height: "auto",
                          objectFit: "cover",
                          margin: "0",
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
                          marginLeft: "5%",
                          color: "#00614A",
                        }}
                      >
                        <h4
                          style={{
                            fontWeight: "700",
                            fontSize: "32px",
                          }}
                        >
                          {item.name}
                        </h4>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: "5px",
                            marginBottom: "10px",
                          }}
                        >
                          {[visiblestar, visiblestar, visiblestar, visiblestar, hiddenstar].map((star, i) => (
                            <img
                              key={i}
                              src={star}
                              alt="star"
                              style={{ width: "16px", height: "16px" }}
                            />
                          ))}
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
                          <p
                            style={{
                              opacity: 0.5,
                              textDecoration: "line-through",
                              fontSize: "18px",
                              margin: 0,
                              fontWeight: "700",
                            }}
                          >
                            Rs {item.variants?.[0]?.price || 0}
                          </p>
                          <p
                            style={{
                              fontSize: "28px",
                              fontWeight: "700",
                              margin: 0,
                            }}
                          >
                             Rs {item.discountPrice || item.variants?.[0]?.price || 0}
                          </p>
                        </div>

                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <Button
                            onClick={() => handleCardClick(item._id)}
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
                  ))}
                </div>
              )}
            </Container>
          </div>

          {/* REVIEWS */}
        {/*}  <Reviews />*/}

          <ScrollToTop />

        
        </div>
      </div>
    </>
  );
}
