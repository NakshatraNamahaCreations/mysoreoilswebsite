import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar_Menu from "../components/Navbar_Menu";
import Products_Sliders from "./Products_Sliders";
import FeatureGrid from "./FeatureGrid";
import Reviews from "./Reviews";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import "./Home.css"

/* Media */
import heroImg from "/media/banner-mysoil.png";
import process1 from "/media/Qualityassured.png";
import process2 from "/media/Chemicalfree.png";
import process3 from "/media/plantbased.png";
import process4 from "/media/LowCholesterol.png";
import heritageImg from "/media/Krishnaraja-Wodeyar.jpg";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar_Menu />

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <Container>
          <Row className="align-items-center gy-5">
            <Col md={6}>
              <span className="hero-tag">Cold Pressed • Pure • Honest</span>
              <h1 className="hero-title">
                Pure Cold-Pressed Oils <br />
                Rooted in Tradition
              </h1>
              <p className="hero-text">
                Handcrafted oils made using age-old methods that preserve
                nutrients, flavour, and authenticity — just the way nature
                intended.
              </p>

              <div className="hero-actions">
                <Button className="btn-primary-custom">
                  Shop Oils
                </Button>
                <Button variant="outline-dark">
                  Our Process
                </Button>
              </div>
            </Col>

            <Col md={6}>
              <img
                src={heroImg}
                alt="Cold Pressed Oils"
                className="hero-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="trust-strip">
        <Container>
          <Row className="text-center">
            {[
              "Cold Pressed",
              "No Chemicals",
              "Farm Sourced",
              "Handcrafted",
              "Quality Tested",
            ].map((item, i) => (
              <Col key={i} xs={6} md={2} className="trust-item">
                <span>{item}</span>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= BRAND STORY ================= */}
      <section className="brand-story">
        <Container>
          <Row className="align-items-center gy-4">
            <Col md={5}>
              <img
                src={heritageImg}
                alt="Mysore Heritage"
                className="story-image"
              />
            </Col>
            <Col md={7}>
              <span className="section-tag">Our Heritage</span>
              <h2 className="section-title">
                From Mysuru’s Legacy <br /> To Your Kitchen
              </h2>
              <p>
                Inspired by Mysore’s deep-rooted respect for nature and
                traditional wisdom, our oils are produced slowly, patiently,
                and responsibly.
              </p>
              <p>
                We work closely with farmers, press seeds in small batches, and
                avoid refining — so what you consume remains natural and
                nourishing.
              </p>
              <Button variant="link" className="text-link">
                Learn Our Story →
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="process-section">
        <Container>
          <h2 className="section-title text-center mb-5">
            How Our Oils Are Made
          </h2>

          <Row className="text-center gy-4">
            {[
              { img: process1, title: "Seed Selection" },
              { img: process2, title: "Slow Cold Press" },
              { img: process3, title: "Natural Filtering" },
              { img: process4, title: "Fresh Bottling" },
            ].map((step, i) => (
              <Col key={i} xs={6} md={3}>
                <div className="process-card">
                  <img src={step.img} alt={step.title} />
                  <h6>{step.title}</h6>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="featured-products">
        <Container>
          <h2 className="section-title text-center mb-4">
            Featured Oils
          </h2>

          <Products_Sliders />

          <div className="text-center mt-4">
            <Button className="btn-primary-custom">
              View All Oils
            </Button>
          </div>
        </Container>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-choose">
        <Container>
          <h2 className="section-title text-center mb-4">
            Why Choose Us
          </h2>
          <FeatureGrid />
        </Container>
      </section>

      {/* ================= REVIEWS ================= */}
      {/* <section className="reviews-section">
        <Reviews />
      </section> */}

      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">
        <Container className="text-center">
          <h2>
            Bring Purity Back <br /> Into Everyday Cooking
          </h2>
          <p>
            Cook with oils that respect your body and honour tradition.
          </p>
          <Button className="btn-primary-custom">
            Shop Now
          </Button>
        </Container>
      </section>

      <ScrollToTop />
      <Footer />
    </>
  );
}
