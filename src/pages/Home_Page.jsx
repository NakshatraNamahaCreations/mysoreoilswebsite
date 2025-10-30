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

export default function Home_Page() {
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
        <div className="banner">
          <Container
            style={{ padding: "5% 0", position: "relative", bottom: "50px" }}
          >
            <Row>
              <Col sm={12}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "10px",
                  }}
                >
                  <img
                    src={MysuruOilsLogo}
                    alt="Logo"
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      objectFit: "cover",
                      position: "relative",
                      zIndex: 99,
                    }}
                  />

                  <img
                    src={purehealthy}
                    alt="Pure-Health"
                    style={{
                      width: "80%",
                      maxWidth: "400px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                  <img
                    src={naturecontent}
                    alt="Nature Content"
                    style={{
                      width: "40%",
                      maxWidth: "300px",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="banner">
                  {/* NAVBAR MENU */}
                  {/* <Navbar_Menu /> */}

                  {/* SEARCH */}
                  {/*}  <Container className="mt-3 ">
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
                className="me-2 search-input input-account-forms"
              />

              <div
                className="search-button-slider"
                style={{
                  padding: "5px 24px",
                  textAlign: "center",
                  cursor:"pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  
                }}
              >
                SEARCH
              </div>
            </InputGroup>
          </Container>*/}
                  <div>
                    <BrowserSlider />
                  </div>
                </div>
              </Col>

              {/*<Col sm={6}>
                <div>
                  <img
                    src={oilproducts}
                    alt="Mysore Oils Products"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>*/}
            </Row>
          </Container>
        </div>

        <div style={{ position: "relative", width: "100%" }}>
          <div
            ref={stripRef}
            className="feature-strip"
            style={{
              backgroundColor: "#D3B353",
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

      <div
        style={{
          backgroundColor: "#ffff",
          padding: "20px",
          color: "#002209",
        }}
      >
        <Container className="about-wrap" style={{ marginTop: "15%" }}>
          <Row className="g-3 g-md-4 align-items-stretch">
            <Col xs={6} md={3}>
              <img
                src="/media/Krishnaraja-Wodeyar.jpg"
                alt="wodeyar"
                className="about-img"
              />
            </Col>

            <Col xs={6} md={3}>
              <img
                src="/media/vishveshvaraiah.jpg"
                alt="vishveshvaraiah"
                className="about-img"
              />
            </Col>

            <Col xs={12} md={6}>
              <h1 className="about-title">ABOUT US</h1>
              <p className="about-text">
                "Welcome to The Mysore Oils, where tradition meets quality.
                Inspired by the visionary leaders of our land, Nalwadi
                Krishnaraja Wodeyar and Sir M. Visvesvaraya, we're dedicated to
                bringing you the finest cold-pressed oils.
                <br />
                <br />
                Our story begins with a passion for preserving the heritage of
                Mysore and a commitment to promoting healthy living. We believe
                in the power of traditional methods and high-quality ingredients
                to create products that nourish both body and soul.
                <br />
                <br />
                At The Mysore Oils, we're driven by a legacy of excellence and a
                promise to deliver the purest oils, extracted using time-tested
                cold-pressing techniques. Our goal is to share the richness of
                our land's heritage with you, while promoting wellness and
                sustainability.
                <br />
                <br />
                Join us in our journey to revive the traditional ways of oil
                extraction, while embracing modern quality standards. Experience
                the taste and goodness of Mysore's legacy in every drop of our
                cold-pressed oils."
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
          <div style={{ paddingTop: "4%" }}>
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
            <Button
              onClick={() => navigate(item.link)}
              variant="none"
              className="view-button-slider mb-5"
              style={{
                fontWeight: "600",
                border: "none",
                borderRadius: "0",
                fontSize: "20px",
                padding: "6px 8px",
                letterSpacing: "0.3px",
                width: "fit-content",
                alignItems: "center",
                display: "block",
                fontFamily: "montserrat",
                marginInline: "auto",
              }}
            >
              View All Products
            </Button>
          </div>
        </div>
      </div>

      {/* QUALITY ASSURANCE */}
      <Container fluid className=" bgcolor" style={{ padding: "20px" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "50px",
            letterSpacing: "1px",
            fontWeight: "800",
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
                    letterSpacing: "1px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "200",
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

      {/* CHOOSE US */}
      <div
        style={{
          backgroundColor: "#ffff",
          padding: "5% 0",
          color: "#002209",
        }}
        className="choose-us"
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "45px",
            letterSpacing: "1px",
            fontWeight: "800",
            fontFamily: "montserrat",
          }}
        >
          WHY CHOOSE US?
        </h1>

        <FeatureGrid />
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
