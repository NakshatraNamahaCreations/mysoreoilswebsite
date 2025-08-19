import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Button,
  Row,
  Col
} from "react-bootstrap";
// import Navbar_Menu from "../components/Navbar_Menu";

import Reviews from "./Reviews";
// import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import axios from "axios";
import ProductAccordian from "./ProductAccordian";
import Footer from "../components/Footer";
import Navbar_Menu from "../components/Navbar_Menu";

export default function ClayCategory() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null); // Initialize as null
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://api.themysoreoils.com/api/categories");
        setCategories(res.data.filter((cat) => cat.status === "Active"));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

 useEffect(() => {
  const fetchProducts = async () => {
    if (!selectedCategory) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("https://api.themysoreoils.com/api/products", {
        params: { category: selectedCategory },
      });

      const formattedProducts = res.data.map((product) => ({
        id: product._id,
        name: product.name,
        images: product.images,
        Link: `/Clay-Utensils/${product.name.replace(/\s+/g, "")}`,
        originalPrice: product.variants[0]?.price || 0,
        discountedPrice: product.discountPrice || product.variants[0]?.price || 0,
      }));
      setProducts(formattedProducts);
    } catch (err) {
      setError("Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [selectedCategory]);


  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const filteredProducts = products.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  {/*} const productType = [
    {
      id: "52",
      name: "Clay Cooking Pot",
      images: ["/media/clay-bowl.jpeg"],
      Link:"/Clay-Utensils/clay-bowl"
    },
    
    {
      id: "53",
      name: "Clay Kadai",
      images: ["/media/clay-kadai.jpeg"],
      Link:"/Clay-Utensils/Clay-kadai"
    },
   
      id: "50",
      name: "Browntop Millet",
      images: ["/media/browntop-millet.png"],
      Link:"/Millets/BrownTopMillet"
    },
    {
      id: "51",
      name: "Kodo Millet",
      images: ["/media/kodo-millet.png"],
      Link:"/Millets/KodoMillet"
    },
    {
      id: "52",
      name: "Little Millet",
      images: ["/media/little-millet.png"],
      Link:"/Millets/LittleMillet"
    },
    {
      id: "53",
      name: "Pearl Millet",
      images: ["/media/millet-pearl.png"],
      Link:"/Millets/PearlMillet"
    },
    {
      id: "54",
      name: "Proso Millet",
      images: ["/media/proso-millet.png"],
      Link:"/Millets/ProsoMillet"
    },
    {
      id: "55",
      name: "Quinoa Millet",
      images: ["/media/millet-quinoa.png"],
      Link:"/Millets/QuinoaMillet"
    },
    
  ];*/}
  

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
        <div style={{}}>
          {/* NAVBER MENU */}
          {/* <Navbar_Menu /> */}

          {/* SEARCH */}
         {/*} <Container className="mt-3">
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
          </Container>*/}

          {/* CATEGORIES */}

           <div
            style={{
              backgroundColor: "#ffff",
              padding: "20px",
              color: "#002209",
            }}
          >
            <Container className="mt-4">
              <Row>
                <Col md={3} className="category-sidebar">
                  <h4
                    style={{
                      fontWeight: "700",
                      marginBottom: "20px",
                      fontFamily: "montserrat",
                    }}
                  >
                    Categories
                  </h4>
                  <ProductAccordian
                  onCategorySelect={handleCategorySelect}
                  currentCategory={selectedCategory} 
                  />
                </Col>

                <Col md={9} >
                  <h1
                    style={{
                      textAlign: "left",
                      fontSize: "25px",
                      fontWeight: "700",
                      marginBottom: "50px",
                      fontFamily: "montserrat",
                    }}
                  >
                    You are viewing: Clay Utensils
                  </h1>

                  <div
                    className="product-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "30px",
                      marginTop: "3%",
                    }}
                  >
                    {filteredProducts.map((item) => (
                      <Link key={item.id} 
                                            to={item.Link ? item.Link : `/product-page/${item.id}`}
                                             style={{ textDecoration: "none", color: "inherit" }}>
                      <div key={item.id} className="product-card">
                        <img
                          src={
                            item.images[0].startsWith("/media")
                              ? item.images[0]
                              : `http://localhost:8011${item.images[0]}`
                          }
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "contain",
                          }}
                        />

                        <h4
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            margin: "10px 0",
                          }}
                        >
                          {item.name}
                        </h4>
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
                              fontSize: "16px",
                              margin: 0,
                              fontWeight: "700",
                              whiteSpace: "nowrap",
                            }}
                          >
                            Rs {item.originalPrice}
                          </p>
                          <p
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              margin: 0,
                              whiteSpace: "nowrap",
                            }}
                          >
                            Rs {item.discountedPrice}
                          </p>
                        </div>
                      </div>
                      </Link>
                    ))}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          {/* REVIEWS */}
          <Reviews />

          <ScrollToTop />

          {/* FOOTER */}
           <Footer /> 
        </div>
      </div>
    </>
  );
}
