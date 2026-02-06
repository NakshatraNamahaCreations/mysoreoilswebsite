import Navbar_Menu from "../components/Navbar_Menu";
import {
  Container,
  Button,
  Form,
  FormControl,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import Products_Sliders from "./Products_Sliders";
import oilassurance from "/media/oilassurance.png";
import FeatureGrid from "./FeatureGrid";
import Reviews from "./Reviews";
// import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import ScrollToTop from "../components/ScrollToTop";
import oilproducts from "/media/Group334.png";
import MysuruOilsLogo from "/media/MysuruOilsLogo.png";
import purehealthy from "/media/Group333.png";
import naturecontent from "/media/Fromnaturetoyourkitchen.png";
import Qualityassured from "/media/Qualityassured.png";
import Chemicalfree from "/media/Chemicalfree.png";
import plantbased from "/media/plantbased.png";
import LowCholesterol from "/media/LowCholesterol.png";
import WeightManagement from "/media/WeightManagement.png";
import PureAndNatural from "/media/PureAndNatural.png";
import ColdPressed from "/media/ColdPressedExcellenceIcon.png";
import Handcraftedwithcare from "/media/Handcraftedwithcare.png";
import UnfilteredPurity from "/media/UnfilteredPurity.png";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import BrowserSlider from "./BrowserSlider";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/effect-fade";


export default function Home_Page() {

 


//  const defaultSlides = [
//   {
//     title: "ColdPressed Oils & Groceries",
//     subtitle: "for Healthy Living",
//     desc: "Pure, Healthy, Organic. From nature to your kitchen",
//     bg: "/media/mysoilbg.jpeg",
//     titleColor: "#ffffff",
//     subtitleColor: "#FFD600",
//     descColor: "#f1f1f1",
//   },
//   {
//     title: "Traditional Cold-Pressed Oils",
//     subtitle: "for Everyday Wellness",
//     desc: "Unrefined oils crafted using time-tested methods",
//     bg: "/media/mysoilbg1.jpeg",
//     titleColor: "#004914",
//     subtitleColor: "#7A1F2B",
//     descColor: "#004914",
//   },
// ];



  const [isVisible, setIsVisible] = useState(false);
   const [heroSlides, setHeroSlides] = useState([]);

useEffect(() => {
  fetchBanners();
}, []);

const fetchBanners = async () => {
  try {
    const res = await axios.get(
      "https://api.themysoreoils.com/api/banners"
    );

    const activeBanners = res.data.filter(b => b.status);

    if (activeBanners.length === 0) {
      setHeroSlides(defaultSlides);
      return;
    }

    const slides = activeBanners.map((banner) => ({
      title: banner.title,
      subtitle: "",
      desc: "",
      bg: `${"https://api.themysoreoils.com"}${banner.image}`,
      titleColor: "#ffffff",
      subtitleColor: "#FFD600",
      descColor: "#f1f1f1",
    }));

    setHeroSlides(slides);
  } catch (err) {
    console.log(err);

    // fallback if API fails
    // setHeroSlides(defaultSlides);
  }
};



  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    // run only on mobile
    const mq = window.matchMedia("(max-width: 768px)");
    let isMobile = mq.matches;
    const onChange = (e) => (isMobile = e.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    let rafId = null;
    let paused = false;
    const SPEED = 0.6; // px per frame (~36px/s at 60fps). Tweak as you like.

    const tick = () => {
      if (isMobile && !paused) {
        // advance
        el.scrollLeft += SPEED;

        // loop back to start when we reach the end
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0 && el.scrollLeft >= max - 1) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    // pause/resume handlers
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

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
        {/* BANNER */}
       <div className="banner-slider">
  <Swiper
    modules={[Autoplay, EffectFade]}
    effect="fade"
    autoplay={{
      delay: 4500,
      disableOnInteraction: false,
    }}
    loop
    speed={1200}
  >
    {heroSlides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div
          className="banner-slide"
          style={{
            backgroundImage: `url(${slide.bg})`,
          }}
        >
          <Container>
            <Row>
              <Col sm={12}>
  <div className="banner-content">
    <h1 style={{ color: slide.titleColor }}>
      {slide.title}
      <br />
      <span style={{ color: slide.subtitleColor }}>
        {slide.subtitle}
      </span>
    </h1>

    <p style={{ color: slide.descColor }}>
      {slide.desc}
    </p>
  </div>
</Col>

            </Row>
          </Container>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


        <div style={{ position: "relative", width: "100%" }}>
          <div
            ref={stripRef}
            className="feature-strip"
            style={{
              // backgroundColor: "#D3B353",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "nowrap",
              gap: "25px",
              padding: "10px 20px",
              height: "100px",
              overflowX: "auto", // horizontal scroll
              whiteSpace: "nowrap", // prevent wrapping
              scrollbarWidth: "none", // Firefox hide
              borderBottom:"2px solid #d3b353",
              marginTop: "10px"
            }}
          >
            <img
              src={Qualityassured}
              alt="Quality Assured"
              className="feature-icon"
              style={{ width: "8%", height: "auto", objectFit: "cover" }}
            />
            <img
              src={Chemicalfree}
              alt="Chemical Free"
              className="feature-icon"
              style={{ width: "7%", height: "auto", objectFit: "cover" }}
            />
            <img
              src={plantbased}
              alt="Plant Based"
              className="feature-icon"
              style={{ width: "7.5%", height: "auto", objectFit: "cover" }}
            />
            <img
              src={LowCholesterol}
              alt="Low Cholesterol"
              className="feature-icon"
              style={{ width: "9%", height: "auto", objectFit: "cover" }}
            />
            <img
              src={WeightManagement}
              alt="Weight Management"
              className="feature-icon"
              style={{ width: "10.5%", height: "auto", objectFit: "cover" }}
            />
            <img
              src={PureAndNatural}
              alt="Pure and Natural"
              className="feature-icon"
              style={{ width: "10%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>

        <div>
                    {/* <BrowserSlider /> */}

                      {/* QUALITY ASSURANCE */}
      <Container fluid  style={{ padding: "20px", marginTop:"60px"}}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "40px",
            letterSpacing: "1px",
            fontWeight: "800",
            fontFamily: "poppins"
          }}
        >
          QUALITY ASSURANCE
        </h1>

        <Row className="mt-5 justify-content-center">
          {[
            {
              img: "/media/organicfarm.mp4",
              title: "Farm to Table Freshness",
              desc: "Sourced directly from organic farms, delivering farm-fresh goodness to your kitchens.",
            },
            {
              img: "/media/filter.mp4",
              title: "Cold-Pressed Excellence",
              desc: "Our oils retain all the nutrients, antioxidants, and essential vitamins ensuring the highest health benefits.",
            },
            {
              img: "/media/purify.mp4",
              title: "Unfiltered Purity",
              desc: "Minimal processing to keep the oils as close to nature as possible.",
            },
            {
              img: "/media/handcraft.mp4",
              title: "Handcrafted With Care",
              desc: "Every bottle is handcrafted with love and attention to details for the best quality.",
            },
          ].map((item, i) => (
            <Col
              key={i}
              sm={6}
              md={3}
              className="mb-5 d-flex justify-content-center"
            >
              <div
                style={{
                  textAlign: "center",
                  maxWidth: "200px",
                }}
              >
                <video
                  src={item.img}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    marginBottom: "15px",
                  }}
                />
                <h3
                  style={{
                    letterSpacing: "0.5px",
                    fontSize: "14px",
                    fontWeight: "800",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
                  </div>

      <div
        style={{
          backgroundColor: "#ffff",
          padding: "20px 0",
          color: "#002209",
        }}
      >
       <Container className="about-section">
  <Row className="align-items-center gy-4">
    {/* Left – Heritage Images */}
    <Col xs={12} md={5}>
      <div className="about-image-grid">
        <img
          src="/media/Krishnaraja-Wodeyar.jpg"
          alt="Nalwadi Krishnaraja Wodeyar"
          className="about-img"
        />
        <img
          src="/media/vishveshvaraiah.jpg"
          alt="Sir M. Visvesvaraya"
          className="about-img"
        />
      </div>
    </Col>

    {/* Right – Content */}
    <Col xs={12} md={7}>
      <span className="about-tag">Our Heritage</span>
      <h1 className="about-title">About The Mysore Oils</h1>

      <p className="about-text">Our company draws inspiration from two great visionaries, Nalwadi Krishnaraja Wodeyar and Sir M. Visvesvaraya from the land of Mysore, who dedicated their lives to serving people with the highest standards of excellence. Their commitment to quality and public welfare continues to guide us in everything we do.</p>

      <p className="about-text">
        Welcome to <strong>The Mysore Oils</strong>, where tradition meets
        uncompromised quality. Inspired by the visionary leadership of
        <strong> Nalwadi Krishnaraja Wodeyar</strong> and
        <strong> Sir M. Visvesvaraya</strong>, we are devoted to preserving the
        authentic heritage of cold-pressed oil extraction.
      </p>

      <p className="about-text">
        Our journey is rooted in Mysore’s legacy — a land known for its wisdom,
        craftsmanship, and respect for natural processes. We believe true
        nourishment comes from time-tested methods, pure ingredients, and
        ethical practices.
      </p>

      <p className="about-text">
        At The Mysore Oils, every drop reflects our promise of purity, wellness,
        and sustainability. Using traditional cold-pressing techniques blended
        with modern quality standards, we bring you oils that nourish the body
        and honour our land’s timeless traditions.
      </p>

      <p className="about-quote">
        “Reviving tradition. Preserving purity. Promoting wellness.”
      </p>
    </Col>
  </Row>
</Container>


        {/* SHOP NOW*/}

        <div
          style={{
            textAlign: "center",
          }}
        >
          <div style={{ padding: "4%", backgroundColor:"#f2fff6" }}>
            <h1
              style={{
                fontSize: "45px",
                letterSpacing: "1px",
                fontWeight: "800",
                marginBottom: "3%",
                fontFamily: "montserrat",
              }}
              className="mobile-font"
            >
              SHOP NOW
            </h1>
            <div style={{ marginBottom: "0px" }}>
              <Products_Sliders />
            </div>
           <Link to="/shop" className="view-all-btn">
  View All Products →
</Link>


          </div>
        </div>
      </div>

    

      {/* CHOOSE US */}
     <div className="why-choose-section">
  <Container>
    <div className="why-header">
      <h1>Why Choose Us</h1>
      <p>
        Crafted with care, rooted in tradition, and made for everyday wellness.
      </p>
    </div>

    <FeatureGrid />
  </Container>
</div>

      <div
        style={{
          backgroundColor: "#f8f8f8",
          height: "600px",
          padding: "2% 0",
        }}
      >
        <div className="text-end " style={{ color: "black", padding: "2% 5%" }}>
          <h2
            style={{
              fontSize: "44px",
              fontWeight: "500",
              fontFamily: "montserrat",
            }}
          >
            Fuel your favourite dishes to life
          </h2>
          <h2
            style={{
              fontSize: "44px",
              fontWeight: "500",
              fontFamily: "montserrat",
            }}
          >
            with{" "}
            <span
              style={{ fontSize: "60px", fontWeight: "normal" }}
              className="madina"
            >
              "The Mysore Oils"
            </span>
          </h2>
        </div>
        <img
          src={"/media/fuelBanner.png"}
          style={{
            width: "100%",
            paddingInline: "5%",
            marginTop:"-80px"
          }}
        />
      </div>
      {/* REVIEWS */}
      <Reviews />

      <ScrollToTop />

      {/* FOOTER */}
      <Footer />
    </>
  );
}
