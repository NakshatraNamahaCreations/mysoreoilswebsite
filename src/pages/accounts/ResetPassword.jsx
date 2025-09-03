import React, { useState } from "react";
import { Container, Form, Button, Card, InputGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavbarMenu from "../../components/NavMenuBar";
import FooterOne from "../../components/FooterOne";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ icons

export default function ResetPassword() {
  const { token } = useParams(); // token comes from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  // 👁️ password visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://api.themysoreoils.com/api/customers/reset-password/${token}`,
        formData
      );

      alert(res.data.message || "Password reset successful!");
      navigate("/login");
    } catch (error) {
      console.error("Reset error:", error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarMenu />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card
          style={{
            width: "400px",
            padding: "30px 25px",
            borderRadius: "15px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            background: "#fffbe8",
          }}
        >
          <h4
            style={{
              textAlign: "center",
              marginBottom: "25px",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            Reset Your Password
          </h4>

          <Form onSubmit={handleSubmit}>
            {/* New Password */}
            <Form.Group className="mb-4">
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  style={{
                    height: "50px",
                    border: "1.5px solid #002209",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    border: "1.5px solid #002209",
                  }}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4">
              <InputGroup>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    height: "50px",
                    border: "1.5px solid #002209",
                    fontSize: "16px",
                    fontFamily: "Poppins",
                  }}
                />
                <InputGroup.Text
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    cursor: "pointer",
                    background: "white",
                    border: "1.5px solid #002209",
                  }}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#d3b353",
                border: "none",
                padding: "12px",
                fontFamily: "Poppins",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {loading ? "Resetting..." : "RESET PASSWORD"}
            </Button>
          </Form>
        </Card>
      </Container>
      <FooterOne />
    </>
  );
}
