import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const FeatureGrid = () => {
  const features = [
    {
      title: "Naturally Rich Flavours",
      text: "Our oils enhance the natural flavors of your food without overpowering it.",
      img: "/media/naturally.png",
    },
    {
      title: "Elevate Your Cooking",
      text: "Perfect for home cooks and chefs, adding flavour and nutrition.",
      img: "/media/elevate.png",
    },
    {
      title: "Traceable & Transparent",
      text: "Complete transparency from organic farms to your kitchen.",
      img: "/media/traceable.png",
      small: true,
    },
    {
      title: "Zero Compromise",
      text: "From seed to bottle, we never cut corners on quality.",
      img: "/media/zeroComp.png",
    },
    {
      title: "Culinary Experts Love Us",
      text: "Trusted by chefs and health-conscious consumers worldwide.",
      img: "/media/culinary.png",
    },
    {
      title: "100% Organic Products",
      text: "No chemicals. No shortcuts. Just pure, authentic oils.",
      img: "/media/organic.png",
    },
  ];

  return (
    <Row className="g-4">
      {features.map((feature, index) => (
        <Col key={index} xs={12} sm={6} lg={4}>
          <Card className="why-card">
            <Card.Img
              src={feature.img}
              className={`why-icon ${feature.small ? "small" : ""}`}
            />
            <Card.Body>
              <Card.Title>{feature.title}</Card.Title>
              <Card.Text>{feature.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default FeatureGrid;
