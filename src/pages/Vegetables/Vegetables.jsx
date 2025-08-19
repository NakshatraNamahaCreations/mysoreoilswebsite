import { Col, Container, Row } from "react-bootstrap";
import Navbar_Menu from "../../components/Navbar_Menu";
import Footer from "../../components/Footer";






export default function Vegetables(){
    return(
        <>
        <Navbar_Menu/>
        <Container>
            <Row>
                <Col>
                <div style={{height:"600px"}} className="d-flex align-items-center justify-content-center">
                <h2 style={{ fontSize: "60px", fontWeight: "normal"  }} className="madina">COMING SOON</h2>
                </div>
                </Col>
            </Row>
        </Container>
        <Footer/>
        </>
    )
}