import { Container, Button } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import product from "/media/coconut-oil.png";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import arrowLeft from "/media/Leftarrow.png";
import arrowRight from "/media/Rightarrow.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Products_Sliders() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product-page/${id}`);
  };

  const navigate = useNavigate();

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        style={{
          position: "absolute",
          right: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
        }}
      >
        <img
          src={arrowRight}
          alt="Next"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        style={{
          position: "absolute",
          left: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          cursor: "pointer",
        }}
      >
        <img
          src={arrowLeft}
          alt="Previous"
          style={{ width: "30px", height: "30px" }}
        />
      </div>
    );
  };

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  const productsData = [
   
    //{
     // id: 2,
     // name: "Castor Oil",
    //  image: "/media/castor-one.png",
     // originalPrice: 150,
     // discountedPrice: 130,
     // link:"/oil-products/CastorOil"
   // },
    //{
    //  id: 3,
     // name: "Black Sesame Oil",
    //  image: "/media/oil-black-sesame.jpeg",
     // originalPrice: 140,
   //   discountedPrice: 120,
    //  link:"/oil-products/BlackSesameOil"
   // },
    {
      id: 4,
      name: "Coconut Oil",
      image: "/media/oil-coconut.jpeg",
      originalPrice: 110,
      discountedPrice: 90,
      link:"/oil-products/CoconutOil"
    },
    {
      id: 5,
      name: "Groundnut Oil",
      image: "/media/oil-groundnut.jpeg",
      originalPrice: 125,
      discountedPrice: 100,
      link:"/oil-products/GroundnutOil"
    },
    {
      id: 11,
      name: "White Sesame Oil",
      image: "/media/oil-white-sesame.jpeg",
      originalPrice: 350,
      discountedPrice:300,
      link:"/oil-products/WhiteSesameOil"
    },
    {
      id:6,
      name: "Sunflower Oil",
      image:"/media/safflower-one.png",
      originalPrice: 380,
      discountedPrice: 380,
      link:"/oil-products/SunflowerOil"
    },
    {
      id:10,
      name: "Safflower Oil",
      image:"/media/sunflower-one.png",
      originalPrice: 480,
      discountedPrice: 480,
      link:"/oil-products/SafflowerOil"
    }
    //{
    //  id: 6,
    //  name: "Hair Oil",
     // image: "/media/oil-hair.png",
    //  originalPrice: 135,
    //  discountedPrice: 115,
    //  link:"/oil-products/HairOil"
   // },
   // {
    //  name: "Honge Oil",
    //  image: "/media/oil-honge.png",
    //  originalPrice: 145,
    //  discountedPrice: 125,
    //  link:"/oil-products/HongeOil"
   // },
  //  {
    //  id: 8,
    //  name: "Mustard Oil",
    //  image: "/media/mustard-one.png",
    //  originalPrice: 155,
     // discountedPrice: 130,
     // link:"/oil-products/MustardOil"
   // },
  ];

  // Chunk the products into rows of 4
  const chunkedProducts = [];
  for (let i = 0; i < productsData.length; i += 4) {
    chunkedProducts.push(productsData.slice(i, i + 4));
  }

   
  return (
    <div
      className="page-content"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Container className="my-4 position-relative">
        <Slider {...settings}>
          {chunkedProducts.map((group, index) => (
            <div key={index}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "50px",
                  // columnGap:"0px",
                  padding: "10px",
                  margin: "0px 5%",
                }}
              >
                {group.map((item, idx) => (
                  <div 
                    className="product-card-slider"
                    key={idx}
                    style={{
                     
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fff",
                      overflow: "hidden",
                      height: "auto",
                      maxHeight: "240px",
                      width: "100%",
                      maxWidth: "420px",
                      margin: "0 auto",
                      gap: "30px",
                      
                      backgroundColor:"#fdfaeb"
                    }}
                  >
                    <img
                      className="product-image-slider"
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        margin: "0 auto",
                        backgroundColor:"#e6ffed"
                      }}
                    />
                   
                    <div
                      className="product-info-slider"
                      style={{
                        padding: "10px",
                        color: "black",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                        width: "100%",
                        textAlign: "left",
                        marginTop: "10px",
                        backgroundColor:"#fdfaeb"
                      }}
                    >
                      <div>
                        <h6
                          style={{
                            fontSize: "25px",
                            fontWeight: "700",
                            marginBottom: "6px",
                            color: "#00614A",
                            fontFamily:"montserrat"
                          }}
                        >
                          {item.name}
                        </h6>

                        {/* Stars */}
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            margin: "10px 0",
                            justifyContent: "flex-start",
                          }}
                          className="product-stars-slider"
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
                              style={{ width: "14px", height: "14px" }}
                            />
                          ))}
                        </div>

                        {/* Price */}
                       <div
                          className="product-price-slider"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifySelf: "left",
                            fontSize: "30px",
                            marginTop: "6%",
                            gap: "5px",
                            fontWeight: "700",
                            fontFamily:"montserrat"
                          }}
                        >
                          <p
                            style={{
                              textDecoration: "line-through",
                              textDecorationColor: "red",
                              textDecorationThickness: "2px",
                              opacity: 0.5,
                              marginRight: "6px",
                              fontSize: "20px",
                              letterSpacing: "1px",
                              color: "#00614A",
                            }}
                          >
                            Rs {item.originalPrice}
                          </p>
                          <p style={{ fontSize: "20px", color: "#00614A" }}>
                            Rs {item.discountedPrice}
                          </p>
                        </div>
                      </div>

                      <Button
                          onClick={() => navigate(item.link)}
                        variant="none"
                        className="view-button-slider"
                        style={{
                          fontWeight: "600",
                          border: "none",
                          borderRadius: "0",
                          fontSize: "14px",
                          padding: "6px 8px",
                          letterSpacing: "0.3px",
                          width: "fit-content",
                          alignItems: "center",
                          display: "block",
                          fontFamily:"montserrat"
                        }}
                      >
                        VIEW PRODUCT
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
}



