import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function FooterOne() {
  return (
    <footer style={{ backgroundColor: "#f9f9f9", padding: "40px 0", fontFamily: "Poppins", fontSize: "14px", color: "#333" }}>
      <Container>
        <Row>
          <Col md={4}>
            <h5>Shop By Category</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Oils | Cold Pressed Oils | Coconut | Groundnut | Sunflower | Mustard | Sesame | Castor</li>
              <li>Millets | Foxtail | Barnyard | Little | Kodo | Pearl | Finger Millet</li>
              <li>Dry Fruits | Almonds | Cashews | Raisins | Walnuts | Pistachios | Dates | Anjeer</li>
              <li>Ice Cream | Natural Fruit | Jaggery | Vegan | Traditional Kulfi</li>
              <li>Gifting Solutions | Custom Hampers | Festival Packs | Corporate Gifting</li>
              <li>Home Essentials | Cleaning Solutions | Storage Jars | Room Fresheners | Brass Decor</li>
              <li>Utensils | Clay Pots | Cast Iron | Bronze Vessels | Copper Bottles</li>
              <li>Vegetables | Leafy Greens | Root Veggies | Organic Packs</li>
              <li>Fruits | Farm Fresh | Exotic Fruits | Seasonal Baskets</li>
              <li>Cosmetics | Herbal Skincare | Hair Oils | Lip Balms | Organic Soaps</li>
              <li>Snacks | Millet Snacks | Jaggery Sweets | Healthy Namkeens | Fryums</li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Shop By Occasion</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Festive Gifting Hampers</li>
              <li>Seasonal Wellness Packs</li>
              <li>Summer Coolers & Ice Cream Specials</li>
              <li>Winter Essential Oils & Dry Fruits</li>
              <li>Return Gifts for Functions</li>
              <li>Health & Immunity Boost Packs</li>
              <li>Daily Kitchen Essentials</li>
              <li>Traditional Cooking Specials</li>
            </ul>

            <h5 className="mt-4">Top Collections</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Cold Pressed Oil Essentials</li>
              <li>Millet Superfood Basket</li>
              <li>Premium Dry Fruit Combos</li>
              <li>Vegan & Jaggery Ice Creams</li>
              <li>Handpicked Gifting Hampers</li>
              <li>Eco-Friendly Kitchen Essentials</li>
              <li>Clay & Cast Iron Cookware</li>
              <li>Seasonal Fruit Delight Baskets</li>
              <li>Herbal Beauty Care Essentials</li>
              <li>Healthy Snack Box Collections</li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>About</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>About Us</li>
              
            </ul>

            <h5 className="mt-4">Help</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Track Order</li>
              <li>Shipping & Returns</li>
              <li>Exchange Policy</li>
              <li>FAQs</li>
              <li>Find a Store</li>
              <li>Site Map</li>
            </ul>

            <h5 className="mt-4">Contact Us</h5>
            <p>
              Call: <a href="tel:+91740680003" style={{textDecoration:"none", color:"inherit"}}>+91-7899830366</a><br/>
              Email: <a href="mailto:support@yourwebsite.com" style={{textDecoration:"none", color:"inherit"}}>support@themysoreoils.com</a><br/>
              WhatsApp: <a href="https://wa.me/91740680003" style={{textDecoration:"none", color:"inherit"}}>+91-7899830366</a><br/>
              Monday – Saturday (10 AM - 7 PM)
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </Col>
        </Row>

        <Row className="pt-4 mt-4 border-top">
          <Col md={12} className="text-center">
            <p>Terms & Conditions | Privacy Policy | &copy; 2025 Mysore Oils. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
