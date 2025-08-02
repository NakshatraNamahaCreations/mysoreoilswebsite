import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Button,
  Row,
  Col
} from "react-bootstrap";
import Navbar_Menu from "../components/Navbar_Menu";
import product from "/media/coconut-oil.png";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import Reviews from "./Reviews";
// import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScrollToTop from "../components/ScrollToTop";
import axios from "axios";
import ProductAccordian from "./ProductAccordian";
import Footer from "../components/Footer";

export default function DryFruitsCategory() {
  const [isVisible, setIsVisible] = useState(false);
   const productType = [
    {
      id: "14",
      name: "Badam [Sandra]",
      images: ["/media/Almond.png"],
      Link:"/Dry-Fruits/Almond"
    },
    {
      id: "15",
      name: "Cashew [California]",
      images: ["/media/cashewwhole.png"],
      Link:"/Dry-Fruits/Cashew"
    },
    {
      id: "16",
      name: "Cranberry",
      images: ["/media/cranberry.png"],
      Link:"/Dry-Fruits/CranBerry"
    },
    {
      id: "17",
      name: "Black Kishmis",
      images: ["/media/black-kishmis.png"],
      Link:"/Dry-Fruits/BlackKishmis"
    },
    {
      id: "18",
      name: "Dry Dates",
      images: ["/media/dry-dates.png"],
      Link:"/Dry-Fruits/DryDates"
    },
    {
      id:"19",
      name:"Anjeer [Medium]",
      images:["/media/anjeer-small.png"],
      Link:"/Dry-Fruits/AnjeerMedium"
    },
    {
      id:"20",
      name:"Anjeer [Small]",
      images:["/media/anjeer-medium.png"],
      Link:"/Dry-Fruits/AnjeerSmall"
    },
    {
      id:"21",
      name:"Apricot [Special]",
      images:["/media/apricot.png"],
      Link:"/Dry-Fruits/Apricot"
    },
    {
      id:"22",
      name:"Badam [California]",
      images:["/media/badam-california.png"],
      Link:"/Dry-Fruits/BadamCalifornia"
    },
    {
      id:"23",
      name:"Black Berry",
      images:["/media/black-berry.png"],
      Link:"/Dry-Fruits/BlackBerry"
    },
    {
      id:"24",
      name:"Blue Berry",
      images:["/media/blue-berry.png"],
      Link:"/Dry-Fruits/BlueBerry"
    },
    {
      id:"25",
      name:"Dry Kiwi",
      images:["/media/dry-kiwi.png"],
      Link:"/Dry-Fruits/DryKiwi"
    },
    {
      id:"26",
      name:"Dry Pineapple",
      images:["/media/dry-pineapple.png"],
      Link:"/Dry-Fruits/DryPineapple"
    },
    {
      id:"27",
      name:"Iranian Pistchio",
      images:["/media/pista.png"],
      Link:"/Dry-Fruits/Pista"
    },
    {
      id:"28",
      name:"Kaaju Chilly",
      images:["/media/cashewchilly.png"],
      Link:"/Dry-Fruits/KaajuChilly"
    },
    {
      id:"29",
      name:"Kaaju [Half]",
      images:["/media/cashewhalf.png"],
      Link:"/Dry-Fruits/CashewWhole"
    },
    {
      id:"30",
      name:"Kaaju Pepper",
      images:["/media/kaajupepper.png"],
      Link:"/Dry-Fruits/KaajuPepper"
    },
    {
      id:"31",
      name:"Kaaju Salted",
      images:["/media/kaaju-salted.png"],
      Link:"/Dry-Fruits/KaajuSalted"
    },
    {
      id:"32",
      name:"Kaaju Special",
      images:["/media/kaju-special.png"],
      Link:"/Dry-Fruits/KaajuSpecial"
    },
    {
      id:"33",
      name:"Kishmis regular",
      images:["/media/raisins.png"],
      Link:"/Dry-Fruits/Raisins"
    },
    {
      id:"34",
      name:"Mixes Dry Fruits",
      images:["/media/mixed-dry-fruits.png"],
      Link:"/Dry-Fruits/MixedDryFruits"
    },
    {
      id:"35",
      name:"Dry Amla",
      images:["/media/dry-amla.png"],
      Link:"/Dry-Fruits/DryAmla"
    }
    
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
      <div
        className="page-content"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <div style={{}}>
          {/* NAVBER MENU */}
           <Navbar_Menu /> 

          {/* SEARCH */}
       {/*}   <Container className="mt-3">
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
                    You are viewing: Dry Fruits
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
