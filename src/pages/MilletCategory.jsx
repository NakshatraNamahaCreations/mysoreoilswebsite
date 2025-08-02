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

export default function MilletCategory() {
  const [isVisible, setIsVisible] = useState(false);
   const productType = [
    {
      id: "48",
      name: "Barnyard Millet",
      images: ["/media/Barnyard-Millet.jpeg"],
      Link:"/Millets/BarnyardMillet",
      originalPrice:70,
      discountedPrice: 45
    },
    
    {
      id: "49",
      name: "Foxtail Millet",
      images: ["/media/Foxtail-Millet.jpeg"],
      Link:"/Millets/FoxtailMillet"
    },
   /*} {
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
    },*/
    
  ];
  const [products, setProducts] = useState(productType);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");


   useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8011/api/products");
        const SpiceProducts = res.data.filter(
          (product) => product.category?.toLowerCase() === "spices"
        );
        setProducts(SpiceProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/product-spice/${id}`);
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
                  <ProductAccordian />
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
                    You are viewing: Millets
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
