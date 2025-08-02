import React from "react";
import { Container, Row, Col, Image, Pagination } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import visiblestar from "/media/greenStar.png";
import hiddenstar from "/media/grayStar.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


// ReviewCard component
const ReviewCard = ({ name, date, rating, comment }) => {
  return (
    <div style={{ borderBottom: "2px solid black", padding: "20px 0" }}>
      <Row style={{ width: "100%" }}>
        <Col
          sm={12}
          className="d-flex justify-content-between align-items-center"
        >
          <div className="d-flex align-items-center">
            <Image
              src="/media/Photo.png"
              alt="User"
              rounded
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />

            <h5
              style={{
                color: "black",
                fontSize: "20px",
                fontWeight: "700",
                margin: 0,
                fontFamily:"montserrat"
              }}
            >
              {name}
            </h5>
          </div>
          <div style={{ fontSize: "16px", marginBottom: "8px", color: "#000" }}>
            {date}
          </div>
        </Col>

        <Col sm={12} className="mt-2">
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <p
              style={{
                marginBottom: 0,
                fontSize: "16px",
                letterSpacing: "0.5px",
                fontWeight: "500",
                flex: 1,
                marginRight: "15px",
                fontFamily:"montserrat"
              }}
            >
              {comment}
            </p>

            <div
              style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
            >
               {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <img key={`filled-${i}`} src={visiblestar} alt="filled star" style={{ width: "20px" }} />
                ) : (
                  <img key={`empty-${i}`} src={hiddenstar} alt="empty star" style={{ width: "20px" }} />
                )
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Parent component rendering the reviews
export default function Review_Customer() {
  const reviews = [
    {
      name: "Ramesh",
      date: "10 / 10 / 2024",
      rating: 4,
      comment: "I've been using The Mysore Oils' cold-pressed coconut and groundnut oils for months now. The purity is unmatched—there’s no residue or smell like in store-bought brands. Cooking feels healthier and tastier!",
    },
    {
      name: "Sneha",
      date: "02 / 06 / 2024",
      rating: 4,
      comment: "Freshness that speaks for itself! The fruits and vegetables from The Mysore Oils are always crisp, clean, and long-lasting. It’s a relief to finally get pesticide-free produce at my doorstep.",
    },
    {
      name: "Sneha",
      date: "02 / 06 / 2024",
      rating: 3,
      comment: "Their range of dry fruits is premium quality—especially the almonds and anjeer. And the millets? They’ve helped my family shift toward a healthier diet without compromising on taste!",
    },
    {
      name: "Anjali",
      date: "02 / 06 / 2024",
      rating: 3,
      comment: "I’m in love with their herbal face oils and handmade soaps. My skin has never felt this soft and radiant. Zero chemicals, all natural—just the way it should be.",
    },
    {
      name: "Suma",
      date: "10 / 10 / 2024",
      rating: 4,
      comment: "I recently bought their clay cookware. Not only do they look traditional and beautiful, but they also enhance the flavor of the food. Great craftsmanship!",
    },
  
 
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  // Logic to slice reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <Container style={{ marginTop: "40px" }}>
      {currentReviews.map((review, index) => (
        <ReviewCard key={index} {...review} />
      ))}
   
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4 custom-pagination">
  {/* Left Arrow */}
  <button
    className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
    disabled={currentPage === 1}
  >
    <FaChevronLeft />
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      className={`pagination-item ${i + 1 === currentPage ? "active" : ""}`}
      onClick={() => handlePageChange(i + 1)}
    >
      {i + 1}
    </button>
  ))}

  {/* Right Arrow */}
  <button
    className={`pagination-arrow ${currentPage === totalPages ? "disabled" : ""}`}
    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    <FaChevronRight />
  </button>
</div>
    </Container>
  );
}
