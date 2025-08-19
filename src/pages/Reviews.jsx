// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import visiblestar from "/media/yellowStar.png";
// import hiddenstar from "/media/lightyellowStar.png";

// export default function Reviews() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           arrows: false,
//         },
//       },
//     ],
//   };

//   const reviewData = [
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT.",
//       author: "SNEHA",
//     },
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT",
//       author: "RAHUL",
//     },
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT.",
//       author: "SNEHA",
//     },
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT",
//       author: "RAHUL",
//     },
//     // Add more reviews here
//   ];

//   return (
//     <div>
//       <Slider {...settings}>
//         {reviewData.map((review, index) => (
//           <div key={index}>
//             <div className="review-card-container">
//               <div className="review-card">
//                 <div className="review-card-inner">
//                   <h5>{review.text}</h5>
//                   <h2>{review.author}</h2>
//                   <div className="stars">
//                     {[
//                       visiblestar,
//                       visiblestar,
//                       visiblestar,
//                       visiblestar,
//                       hiddenstar,
//                     ].map((star, i) => (
//                       <img key={i} src={star} alt="star" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import visiblestar from "/media/yellowStar.png";
// import hiddenstar from "/media/lightyellowStar.png";
// import leftQuote from "/media/leftQuote.png";
// import rightQuote from "/media/rightQuote.png";

// export default function Reviews() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: false,
//     centerMode:true,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           arrows: false,
//         },
//       },
//     ],
//   };

//   const reviewData = [
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT.",
//       author: "SNEHA",
//     },
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT",
//       author: "RAHUL",
//     },
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT.",
//       author: "SNEHA",
//     },
//     {
//       text: "THE PRODUCTS ARE FRESH AND DELICIOUS, EVERYONE HAS TO TRY IT",
//       author: "RAHUL",
//     },
//     // Add more reviews here
//   ];

//   return (
//     <div style={{ padding: "0", margin: "0" }}>

//       <Slider {...settings}>
//         {reviewData.map((review, index) => (
//           <div key={index} style={{ padding: "0", margin: "0" }}>
//             <div className="review-card-container">
//               <div className="review-card">
//                 <div className="review-card-inner">
//                   <h5>{review.text}</h5>
//                   <h2>{review.author}</h2>
//                   <div className="stars">
//                     {[visiblestar, visiblestar, visiblestar, visiblestar, hiddenstar].map((star, i) => (
//                       <img key={i} src={star} alt="star" />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import visiblestar from "/media/greenStar.png";
import hiddenstar from "/media/grayStar.png";
import leftQuote from "/media/leftQuote.png";
import rightQuote from "/media/rightQuote.png";

// Review Component
export default function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const reviewData = [
    {
      text: "I've been using The Mysore Oils' cold-pressed coconut and groundnut oils for months now. The purity is unmatched—there’s no residue or smell like in store-bought brands. Cooking feels healthier and tastier!",
      author: "SNEHA",
    },
    {
      text: "Freshness that speaks for itself! The fruits and vegetables from The Mysore Oils are always crisp, clean, and long-lasting. It’s a relief to finally get pesticide-free produce at my doorstep.",
      author: "RAHUL",
    },
    {
      text: "Their range of dry fruits is premium quality—especially the almonds and anjeer. And the millets? They’ve helped my family shift toward a healthier diet without compromising on taste!",
      author: "ANJALI",
    },
    {
      text: "I’m in love with their herbal face oils and handmade soaps. My skin has never felt this soft and radiant. Zero chemicals, all natural—just the way it should be.",
      author: "SUMA",
    },
    // Add more reviews here
  ];

  return (
    <div
      className="reviews-wrapper"
      style={{ padding: "70px 10px", backgroundColor: "#D3B353" }}
    >
      {/* Header with Quotes */}
      <div
        style={{
          position: "relative",
          padding: "0px 0px",
          marginBottom: "40px",
        }}
      >
        <img
          src={leftQuote}
          alt="left quote"
          style={{ position: "absolute", top: 0, left: 140, width: "30px" }}
        />
        <h1
          style={{
            textAlign: "center",
            fontSize: "45px",
            letterSpacing: "1px",
            color: "#002209",
            fontWeight: "800",
            fontFamily:"montserrat"
          }}
        >
          KNOW WHAT OUR CUSTOMERS SAY?
        </h1>
        <img
          src={rightQuote}
          alt="right quote"
          style={{ position: "absolute", top: 0, right: 140, width: "30px" }}
        />
      </div>

      {/* Slider Content (Reviews) */}
      <Slider {...settings}>
        {reviewData.map((review, index) => (
          <div key={index} style={{ padding: "0", margin: "0" }}>
            <div
              className="review-card-container"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="review-card">
                <div
                  className="review-card-inner"
                  style={{ width: "100%", padding: "20px" }}
                >
                  <h5 style={{ fontSize: "16px", color: "#002209" }}>
                    {review.text}
                  </h5>
                  <div className="mt-4">
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#002209",
                      }}
                    >
                      {review.author}
                    </h2>
                    <div
                      className="stars"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {[
                        visiblestar,
                        visiblestar,
                        visiblestar,
                        visiblestar,
                        hiddenstar,
                      ].map((star, i) => (
                        <img
                          key={i}
                          src={star}
                          alt="star"
                          style={{ width: "16px", height: "16px" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
