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

export default function Reviews() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,            // desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1200,       // large tablets/smaller laptops
        settings: {
          slidesToShow: 2,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 992,        // tablets
        settings: {
          slidesToShow: 2,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,        // phones
        settings: {
          slidesToShow: 1,
          centerMode: false,
          dots: true,
        },
      },
    ],
  };

  const reviewData = [
    { text: "I've been using The Mysore Oils' cold-pressed coconut and groundnut oils for months now. The purity is unmatched—there’s no residue or smell like in store-bought brands. Cooking feels healthier and tastier!", author: "SNEHA" },
    { text: "Freshness that speaks for itself! The fruits and vegetables from The Mysore Oils are always crisp, clean, and long-lasting. It’s a relief to finally get pesticide-free produce at my doorstep.", author: "RAHUL" },
    { text: "Their range of dry fruits is premium quality—especially the almonds and anjeer. And the millets? They’ve helped my family shift toward a healthier diet without compromising on taste!", author: "ANJALI" },
    { text: "I’m in love with their herbal face oils and handmade soaps. My skin has never felt this soft and radiant. Zero chemicals, all natural—just the way it should be.", author: "SUMA" },
  ];

  return (
    <div className="reviews-wrapper">
      {/* Header with Quotes */}
      <div className="reviews-header">
        <img className="quote quote-left" src={leftQuote} alt="" />
        <h1 className="reviews-title">KNOW WHAT OUR CUSTOMERS SAY?</h1>
        <img className="quote quote-right" src={rightQuote} alt="" />
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {reviewData.map((review, index) => (
          <div key={index} className="slide-pad">
            <div className="review-card-container">
              <div className="review-card">
                <div className="review-card-inner">
                  <h5 className="review-text">{review.text}</h5>
                  <div className="review-footer">
                    <h2 className="review-author">{review.author}</h2>
                    <div className="stars">
                      {[visiblestar, visiblestar, visiblestar, visiblestar, hiddenstar].map((star, i) => (
                        <img key={i} src={star} alt="star" width={16} height={16} />
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
