{/*import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import Reviews from "./Reviews";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollToTop from "../components/ScrollToTop";
import ProductAccordian from "./ProductAccordian";
import Footer from "../components/Footer";
import Navbar_Menu from "../components/Navbar_Menu";

export default function Categories() {
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
        Link: `/oil-products/${product.name.replace(/\s+/g, "")}`,
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

 

  {/*const productType = [

     {
      id: "4",
      name: "Groundnut Oil",
      images: ["/media/oil-groundnut.jpeg"],
      Link: "/oil-products/GroundnutOil",
      originalPrice: 650,
      discountedPrice: 480
    },

    {
      id: "3",
      name: "Coconut Oil",
      images: ["/media/oil-coconut.jpeg"],
      Link: "/oil-products/CoconutOil",
      originalPrice: 750,
      discountedPrice:550
    },
    
   

    {
      id: "6",
      name: "Sunflower Oil",
      images: ["/media/safflower-one.png"],
      Link:"/oil-products/Sunflower",
      originalPrice: 600,
      discountedPrice: 380
    },
    {
      id: "10",
      name: "Safflower Oil",
      images: ["/media/sunflower-one.png"],
      Link:"/oil-products/SunflowerOil",
      originalPrice: 700,
      discountedPrice: 480
    },
    {
      id: "1",
      name: "Black Sesame Oil",
      images: ["/media/oil-black-sesame.jpeg"],
      Link:"/oil-products/BlackSesameOil",
      originalPrice:750,
      discountedPrice:580
    },
    {
      id: "11",
      name: "White sesame Oil",
      images: ["/media/oil-white-sesame.jpeg"],
      Link:"/oil-products/WhiteSesameOil",
      originalPrice: 650,
      discountedPrice: 350
    },
     {
      id: "8",
      name: "Mustard Oil",
      images: ["/media/mustard-one.png"],
      Link:"/oil-products/MustardOil",
      originalPrice: 800,
      discountedPrice: 550
    },
     {
      id: "2",
      name: "Castor Oil",
      images: ["/media/castor-one.png"],
      Link: "/oil-products/CastorOil",
      originalPrice:800,
      discountedPrice:500
    },
     {
      id: "9",
      name: "Neem Oil",
      images: ["/media/neem-one.png"],
      Link:"/oil-products/NeemOil",
      originalPrice: 650,
      discountedPrice: 350
    },

     {
      id: "1",
      name: "Almond Oil",
      images: ["/media/Almond-oil.png"],
      Link:"/oil-products/AlmondOil",
      originalPrice:750,
      discountedPrice:320
    },
   
    
   
    {
      id: "5",
      name: "Hair Oil",
      images: ["/media/oil-hair.png"],
      Link:"/oil-products/HairOil",
      originalPrice: 550,
      discountedPrice: 350
    },
    
    {
      id: "7",
      name: "Honge Oil",
      images: ["/media/oil-honge.png"],
      Link:"/oil-products/HongeOil",
      originalPrice: 600,
      discountedPrice: 450
    },
  
    {
      id:'13',
      name:"Deepam Oil",
      images:["/media/oil-deepam.jpeg"],
      Link:"/oil-products/DeepamOil",
      originalPrice: 600,
      discountedPrice: 480
    },

    {
      id: "12",
      name: "Yellu Deepam Oil",
      images: ["/media/yellu-oil.jpeg"],
      Link:"/oil-products/Yelludeepamoil",
      originalPrice: 750,
      discountedPrice: 450
    },
  ];*/}

 

  

 

 {/*} return (
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
        {/*}  <Container className="mt-3">
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
          </Container>}*/}

          {/* CATEGORIES */}

        {/*}  <div
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
                    You are viewing: {selectedCategory || "Select a Category"}
                  </h1>

                    {selectedCategory === null ? (
                  <p>Please select a category to view products.</p>
                ) : loading ? (
                  <p>Loading products...</p>
                ) : error ? (
                  <p>{error}</p>
                ) : filteredProducts.length === 0 ? (
                  <p>No products found for this category.</p>
                ) : (
                  <div
                    className="product-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "30px",
                      marginTop: "3%",
                    }}
                  >
                    {filteredProducts.map((item) => (
                      <Link
                        key={item.id}
                        to={item.Link}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="product-card">
                         <img
  src={`https://api.themysoreoils.com${item.images[0]}`}
  alt={item.name}
  style={{
    width: "100%",
    height: "240px",
    objectFit: "contain",
  }}
/>

                        <h4
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            
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
                )}
                </Col>
              </Row>
            </Container>
          </div>

          {/* REVIEWS */}
        {/*}  <Reviews />

          <ScrollToTop />

          {/* FOOTER */}
           {/*<Footer /> 
        </div>
      </div>
    </>
  );
}*/}


import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollToTop from "../components/ScrollToTop";
import ProductAccordian from "./ProductAccordian";
import Footer from "../components/Footer";
import Navbar_Menu from "../components/Navbar_Menu";
import { useLocation } from "react-router-dom";

export default function Categories() {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();


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
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");
  if (categoryFromURL) {
    setSelectedCategory(categoryFromURL.charAt(0).toUpperCase() + categoryFromURL.slice(1));
  }
}, [location.search]);
useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get("category");
  if (categoryFromURL) {
    // Convert 'home-essentials' -> 'Home Essentials'
    const formattedCategory = categoryFromURL
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setSelectedCategory(formattedCategory);
  }
}, [location.search]);


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
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://api.themysoreoils.com/api/products");
        const formattedProducts = res.data.map((product) => ({
          id: product._id,
          name: product.name,
          images: product.images,
          category: product.category,
          Link: `/oil-products/${product.name.replace(/\s+/g, "")}`,
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
  }, []);

  const handleCategorySelect = (categoryName) => {
    if (categoryName === "All") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <>
      <Navbar_Menu />
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div>
          <div style={{ backgroundColor: "#ffff", padding: "20px", color: "#002209" }}>
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

                <Col md={9}>
                  {selectedCategory && (
                    <h1
                      style={{
                        textAlign: "left",
                        fontSize: "25px",
                        fontWeight: "700",
                        marginBottom: "50px",
                        fontFamily: "montserrat",
                      }}
                    >
                      You are viewing: {selectedCategory}
                    </h1>
                  )}

                  {loading ? (
                    <p>Loading products...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : filteredProducts.length === 0 ? (
                    //<p>No products found.</p>
                    <p style={{fontFamily:"montserrat", fontSize:"30px", fontWeight:"bold"}}>Coming Soon</p>
                  ) : (
                    <div
                      className="product-grid"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                        gap: "30px",
                        marginTop: "3%",
                      }}
                    >
                      {filteredProducts.map((item) => (
                        <Link
                          key={item.id}
                          to={item.Link}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div className="product-card">
                            <img
                              src={`https://api.themysoreoils.com${item.images[0]}`}
                              alt={item.name}
                              style={{
                                width: "100%",
                                height: "240px",
                                objectFit: "contain",
                              }}
                            />
                            <h4
                              style={{
                                fontSize: "16px",
                                fontWeight: "600",
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
                  )}
                </Col>
              </Row>
            </Container>
          </div>

          <Reviews />
          <ScrollToTop />
          <Footer />
        </div>
      </div>
    </>
  );
}
