// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import { Container } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faLocationDot,
//   faEnvelope,
//   faPhone,
// } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import logo from "/media/MysuruOilsLogo.png";

// export default function Footer() {
//   return (
//     <div
//       style={{
//         padding: "40px 20px",
//         color: "#fff",
//       }}
//     >
//       <Container fluid>
//         {/* Subscription Input */}
//         <InputGroup
//           className="mb-5 footer-subscribe-input"
//           style={{ maxWidth: "750px", margin: "auto" }}
//         >
//           <Form.Control
//             placeholder="EMAIL"
//             style={{
//               borderRadius: "0",
//               fontSize: "16px",
//               color: "#002209",
//               fontWeight: "bold",
//             }}
//             className="me-2 search-input input-account-forms"
//           />
//           <InputGroup.Text
//             className="footer-subscribe-button"
//             style={{
//               borderRadius: "0",
//               fontWeight: "bold",
//               color: "#002209",
//               backgroundColor: "#D3B353",
//               height: "48px",
//               cursor: "pointer",
//               fontSize: "16px",
//               padding: "0 24px",
//               letterSpacing: "1px",
//             }}
//           >
//             SUBSCRIBE
//           </InputGroup.Text>
//         </InputGroup>

//         {/* Footer Grid */}
//         <div
//           className="footer-container"
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
//             gap: "15px",
//             padding: "0 5%",
//             alignItems: "start",
//             textAlign: "left",
//           }}
//         >
//           {/* Logo */}
//           <div className="footer-logo" style={{ textAlign: "center" }}>
//             <img
//               src={logo}
//               alt="logo"
//               style={{ width: "90%", objectFit: "contain", margin: "0 auto" }}
//             />
//           </div>

//           {/* Sections */}
//           <div>
//             <h5 className="footer-heading" style={headingStyle}>
//               ABOUT
//             </h5>
//             <ul className="footer-list" style={listStyle}>
//               <li>About Us</li>
//               <Link to="/account" style={linkStyle}>
//                 <li>Account</li>
//               </Link>
//               <Link to="/contact" style={linkStyle}>
//                 <li>Contact Us</li>
//               </Link>
//             </ul>
//           </div>

//           <div>
//             <h5 className="footer-heading" style={headingStyle}>
//               SUPPORT
//             </h5>
//             <ul className="footer-list" style={listStyle}>
//               <Link to="/create_account" style={linkStyle}>
//                 <li>Sign Up</li>
//               </Link>
//               <li>Retails</li>
//             </ul>
//           </div>

//           <div>
//             <h5 className="footer-heading" style={headingStyle}>
//               SOCIALS
//             </h5>
//             <ul className="footer-list" style={listStyle}>
//               <li>Instagram</li>
//               <li>Facebook</li>
//               <li>Email</li>
//             </ul>
//           </div>

//           <div>
//             <h5 className="footer-heading" style={headingStyle}>
//               HELP
//             </h5>
//             <ul className="footer-list" style={listStyle}>
//               <Link to="/terms-conditions" style={linkStyle}>
//                 <li>Terms of Services</li>
//               </Link>
//               <Link to="/privacy" style={linkStyle}>
//                 <li>Privacy Policy</li>
//               </Link>
//               <Link to="/shipping-policy" style={linkStyle}>
//                 <li>Shipping Policy</li>
//               </Link>
//               <Link to="/refund-policy" style={linkStyle}>
//                 <li>Return & Refund Policy</li>
//               </Link>
//             </ul>
//           </div>

//           <div className="footer-contact">
//             <h5 className="footer-heading" style={headingStyle}>
//               CONTACT
//             </h5>
//             <ul className="footer-list" style={listStyle}>
//               <li>
//                 <FontAwesomeIcon icon={faLocationDot} className="me-2" />
//                 #1881/3A, WESLEY ROAD, MYSORE
//               </li>
//               <li>
//                 <FontAwesomeIcon icon={faEnvelope} className="me-2" />
//                 themysoreoils@gmail.com
//               </li>
//               <li>
//                 <FontAwesomeIcon icon={faPhone} className="me-2" />
//                 7899830366
//               </li>
//             </ul>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

// const headingStyle = {
//   fontWeight: "700",
//   fontSize: "20px",
//   marginBottom: "8px",
//   letterSpacing: "1px",
// };

// const listStyle = {
//   listStyle: "none",
//   padding: 0,
//   fontSize: "12px",
//   lineHeight: "2.0",
// };

// const linkStyle = {
//   textDecoration: "none",
//   color: "white",
// };

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo from "/media/MysuruOilsLogo.png";
import location from "/media/location.png";
import mail from "/media/mail.png";
import call from "/media/call.png";
import communicate from "/media/communicate.png";
import instagram from "/media/instagram.png";

export default function Footer() {
  return (
    <div
      style={{
        padding: "40px 10px",
        color: "#fff",
        backgroundColor: "#002209",
      }}
    >
      <Container>
        {/* Subscription Input */}
       <InputGroup
          className="mb-5 footer-subscribe-input"
          style={{ maxWidth: "1100px", margin: "auto", borderRadius: "8px" }}
        >
          <Form.Control
            placeholder="Enter Your Email"
            style={{
              borderRadius: "0",
              fontSize: "16px",
              color: "#002209",
              fontWeight: "bold",
              padding: "12px 20px",
              fontFamily:"montserrat"
            }}
            className="me-2 search-input input-account-forms"
          />
          <InputGroup.Text
            className="footer-subscribe-button"
            style={{
              borderRadius: "0",
              fontWeight: "bold",
              color: "#002209",
              backgroundColor: "#D3B353",
              height: "48px",
              cursor: "pointer",
              fontSize: "16px",
              padding: "0 24px",
              letterSpacing: "1px",
              fontFamily:"montserrat"
            }}
          >
            SUBSCRIBE
          </InputGroup.Text>
        </InputGroup>

        <div
          style={{
            
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            fontWeight: "normal",
            // flexWrap: "wrap",
          }}
        >
          <div>
            <img src={logo} style={{ width: "150px", marginBottom: "10px" }} />
            {/* <p style={{ fontSize: "14px", marginTop: "10px" }}>
              Mysuru Oils - Premium Oil Store
            </p> */}
         </div>

          <Row style={{ width: "100%", margin: "0px 10px " }}>
            <Col xs={12} md={3} style={{ fontSize: "14px", fontWeight: "400" }}>
              <p style={{ fontSize: "18px", fontWeight: "600" , fontFamily:"montserrat"}}>ABOUT</p>
              <ul 
                style={{
                  listStyle: "none",
                  
                  paddingLeft: "0",
                }}
              >
                <li className="mb-1">
                  <Link to="/" className="linkstyle">
                    About Us
                  </Link>
                </li>
                <li className="mb-1">
                  <Link to="/account" className="linkstyle">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="linkstyle">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </Col>

            <Col xs={12} md={3} style={{ fontSize: "14px", fontWeight: "400" }}>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>Support</p>
              <ul
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  paddingLeft: "0",
                }}
              >
                <li className="mb-1">
                  {" "}
                  <Link to="/create_account" className="linkstyle">
                    Sign Up
                  </Link>
                </li>
                <li>
                  {" "}
                  
                </li>
              </ul>
            </Col>

            <Col xs={12} md={3} style={{ fontSize: "14px", fontWeight: "400" }}>
              <p style={{ fontSize: "18px", fontWeight: "600" , fontFamily:"montserrat"}}>Social</p>
              <div className="d-flex align-items-center justify-content-start gap-3">
              <Link to="https://www.instagram.com/themysoreoils?igsh=MWJpbW5uNTdqMmV0dg%3D%3D&utm_source=qr" target="_blank"
  rel="noopener noreferrer" style={{textDecoration:"none", color:"inherit"}}>
               <img src={instagram} style={{width:"35px"}}/>
                </Link>
                
                 <img src={communicate} style={{width:'30px'}}/>
                </div>
              
            </Col>

            <Col xs={12} md={3} style={{ fontSize: "14px", fontWeight: "400" }}>
              <p style={{ fontSize: "18px", fontWeight: "600", fontFamily:"montserrat" }}>Help</p>
              <ul className="linkstyle"
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  paddingLeft: "0",
                }}
              >
                <Link to="/terms-conditions" style={{color:"inherit", textDecoration:"none"}}>
                <li className="mb-1">Terms of Service</li>
                </Link>
                <Link to="/privacy" style={{color:"inherit", textDecoration:"none"}}>
                <li className="mb-1">Privacy Policy</li>
                </Link>
                <Link to="/shipping-policy" style={{color:"inherit", textDecoration:"none"}}>
                <li className="mb-1">Shipping Policy</li>
                </Link>
                <Link to="/refund-policy" style={{color:"inherit", textDecoration:"none"}}>
                <li>Return and Refund Policy</li>
                </Link>
              </ul>
            </Col>
          </Row>

          <div>
             <Link to="https://g.co/kgs/ugbtFCm" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none", color:"inherit"}}>
            <div
              className="d-flex align-items-start gap-3 linkstyle"
              style={{ marginBottom: "4px" }}
            >
             
              <img src={location} style={{ width: "20px" }} />
              <p style={{ fontSize: "14px" }}>
                #1881/3A, Wesely Road, Mysore, Karnataka 570001
                </p>
            </div>
              </Link>

            <div
              className="d-flex align-items-start gap-3 linkstyle"
              style={{ marginBottom: "4px" }}
            >
              <img src={mail} style={{ width: "20px" }} />
              <p style={{ fontSize: "14px" }}>
                <a
                  href="mailto:themysuruoils@gmail.com"
                  style={{ color: "inherit", textDecoration: "none" }}
                >support@themysoreoils.com
                </a>
              </p>
            </div>
            <div className="d-flex align-items-start gap-3 linkstyle">
              <img src={call} style={{ width: "20px" }} />
              <p style={{ fontSize: "14px" }}>7899830366</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

