// import Navbar_Menu from "../components/Navbar_Menu";
import {
  Container,
  InputGroup,
  Form,
  FormControl,
  Row,
  Col,
  Button,
} from "react-bootstrap";

// import productoil from "/media/product-oil.png";
import { useState, useEffect } from "react";
import visiblestar from "/media/greenStar.png";
import hiddenstar from "/media/grayStar.png";
import Review_Form from "./Review_Form";
import Review_Customer from "./Review_Customer";
import Reviews from "./Reviews";
import axios from 'axios'
// import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import product from "/media/product-oil.png";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Whishlistheart from "/media/Whishlistheart.png";
import ScrollToTop from "../components/ScrollToTop";
import Breadcrumbs from "../components/BreadCrumbs";
{/*import deepamoil from '../../public/media/Deepam oil.png';
import groundnutoil from '../../public/media/groundnut oil.png';
import hairoil from '../../public/media/hair oil.png';
import mustardoil from '../../public/media/mustard oil.png';
import neem from '../../public/media/neem oil.png';
import Saffloweroil from '../../public/media/Safflower oil.png';
import sunfloweroil from '../../public/media/sunflower oil.jpeg';
import whiteseasame from '../../public/media/white sesame oil.png';
import yelludeepamoil from '../../public/media/yellu deepam oil.png';

import coconetdry from '../../public/media/dry coconet oil.png'
import almondimage from "../../public/media/almond oil.png";
import blacksesme from '../../public/media/black sesme oil.png'
import castoroil from '../../public/media/Castor oil.png'
import groundnut from '../../public/media/groundnut oil 2.png';
import hongeoil from '../../public/media/honge oil.png';}*/}


export default function Product_Page() {
 
const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
// localStorage.setItem("user", JSON.stringify(userData));

  const [productData, setProductData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const weights = ["150ml", "200ml"];

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8011/api/products/${id}`);
        setProductData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

 const handleAddToCart = () => {
  if (!selectedWeight) {
    alert("Please select a weight before adding to cart.");
    return;
  }
dispatch(
  addToCart({
    image: `http://localhost:8011${productData?.images?.[0]}`,
    id: productData._id,
    name: productData.name,
    discountedPrice: selectedWeight.discountedPrice, // Use actual discounted
    originalPrice: selectedWeight.originalPrice,     // Use original price
    selectedWeight: selectedWeight.quantity + "ml",
    quantity,
  })
);




  navigate("/carts");
};


const handleAddToWishlist = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("Please log in to add to wishlist.");
    return;
  }

  try {
    await axios.post("http://localhost:8011/api/wishlist/add", {
      userId: user.id,               // ✅ sending user ID
      productId: productData._id     // ✅ sending product ID
    });

    alert("Product added to wishlist!");
  } catch (err) {
    if (err.response?.data?.message === "Product already in wishlist") {
      alert("Product is already in your wishlist.");
    } else {
      console.error("Error adding to wishlist:", err);
      alert("Something went wrong. Try again.");
    }
  }
};






  if (!productData) {
    return <h2>Loading product...</h2>;
  }

  const breadcrumbData = [
    { name: "Home", path: "/" },
    { name: productData.name, path: `/product-page/${productData._id}` },
  ];


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
          {/* SEARCH */}
          <Container className="mt-3">
            <InputGroup
              className="mb-5 footer-subscribe-input"
              style={{ maxWidth: "750px", margin: "auto" }}
            >
              <Form.Control
                placeholder="Search our products..."
                style={{
                  borderRadius: "5px",
                  fontSize: "16px",
                  color: "#002209",
                  fontWeight: "500",
                }}
                className="me-2 search-input input-account-forms"
              />
              <InputGroup.Text
                className="footer-subscribe-button"
                style={{
                  borderRadius: "0",
                  fontWeight: "700",
                  color: "#002209",
                  backgroundColor: "#D3B353",
                  height: "48px",
                  cursor: "pointer",
                  fontSize: "16px",
                  padding: "0 24px",
                  letterSpacing: "1px",
                }}
              >
                SEARCH
              </InputGroup.Text>
            </InputGroup>
          </Container>

          {/* PRODUCT */}

          <div
            style={{
              backgroundColor: "#ffff",
              padding: "20px 0",
              color: "#002209",
            }}
          >
            <Container>
              <Breadcrumbs items={breadcrumbData} />
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "54px",
                  fontWeight: "700",
                }}
                className="mobile-font"
              >
                {/* COCONUT OIL */}
             {productData?.name}

              </h1>
              <Container className="mt-5">
                <Row className="align-items-center">
                  {/* Left Column: Product Image */}
                  <Col md={6} className="d-flex ">
                    <div style={{ display: "flex" }}>
                      <img
                        src={`http://localhost:8011${productData?.images?.[0]}`}
                        alt="Product-Detail"
                        style={{
                          width: "100%",
                          //   maxWidth: "240px",
                          height: "400px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>

                  {/* Right Column: Product Details */}
                  <Col
                    md={6}
                    className="d-flex flex-column align-items-end mt-5"
                  >
                    <div
                      style={{
                        border: "2px solid #002209",
                        boxShadow: "1px 1px 6px #002209",
                        padding: "35px",
                        borderRadius: "20px",
                        width: "100%",
                        maxWidth: "400px",
                        color: "#002209",
                      }}
                    >
                      {/* Weight Buttons */}
                     <div
  style={{
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "50px",
    marginBottom: "20px",
  }}
>
  {productData?.variants?.map((variant, i) => (
    <Button
      key={variant._id}
      variant="outline"
      onClick={() => setSelectedWeight(variant)}
      style={{
        border: "1px solid #002209",
        color:
          selectedWeight?._id === variant._id ? "#fff" : "#002209",
        backgroundColor:
          selectedWeight?._id === variant._id
            ? "#002209"
            : "transparent",
        padding: "10px 20px",
        fontSize: "24px",
        borderRadius: "0",
        fontWeight: "700",
        letterSpacing: "1px",
        transition: "all 0.3s ease",
      }}
    >
      {variant.quantity} ml
    </Button>
  ))}
</div>


                      {/* Quantity Controls */}
                      {/* <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ width: "100%", }}
                      >
                        <Button
                          onClick={handleDecrement}
                          className="quantity-btn1"
                          style={{
                            backgroundColor: "#002209",
                            border: "2px solid #002209",
                            color: "white",
                            fontWeight: "700",
                            borderRadius: "0",
                            fontSize: "28px",
                            padding: "6px 16px",
                          }}
                        >
                          -
                        </Button>

                        <span
                          className="w-50 text-center"
                          style={{
                            border: "2px solid #002209",
                            padding: "6px 16px",
                            fontSize: "28px",
                            fontWeight: "700",
                          }}
                        >
                          {quantity}
                        </span>

                        <Button
                          onClick={handleIncrement}
                          className="quantity-btn1"
                          style={{
                            backgroundColor: "#002209",
                            border: "2px solid #002209",
                            color: "white",
                            fontWeight: "700",
                            borderRadius: "0",
                            fontSize: "28px",
                            padding: "6px 16px",
                          }}
                        >
                          +
                        </Button>
                      </div> */}

                      {/* Pricing */}
                   <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px",
  }}
>
  <p
    style={{
      textDecoration: "line-through",
      fontSize: "22px",
      margin: 0,
      opacity: "0.5",
      color: "#002209",
      fontWeight: "600",
    }}
  >
    Rs {selectedWeight ? selectedWeight.price : productData?.variants?.[0]?.price}
  </p>
  <p
    style={{
      fontSize: "34px",
      margin: 0,
      color: "#002209",
      fontWeight: "bold",
    }}
  >
    Rs {(selectedWeight ? selectedWeight.price : productData?.variants?.[0]?.price) * quantity}
  </p>
</div>

                    </div>

                    {/* Wishlist and Add to Cart */}
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "30px",
                        marginTop: "30px",
                      }}
                    >
                      <div onClick={handleAddToWishlist} style={{ cursor: "pointer" }}>
  <img
    src={Whishlistheart}
    alt="wishlist"
    style={{
      width: "32px",
      height: "auto",
      objectFit: "cover",
    }}
  />
</div>


                      <Button
                        variant="primary"
                        className="hover-fill"
                        style={{
                          width: "50%",
                          backgroundColor: "#D3B353",
                          fontWeight: "700",
                          // color: "#002209",
                          border: "none",
                          borderRadius: "0",
                          padding: "8px 16px",
                          fontSize: "20px",
                          position: "relative",
                          overflow: "hidden",
                          zIndex: 1,
                        }}
                          onClick={() => {
    if (!selectedWeight) {
      alert("Please select a weight before adding to cart.");
      return;
    }
    handleAddToCart(
      `http://localhost:8011${productData?.images?.[0]}`,
      productData?._id,
      selectedWeight.price,
      productData?.name,
      selectedWeight.price,
      selectedWeight.quantity + " " + selectedWeight.unit,
      quantity
    );
  }}
                      >
                        <span className="hover-fill-text">ADD TO CART</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Container>

              {/* PRODUCT DESCRIPTION */}
              <div style={{ marginTop: "8%" }}>
                <h5
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    fontWeight: "700",
                  }}
                >
                  Product Description
                </h5>
                <p
                  style={{
                    letterSpacing: "1px",
                    fontSize: "16px",
                    lineHeight: "1.7",
                    fontWeight: "400",
                    textAlign: "justify",
                  }}
                >
                  {" "}
                  Nutrient-Packed: High in Omega-3, antioxidants, and healthy
                  fats- ideal for boosting your immune system and overall
                  wellness. Naturally Rich Flavors: Our oils enhance the natural
                  flavors of your food, making every dish taste better without
                  overpowering it. Zero Compromise: We never cut corners. From
                  seed to bottle, our commitment is to provide only the finest,
                  healthiest oils. Traceable & Transparent: Know exactly where
                  your oil comes from. We ensure complete transparency, from
                  organic farms to your pantry. Elevate Your Cooking: Perfect
                  for chefs and home cooks alike-our oils take your cooking to
                  the next level, adding both flavor and health benefits.
                  Culinary Experts Love Us: Trusted by chefs and
                  health-conscious consumers around the world. Our oils make
                  every meal gourmet-quality.
                </p>
              </div>
              <div style={{ marginTop: "2%" }}>
                <h5
                  style={{
                    fontSize: "20px",
                    letterSpacing: "1px",
                    fontWeight: "700",
                  }}
                >
                  Product Ingredients
                </h5>
                <p
                  style={{
                    letterSpacing: "1px",
                    fontSize: "16px",
                    lineHeight: "1.7",
                    fontWeight: "400",
                    textAlign: "justify",
                  }}
                >
                  {" "}
                  Nutrient-Packed: High in Omega-3, antioxidants, and healthy
                  fats- ideal for boosting your immune system and overall
                  wellness. Naturally Rich Flavors: Our oils enhance the natural
                  flavors of your food, making every dish taste better without
                  overpowering it. Zero Compromise: We never cut corners. From
                  seed to bottle, our commitment is to provide only the finest,
                  healthiest oils. Traceable & Transparent: Know exactly where
                  your oil comes from. We ensure complete transparency, from
                  organic farms to your pantry. Elevate Your Cooking: Perfect
                  for chefs and home cooks alike-our oils take your cooking to
                  the next level, adding both flavor and health benefits.
                  Culinary Experts Love Us: Trusted by chefs and
                  health-conscious consumers around the world. Our oils make
                  every meal gourmet-quality.
                </p>
              </div>
            </Container>

            {/* CUSTOMER REVIEW */}
            <div style={{ margin: "5% 0" }}>
              <h3
                style={{
                  textAlign: "center",
                  fontSize: "54px",
                  letterSpacing: "1px",
                  color: "#002209",
                  fontWeight: "700",
                  marginBottom: "2%",
                }}
              >
                Customer reviews
              </h3>
              <div style={{ backgroundColor: "#FBF9F4", padding: "35px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "25px",
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
                      style={{ width: "50px", height: "50px" }}
                    />
                  ))}
                </div>

                <div
                  style={{
                    display: "block",
                    justifyItems: "center",
                    color: "#002209",
                    marginTop: "2%",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "36px",
                      letterSpacing: "1px",
                      fontWeight: "700",
                    }}
                  >
                    4 out of 5
                  </h2>
                  <p
                    style={{
                      fontSize: "22px",
                      fontWeight: "500",
                    }}
                  >
                    Based on 13 reviews
                  </p>
                </div>
                <div
                  className="review-summary-container"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "30px",
                    padding: "20px",
                    backgroundColor: "#f8f8f8",
                    borderRadius: "10px",
                    maxWidth: "800px",
                    margin: "auto",
                  }}
                >
                  {/* Review stars */}
                  {/* <div className="review-stars">
                    {[...Array(5)].map((_, rowIndex) => (
                      <div
                        key={rowIndex}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px",
                          margin: "15px 0",
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
                            style={{ width: "18px", height: "18px" }}
                          />
                        ))}
                      </div>
                    ))}
                  </div> */}

                  {/* Review bars */}
                  {/* <div>
                    {[...Array(5)].map((_ , i, index) => (
                      <div className="d-flex  align-items-center gap-3">
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            margin: "0px 0",
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
                              style={{ width: "18px", height: "18px" }}
                            />
                          ))}
                        </div>
                        <div
                          key={i}
                          className="review-bar"
                          style={{
                            backgroundColor: "#D9D9D9",
                            width: "300px",
                            height: "18px",
                            borderRadius: "5px",
                            margin: "8px 0",
                            textAlign: "right",
                          }}
                        ></div>{" "}
                        <span>{i + 1}</span>
                      </div>
                    ))}
                  </div> */}

                  <div>
  {[...Array(5)].map((_, outerIndex) => (
    <div key={`outer-${outerIndex}`} className="d-flex align-items-center gap-3">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          margin: "0px 0",
        }}
      >
        {[
          visiblestar,
          visiblestar,
          visiblestar,
          visiblestar,
          hiddenstar,
        ].map((star, innerIndex) => (
          <img
            key={`star-${outerIndex}-${innerIndex}`}
            src={star}
            alt="star"
            style={{ width: "18px", height: "18px" }}
          />
        ))}
      </div>
      <div
        key={`bar-${outerIndex}`}
        className="review-bar"
        style={{
          backgroundColor: "#D9D9D9",
          width: "300px",
          height: "18px",
          borderRadius: "5px",
          margin: "8px 0",
          textAlign: "right",
        }}
      ></div>
      <span>{outerIndex + 1}</span>
    </div>
  ))}
</div>


                  {/* Review counts */}
                  <div
                    className="review-count"
                    style={{
                      textAlign: "right",
                      fontSize: "20px",
                      fontWeight: "500",
                    }}
                  ></div>
                </div>

                {/* Review Button */}
                <Review_Form />
              </div>
              <Review_Customer />
            </div>
          </div>

          {/* REVIEWS */}
          <Reviews />

          <ScrollToTop />
        </div>
      </div>
    </>
  );
}
