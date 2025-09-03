import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";

function ForgotPasswordModal({ show, handleClose }) {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://api.themysoreoils.com/api/customers/forgot-password", { email });
      alert("Password reset email sent. Check your inbox.");
      handleClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send email");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Forgot Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleForgot}>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="mt-3" style={{ background: "#d3b353", border: "none" }}>
            Send Reset Email
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ForgotPasswordModal;
