
import React from "react";
import { Container, Card } from "react-bootstrap";

const FeatureGrid = () => {
  const features = [
    {
      title: "Naturally Rich Flavours",
      text: "Our oils enhance the natural flavors of your food, making every dish taste better without overpowering it.",
      img: "/media/naturally.png",
      className: "card-top-left",
    },
    {
      title: "Elevate Your Cooking",
      text: "Perfect for chefs and home cooks alike, our oils take your cooking to the next level, adding both flavour and health benefits.",
      img: "/media/elevate.png",
      className: "card-top-right",
    },
    {
      title: "Traceable & Transparent",
      text: "Know exactly where your oil comes from. We ensure complete transparency, from organic farms to your pantry.",
      img: "/media/traceable.png",
      className: "card-center",
    },
    {
      title: "Zero Compromise",
      text: "We never cut corners. From seed to bottle, our commitment is to provide only the finest, healthiest oils.",
      img: "/media/zeroComp.png",
      className: "card-bottom-left",
    },
    {
      title: "Culinary Experts Love Us",
      text: "Trusted by chefs and health-conscious consumers around the world. Our oils make every meal gourmet-quality.",
      img: "/media/culinary.png",
      className: "card-bottom-right",
    },
    {
      title:"100% Organic Products",
      text: "We guarantee complete transparency from farm to bottle. No chemicals. No shortcuts. Just pure, authentic oils you can trust.",
      img: "/media/organic.png",
      className: "card-bottom-center"
    }
  ];

  return (
    <Container className="feature-container my-5 position-relative">
      {features.map((feature, index) => (
        <Card key={index} className={`feature-card ${feature.className}`}>
          <Card.Img
            variant="top"
            src={feature.img}
            style={{ width: feature.title === "Traceable & Transparent"? "30px": "60px", margin: "10px auto", objectFit: "contain" }}
          />
          <Card.Body>
            <Card.Title style={{ fontWeight: "bold", fontSize: "15px", fontFamily:"Montserrat, sans-serif", color:'#2D2D2D' }}>
              {feature.title}
            </Card.Title>
            <Card.Text style={{ fontSize: "12px", fontFamily:"Montserrat, sans-serif", fontWeight:'500', color:'#2D2D2D' }}>
              {feature.text}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default FeatureGrid;
