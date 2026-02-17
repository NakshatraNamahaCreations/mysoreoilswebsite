/*import { Container, Button } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import arrowLeft from "/media/Leftarrow.png";
import arrowRight from "/media/Rightarrow.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const API_BASE = "https://api.themysoreoils.com";

// --- Helpers ---
const toNum = (v) => {
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : 0;
};

// Safe image URL builder
const fullImg = (path) => {
  if (!path) return "/media/oil-coconut.jpeg";
  const p = String(path);
  if (p.startsWith("http")) return p;
  if (p.startsWith("/media")) return p;
  return `${API_BASE}${p.startsWith("/") ? p : `/${p}`}`;
};

// Your PDP route uses name with no spaces
const toSlug = (name) => String(name || "").replace(/\s+/g, "");

/**
 * Variant pricing logic that matches your backend:
 * - If discountPrice > 0 and < price     → sale = discountPrice, mrp = price
 * - If discountPrice > price (MRP case)  → sale = price, mrp = discountPrice
 * - Else                                 → sale = price, mrp = max(price, productLevelMRP)
 * Pick the variant with the LOWEST sale.
 */
{
  /*const computeBestPrice = (product) => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const productLevelMRP = toNum(product?.discountPrice); // some products put MRP here

  if (variants.length) {
    let bestSale = Infinity;
    let bestMrp = Infinity;

    for (const v of variants) {
      const base = toNum(v?.price);
      const dp = toNum(v?.discountPrice);
      let sale = base;
      let mrp = base;

      if (dp > 0 && dp < base) {
        sale = dp;
        mrp = base;
      } else if (dp > base) {
        sale = base;
        mrp = dp;
      } else if (productLevelMRP > base) {
        // No per-variant discount, but product-level MRP exists and is higher
        sale = base;
        mrp = productLevelMRP;
      }

      if (sale < bestSale) {
        bestSale = sale;
        bestMrp = mrp;
      }
    }

    if (!Number.isFinite(bestSale)) bestSale = 0;
    if (!Number.isFinite(bestMrp)) bestMrp = bestSale;
    return { sale: bestSale, mrp: bestMrp };
  }

  // Fallback: no variants → use product-level fields if present
  const base =
    toNum(product?.price) ||
    toNum(product?.originalPrice) ||
    0;
  const dp =
    toNum(product?.discountPrice) ||
    toNum(product?.discountedPrice) ||
    0;

  let sale = base;
  let mrp = base;
  if (dp > 0 && dp < base) {
    sale = dp;
    mrp = base;
  } else if (dp > base) {
    sale = base;
    mrp = dp;
  } else if (productLevelMRP > base) {
    mrp = productLevelMRP;
  }
  return { sale, mrp };
};

export default function Products_Sliders() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Fetch products from backend ---
  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await axios.get(`${API_BASE}/api/products`);
        const raw = Array.isArray(res.data) ? res.data : res.data?.products || [];

        const formatted = raw.map((p) => {
          const { sale, mrp } = computeBestPrice(p);
          return {
            id: p._id,
            name: p.name,
            image: fullImg(p?.images?.[0]),
            discountedPrice: sale ?? 0, // selling price
            originalPrice: mrp ?? sale ?? 0, // MRP (strike)
            link: `/oil-products/${toSlug(p.name)}`,
          };
        });

        if (mounted) setProducts(formatted);
      } catch (e) {
        console.error("Error fetching products:", e);
        if (mounted) setErr("Failed to load products. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  // Chunk into groups of 4 cards per slide (2x2 grid per slide)
  const chunkedProducts = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < products.length; i += 4) {
      chunks.push(products.slice(i, i + 4));
    }
    return chunks.length ? chunks : [[]];
  }, [products]);

  // Arrows
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        right: "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <img src={arrowRight} alt="Next" style={{ width: "30px", height: "30px" }} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <img src={arrowLeft} alt="Previous" style={{ width: "30px", height: "30px" }} />
    </div>
  );

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <div
      className="page-content"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
    >
      <Container className="my-4 position-relative">
        {loading ? (
          <div className="text-center py-5">Loading products…</div>
        ) : err ? (
          <div className="text-center py-5 text-danger">{err}</div>
        ) : (
          <Slider {...settings}>
            {chunkedProducts.map((group, index) => (
              <div key={index}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "50px",
                    padding: "10px",
                    margin: "0px 5%",
                  }}
                >
                  {group.map((item, idx) =>
                    item ? (
                      <div
                        className="product-card-slider"
                        key={`${item.id}-${idx}`}
                        style={{
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#fff",
                          overflow: "hidden",
                          height: "auto",
                          maxHeight: "240px",
                          width: "100%",
                          maxWidth: "420px",
                          margin: "0 auto",
                          gap: "30px",
                          backgroundColor: "#fdfaeb",
                        }}
                      >
                        <img
                          className="product-image-slider"
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.src = "/media/oil-coconut.jpeg";
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            margin: "0 auto",
                            backgroundColor: "#e6ffed",
                          }}
                        />

                        <div
                          className="product-info-slider"
                          style={{
                            padding: "10px",
                            color: "black",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "left",
                            width: "100%",
                            textAlign: "left",
                            marginTop: "10px",
                            backgroundColor: "#fdfaeb",
                          }}
                        >
                          <div>
                            <h6
                              style={{
                                fontSize: "22px",
                                fontWeight: "700",
                                marginBottom: "6px",
                                color: "#00614A",
                                fontFamily: "montserrat",
                              }}
                            >
                              {item.name}
                            </h6>

                            {/* Stars */
}
{
  /*}   <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                margin: "10px 0",
                                justifyContent: "flex-start",
                              }}
                              className="product-stars-slider"
                            >
                              {[visiblestar, visiblestar, visiblestar, visiblestar, hiddenstar].map(
                                (star, i) => (
                                  <img
                                    key={i}
                                    src={star}
                                    alt="star"
                                    style={{ width: "14px", height: "14px" }}
                                  />
                                )
                              )}
                            </div>

                            {/* Price */
}
{
  /*}  <div
                              className="product-price-slider"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifySelf: "left",
                                fontSize: "30px",
                                marginTop: "6%",
                                gap: "5px",
                                fontWeight: "700",
                                fontFamily: "montserrat",
                              }}
                            >
                              {/* Show strike only when there’s a real discount */
}
{
  /*}   {toNum(item.originalPrice) > toNum(item.discountedPrice) && (
                                <p
                                  style={{
                                    textDecoration: "line-through",
                                    textDecorationColor: "red",
                                    textDecorationThickness: "2px",
                                    opacity: 0.5,
                                    marginRight: "6px",
                                    fontSize: "20px",
                                    letterSpacing: "1px",
                                    color: "#00614A",
                                  }}
                                >
                                  Rs {toNum(item.originalPrice)}
                                </p>
                              )}
                              <p style={{ fontSize: "20px", color: "#00614A" }}>
                                Rs {toNum(item.discountedPrice)}
                              </p>
                            </div>
                          </div>

                          <Button
                            onClick={() => navigate(item.link)}
                            variant="none"
                            className="view-button-slider"
                            style={{
                              fontWeight: "600",
                              border: "none",
                              borderRadius: "0",
                              fontSize: "14px",
                              padding: "6px 8px",
                              letterSpacing: "0.3px",
                              width: "fit-content",
                              alignItems: "center",
                              display: "block",
                              fontFamily: "montserrat",
                            }}
                          >
                            VIEW  PRODUCT
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div key={`pad-${idx}`} />
                    )
                  )}
                </div>
              </div>
            ))}
          </Slider>
        )}
      </Container>
    </div>
  );
}*/
}

import { Container, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";


import "swiper/css";
import "swiper/css/navigation";

import visiblestar from "/media/Star-visible.png";
import hiddenstar from "/media/Star-hidden.png";
import arrowLeft from "/media/Leftarrow.png";
import arrowRight from "/media/Rightarrow.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";



const API_BASE = "https://api.themysoreoils.com";

/* ---------------- Helpers ---------------- */
const toNum = (v) => {
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : 0;
};

const fullImg = (path) => {
  if (!path) return "/media/oil-coconut.jpeg";
  const p = String(path);
  if (p.startsWith("http")) return p;
  if (p.startsWith("/media")) return p;
  return `${API_BASE}${p.startsWith("/") ? p : `/${p}`}`;
};




const toSlug = (name) => String(name || "").replace(/\s+/g, "");

/**
 * Variant pricing logic that matches your backend.
 */
const computeBestPrice = (product) => {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const productLevelMRP = toNum(product?.discountPrice);

  if (variants.length) {
    let bestSale = Infinity;
    let bestMrp = Infinity;

    for (const v of variants) {
      const base = toNum(v?.price);
      const dp = toNum(v?.discountPrice);
      let sale = base;
      let mrp = base;

      if (dp > 0 && dp < base) {
        sale = dp;
        mrp = base;
      } else if (dp > base) {
        sale = base;
        mrp = dp;
      } else if (productLevelMRP > base) {
        sale = base;
        mrp = productLevelMRP;
      }

      if (sale < bestSale) {
        bestSale = sale;
        bestMrp = mrp;
      }
    }

    if (!Number.isFinite(bestSale)) bestSale = 0;
    if (!Number.isFinite(bestMrp)) bestMrp = bestSale;
    return { sale: bestSale, mrp: bestMrp };
  }

  const base = toNum(product?.price) || toNum(product?.originalPrice) || 0;
  const dp =
    toNum(product?.discountPrice) || toNum(product?.discountedPrice) || 0;

  let sale = base,
    mrp = base;
  if (dp > 0 && dp < base) {
    sale = dp;
    mrp = base;
  } else if (dp > base) {
    sale = base;
    mrp = dp;
  } else if (productLevelMRP > base) {
    mrp = productLevelMRP;
  }
  return { sale, mrp };
};

const OIL_KEYWORDS = [
  "oil",
  "oils",
  "groundnut",
  "coconut",
  "sesame",
  "gingelly",
  "sunflower",
  "mustard",
  "cold pressed",
  "cold-pressed",
];

const norm = (s = "") => s.trim().toLowerCase();

const categoryMatchesOils = (product) => {
  const cat = product?.category;
  const catName =
    (typeof cat === "string" ? cat : cat?.name || "") ||
    product?.categoryName ||
    product?.categorySlug ||
    "";

  const slug =
    (typeof cat === "string" ? cat : cat?.slug || "") ||
    product?.categorySlug ||
    "";

  const arr = Array.isArray(product?.categories) ? product.categories : [];
  const arrNames = arr.map((c) =>
    norm(typeof c === "string" ? c : c?.name || "")
  );
  const arrSlugs = arr.map((c) =>
    norm(typeof c === "string" ? c : c?.slug || "")
  );

  const nameHit = norm(catName) === "oils";
  const slugHit = norm(slug) === "oils";
  const arrayHit = arrNames.includes("oils") || arrSlugs.includes("oils");

  return nameHit || slugHit || arrayHit;
};

const looksLikeOilFallback = (product) => {
  const haystack = `${product?.name || ""} ${
    product?.description || ""
  }`.toLowerCase();
  return OIL_KEYWORDS.some((kw) => haystack.includes(kw));
};

const isOilProductStrict = (p) => {
  if (
    p?.category ||
    p?.categoryName ||
    p?.categorySlug ||
    (Array.isArray(p?.categories) && p.categories.length)
  ) {
    return categoryMatchesOils(p);
  }
  return looksLikeOilFallback(p);
};

/* ---------- Mobile breakpoint hook (<= 767px) ---------- */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);
  return isMobile;
};

const optimizeCloudinary = (url) => {
  if (!url) return url;

  if (url.includes("res.cloudinary.com")) {
    return url.replace(
      "/upload/",
      "/upload/w_400,q_auto,f_auto/"
    );
  }
  return url;
};


export default function Products_Sliders() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, name: "" });

  const prevRef = useRef(null);
const nextRef = useRef(null);


 
 
 const dispatch = useDispatch();

  const isMobile = useIsMobile();
  const itemsPerSlide = isMobile ? 1 : 4;

  // 🔧 Compact mobile sizing tokens
  const MOBILE_MAX_CARD_W = 320;
  const MOBILE_IMG_H = 160;

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Fetch ONLY oils from backend (with robust fallbacks) ---
  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErr(null);

        const tries = [
          { url: `${API_BASE}/api/products`, params: { category: "oils" } },
          { url: `${API_BASE}/api/products`, params: { categorySlug: "oils" } },
          { url: `${API_BASE}/api/products`, params: { categoryName: "Oils" } },
          { url: `${API_BASE}/api/products?category=oils` },
        ];

        let res = null;
        for (const t of tries) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const r = await axios.get(t.url, { params: t.params });
            if (
              Array.isArray(r.data)
                ? r.data.length
                : r.data?.products?.length || 0
            ) {
              res = r;
              break;
            }
          } catch (_) {}
        }

        if (!res) {
          res = await axios.get(`${API_BASE}/api/products`);
        }

        const raw = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];
        const onlyOils = raw.filter(isOilProductStrict);

        // const formatted = onlyOils.map((p) => {
        //   const { sale, mrp } = computeBestPrice(p);
        //   return {
        //     id: p._id,
        //     name: p.name,
        //     image: fullImg(p?.images?.[0]),
        //     discountedPrice: sale ?? 0,
        //     originalPrice: mrp ?? sale ?? 0,
        //     link: `/oil-products/${toSlug(p.name)}`,
        //   };
        // });

//         const formatted = onlyOils.map((p) => {
//   const { sale, mrp } = computeBestPrice(p);
//   return {
//     id: p._id,
//     name: p.name,
//     image: fullImg(p?.images?.[0]), // 👈 only one image
//     discountedPrice: sale ?? 0,
//     originalPrice: mrp ?? sale ?? 0,
//     link: `/oil-products/${toSlug(p.name)}`,
//   };
// });

const formatted = onlyOils.map((p) => {
  const { sale, mrp } = computeBestPrice(p);
  return {
    id: p._id,
    name: p.name,
    images: [
      fullImg(p?.images?.[0]),
      fullImg(p?.images?.[1] || p?.images?.[0]), // fallback
    ],
    discountedPrice: sale ?? 0,
    originalPrice: mrp ?? sale ?? 0,
    link: `/oil-products/${toSlug(p.name)}`,
  };
});



        if (mounted) setProducts(formatted);
      } catch (e) {
        console.error("Error fetching oil products:", e);
        if (mounted) setErr("Failed to load oil products. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

const handleAddToCart = (item) => {
  dispatch(
    addToCart({
      id: item.id,
      name: item.name,
      variantId: "default",
      quantity: 1,
      discountedPrice: Number(item.discountedPrice || 0),
      originalPrice: Number(item.originalPrice || item.discountedPrice || 0),
      price: Number(item.discountedPrice || 0),
      image: item.images?.[0],
      weight: null,
      unit: null,
    })
  );

  // Show toast
  setToast({ show: true, name: item.name });

  // Redirect after short delay
  setTimeout(() => {
    setToast({ show: false, name: "" });
    navigate("/carts"); // 👈 CHANGE PATH IF NEEDED
  }, 1200);
};





  // Chunk into groups per slide (responsive)
  const chunkedProducts = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < products.length; i += itemsPerSlide) {
      chunks.push(products.slice(i, i + itemsPerSlide));
    }
    return chunks.length ? chunks : [[]];
  }, [products, itemsPerSlide]);

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        right: isMobile ? "-2px" : "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        opacity: 0.9,
      }}
    >
      <img src={arrowRight} alt="Next" style={{ width: 26, height: 26 }} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: isMobile ? "-2px" : "-10px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
        opacity: 0.9,
      }}
    >
      <img src={arrowLeft} alt="Previous" style={{ width: 26, height: 26 }} />
    </div>
  );

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 450,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  //   swipeToSlide: true,
  //   touchThreshold: 12,
  //   pauseOnHover: true,
  //   pauseOnFocus: true,
  //   lazyLoad: "ondemand",
  //   adaptiveHeight: true, 
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         arrows: true,
  //         dots: false,
  //         centerMode: false,
  //       },
  //     },
  //     { breakpoint: 992, settings: { arrows: true, dots: false } },
  //   ],
  // };

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,

  accessibility: false, // ❗ disable slick focus handling
  focusOnSelect: false, // ❗ prevent slide focus

  swipeToSlide: true,
  pauseOnHover: true,

  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,

  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 992, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};




  return (
    <div
      className="page-content"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Container
        className="my-4 position-relative"
        style={{
          paddingLeft: isMobile ? 8 : undefined,
          paddingRight: isMobile ? 8 : undefined,
        }}
      >
        {loading ? (
          <div className="text-center py-5">Loading oil products…</div>
        ) : err ? (
          <div className="text-center py-5 text-danger">{err}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-5">No oil products found.</div>
        ) : (
        <Swiper
  modules={[Navigation, Autoplay]}
  spaceBetween={20}
  slidesPerView={4}
  autoplay={{
    delay: 4000,
    disableOnInteraction: false,
  }}
  navigation={{
    prevEl: prevRef.current,
    nextEl: nextRef.current,
  }}
  onBeforeInit={(swiper) => {
    swiper.params.navigation.prevEl = prevRef.current;
    swiper.params.navigation.nextEl = nextRef.current;
  }}
  breakpoints={{
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  }}
>


  {products.map((item) => (
    <SwiperSlide key={item.id}>
      <div className="oil-card">

        {/* Badge */}
        {/* <span className="oil-badge">New</span> */}

        {/* Image */}
    <div className="oil-card-modern">

  {/* Image */}
  <div className="oil-media">
    {/* <img src={item.images[0]} alt={item.name} className="oil-img-main" />
    <img src={item.images[1]} alt={item.name} className="oil-img-hover" /> */}

    <img
  src={optimizeCloudinary(item.images[0])}
  alt={item.name}
  className="oil-img-main"
/>

<img
  src={optimizeCloudinary(item.images[1])}
  alt={item.name}
  className="oil-img-hover"
/>


    <span className="oil-tag">New</span>

    <button
      className="oil-cart-fab"
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart(item);
      }}
    >
      +
    </button>
  </div>

  {/* Floating content */}
  <div className="oil-glass">
    <h6>{item.name}</h6>

    <div className="oil-price-row">
      {item.originalPrice > item.discountedPrice && (
        <span className="oil-old">₹{item.originalPrice}</span>
      )}
      <span className="oil-new">₹{item.discountedPrice}</span>
    </div>

    <button
      className="oil-view-btn"
      onClick={() => navigate(item.link)}
    >
      View Details →
    </button>
  </div>

</div>


        {/* Content */}
        {/* <div className="oil-body">
          <h6 className="oil-title">{item.name}</h6>

          <div className="oil-price">
            {item.originalPrice > item.discountedPrice && (
              <span className="oil-mrp">₹{item.originalPrice}</span>
            )}
            <span className="oil-sale">₹{item.discountedPrice}</span>
          </div>

          <Button
            variant="none"
            className="oil-btn"
            onClick={() => navigate(item.link)}
          >
            View Product →
          </Button>
        </div> */}
      </div>
    </SwiperSlide>
  ))}
</Swiper>



        )}

        {toast.show && (
  <div className="cart-toast">
    <span>✓ Added to cart</span>
  </div>
)}

<div className="custom-swiper-arrows">
  <button
    ref={prevRef}
    className="custom-swiper-prev"
    aria-label="Previous"
  >
    <img src={arrowLeft} alt="Previous" />
  </button>

  <button
    ref={nextRef}
    className="custom-swiper-next"
    aria-label="Next"
  >
    <img src={arrowRight} alt="Next" />
  </button>
</div>


      </Container>
    </div>
  );
}
