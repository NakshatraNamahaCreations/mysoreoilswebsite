import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Review_Form = () => {
  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [reviewTitle, setReviewTitle] = useState("");
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form data here
    console.log({
      rating,
      reviewTitle,
      comments,
      file,
    });

    handleClose();
  };

  return (
    <>
      <Button
        variant="none"
        type="submit"
        className="mt-2 animated-review-btn"
        onClick={handleShow}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "280px",
          height: "80px",
          fontWeight: "700",
          color: "black",
          backgroundColor: "#D3B353",
          fontSize: "24px",
          letterSpacing: "1px",
          textAlign: "center",
          textDecoration: "none",
          position: "relative",
          zIndex: 1000,
          pointerEvents: "auto",
          border: "none",
          margin: "20px auto",
        }}
      >
        WRITE REVIEW
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        style={{ color: "black" }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#FCF9F6" }}>
          <Modal.Title
            className="w-100 text-center"
            style={{ fontSize: "30px", color: "black", fontWeight: "700" }}
          >
            Write Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: "#FCF9F6", borderRadius: "10px" }}
        >
          <Form onSubmit={handleSubmit}>
            {/* Rating */}
            <Form.Group className="mb-3 w-100">
              <Form.Label
  style={{ color: "#002209", fontSize: "18px", fontWeight: "600" }}
              >
                Rating
              </Form.Label>
              <div>
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <label key={starValue}>
                      <input
                        type="radio"
                        name="rating"
                        value={starValue}
                        onClick={() => setRating(starValue)}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        size={30}
                        color={
                          starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                        }
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                      />
                    </label>
                  );
                })}
              </div>
            </Form.Group>

            {/* Upload File */}
            <Form.Group className="mb-3 w-100">
              <Form.Label
                style={{ color: "#002209", fontSize: "18px", fontWeight: "600" }}
              >
                Upload Picture/Video
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  borderRadius: "0",
                  border: "1px solid #002209",
                  color: "#002209",
                }}
                className="search-input"
              />
            </Form.Group>

            {/* Review Title */}
            <Form.Group className="mb-3 w-100">
              <Form.Label
           style={{ color: "#002209", fontSize: "18px", fontWeight: "600" }}
              >
                Review Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter review title"
                style={{
                  fontSize: "18px",
                  borderRadius: "0",
                  border: "1px solid #002209",
                  color: "#002209",
                }}
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="input-account-forms search-input"
              />
            </Form.Group>

            {/* Comments */}
            <Form.Group className="mb-3 w-100">
              <Form.Label
        style={{ color: "#002209", fontSize: "18px", fontWeight: "600" }}
              >
                Your Comments
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your comments here..."
                style={{
                  fontSize: "18px",
                  borderRadius: "0",
                  border: "1px solid #002209",
                  color: "#002209",
                }}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="d-flex justify-content-end">
              <Button
                variant="none"
                onClick={handleClose}
                className="me-2"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "180px", // ✅ Smaller width
                  height: "50px", // ✅ Smaller height
                  fontWeight: "700",
                  color: "black",
                  backgroundColor: "#D3B353",
                  fontSize: "16px", // ✅ Smaller font
                  textAlign: "center",
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 1000,
                  pointerEvents: "auto",
                  border: "none",
                  margin: "16px auto",
                  textTransform: "uppercase",
                }}
              >
                Cancel Review
              </Button>

              <Button
                variant="none"
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "180px", // ✅ Smaller width
                  height: "50px", // ✅ Smaller height
                  fontWeight: "700",
                  color: "black",
                  backgroundColor: "#D3B353",
                  fontSize: "16px", // ✅ Smaller font
                  textAlign: "center",
                  textDecoration: "none",
                  position: "relative",
                  zIndex: 1000,
                  pointerEvents: "auto",
                  border: "none",
                  margin: "16px auto",
                  textTransform: "uppercase",
                }}
              >
                Submit Review
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Review_Form;
