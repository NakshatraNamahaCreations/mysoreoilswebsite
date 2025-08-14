import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";
import Navbar_Menu from "../components/Navbar_Menu";
import { Link } from "react-router-dom";


export default function Best_Seller() {
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
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8011/api/products");
        const oilProducts = res.data.filter(
          (product) => product.category?.toLowerCase() === "oils"
        );
        setProducts(oilProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

 {/*} const filteredProducts = products.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );*/}

 


  
const handleCardClick = (id) => {
  navigate(`/product-page/${id}`);
};

 const allProducts = [
  {
    id: "2",
    name: "Black Sesame Oil",
    image: "/media/oil-black-sesame.jpeg",
    Link:"BlackSesameOil",
    originalPrice: '750',
    discountedPrice:'580'
  },
  {
    id: "4",
    name: "Coconut Oil",
    image: "/media/oil-coconut.jpeg",
    Link:"CoconutOil",
    originalPrice: '750',
    discountedPrice:'550'
  },
  
  {
    id: "9",
    name: "Mustard Oil",
    image: "/media/mustard-one.png",
    Link:"MustardOil",
    originalPrice: '800',
    discountedPrice:'550'
  },

  {
    id: "3",
    name: "Castor Oil",
    image: "/media/castor-one.png",
    Link:"CastorOil",
    originalPrice: '800',
    discountedPrice:'500'
  },
  {
    id:"5",
    name: "Groundnut Oil",
    image:"/media/oil-groundnut.jpeg",
    Link:"GroundnutOil",
     originalPrice: '650',
    discountedPrice:'480'
  }
];

 const filteredProducts = allProducts.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

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
          <Container className="mt-3">
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
          </Container>

          {/* CATEGORIES */}

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
                }}
              >
                BEST SELLER
              </h1>

              <div
                className="product-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  columnGap: "50px",
                  rowGap: "40px",
                  // padding: "10px",
                  // marginLeft:'-2%',
                  margin:'auto',
                  marginTop: "3%",
                  width: "90%",
                }}
              >
               {/*} {filteredProducts.map(( item) => (
                  <div
                    key={item.id}
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
  src={`http://localhost:8011${item.images?.[0] || '/media/default.jpg'}`}

  alt={item.name}
  style={{
    width: "200px",
    height: "220px",
    objectFit: "cover",
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
                        marginLeft: "3%",
                        color: "#00614A",
                      }}
                    >
                      <h4
                        style={{
                          fontWeight: "700",
                          fontSize: "26px",
                          whiteSpace:'nowrap'
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
                        {[
                          visiblestar,
                          visiblestar,
                          visiblestar,
                          visiblestar,
                          hiddenstar,
                        ].map((star, i) => (
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
                            whiteSpace:'nowrap'
                          }}
                        >
                          Rs {item.originalPrice}
                        </p>
                        <p
                          style={{
                            fontSize: "28px",
                            fontWeight: "700",
                            margin: 0,
                            whiteSpace:'nowrap'
                          }}
                        >
                          Rs {item.discountedPrice}
                        </p>
                      </div> 

                      {/*<div>
                        <Button
                          onClick={() => handleCardClick(item._id)}
                          variant="none"
                          className="view-button-slider"
                          style={{whiteSpace:'nowrap', fontSize:'12px'}}
                        >
                          VIEW PRODUCT
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}*/}



                {filteredProducts.map((item) => (
  <div key={item.id} className="product-card">
    <img
      src={item.image}
      alt={item.name}
      style={{ width: "160px", height: "200px", objectFit: "cover" }}
    />
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
                            whiteSpace:'nowrap'
                          }}
                        >
                          Rs {item.originalPrice}
                        </p>
                        <p
                          style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            margin: 0,
                            whiteSpace:'nowrap'
                          }}
                        >
                          Rs {item.discountedPrice}
                        </p>
                      </div> 
    <div className="product-info">
      <h4 style={{marginTop:"-15px"}}>{item.name}</h4>
      <div style={{display:"flex", justifyContent:"center"}}>
      <Button className="search-button-slider"
        onClick={() => navigate(`/oil-products/${item.Link}`)}
        variant="none"
        style={{ fontSize: "12px", padding:"10px" }}
      >
        VIEW PRODUCT
      </Button>
      </div>
    </div>
  </div>
))}

              </div>
            </Container>
          </div>

         

          <ScrollToTop />

          {/* FOOTER */}
           <Footer />
        </div>
      </div>
    </>
  );
}
