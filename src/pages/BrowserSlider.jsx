import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const imageMappings = {
  Oils: "/media/olive.png",
  Millets: "/media/millet-crop.png",
  SpicePowder: "/media/chilly-powder.png",
  Cosmetics: "/media/cosmetic.png",
  Utensils: "/media/clay-utensils.png",
  Snacks: "/media/chakli.png",
  IceCream: "/media/cream-ice.png",
  Fruits: "/media/fresh-fruits.png",
  Vegetables: "/media/veggy.png",
  DryFruits: "/media/cashew-nut.png",
  HomeEssentials: "/media/home-essentials.png",
  GiftingSolutions: "/media/gift-solution.png",
};

const imageStyles = {
  Millets: { width: "180px", height: "100px", objectFit: "cover" },
  SpicePowder: { width: "120px", height: "100px", objectFit: "cover" },
  Cosmetics: { width: "100px", height: "100px", objectFit: "cover" },
  Oils: { width: "100px", height: "100px", objectFit: "contain" },
  Utensils: { width: "150px", height: "100px", objectFit: "cover", top: "10%" },
  Snacks: { width: "150px", height: "100px", objectFit: "cover" },
  IceCream: { width: "90px", height: "100px", objectFit: "contain" },
  Fruits: { width: "100px", height: "100px", objectFit: "contain" },
  DryFruits: { width: "180px", height: "100px", objectFit: "cover" },
  Vegetables: { width: "150px", height: "100px", objectFit: "contain" },
  GiftingSolutions: { width: "80px", height: "100px", objectFit: "cover" },
  HomeEssentials: { width: "90px", height: "100px", objectFit: "contain" },
};

const SKELETON_COUNT = 8;

const BrowserSlider = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  // viewport-aware scroll step (90% of container width)
  const scrollStep = useMemo(() => {
    if (!scrollRef.current) return 320; // fallback
    return Math.max(280, Math.floor(scrollRef.current.clientWidth * 0.9));
  }, [scrollRef.current?.clientWidth]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://api.themysoreoils.com/api/categories", {
          timeout: 12000,
        });
        const active = (res.data || []).filter((c) => c.status === "Active");
        setCategories(active);
      } catch (e) {
        console.error(e);
        setErrMsg("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const by = dir === "left" ? -scrollStep : scrollStep;
    el.scrollBy({ left: by, behavior: "smooth" });
  };

  const handleCategorySelect = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/categories?category=${slug}`);
  };

  return (
    <div className="browse-wrapper d-flex justify-content-center flex-column">
      <div className="browse-header" style={{ marginTop: "30px", position: "relative" }}>
        <h2
          style={{
            textAlign: "left",
            fontSize: "28px",
            letterSpacing: ".5px",
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          Browse by Category
        </h2>

        {/* Arrow buttons (hidden on small screens via CSS) */}
        <div className="arrow-buttons" aria-hidden="true">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="arrow-btn arrow-left"
            aria-label="Scroll categories left"
            title="Prev"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="arrow-btn arrow-right"
            aria-label="Scroll categories right"
            title="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div
        className="category-slider"
        ref={scrollRef}
        role="list"
        aria-label="Product categories"
      >
        {loading && (
          <>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={`sk-${i}`} className="category-card skeleton" aria-hidden="true">
                <div className="card-top-bg" />
                <p className="cat-title skeleton-text">&nbsp;</p>
                <div className="skeleton-img" />
              </div>
            ))}
          </>
        )}

        {!loading && errMsg && (
          <div role="status" aria-live="polite" style={{ padding: "12px 0" }}>
            {errMsg}
          </div>
        )}

        {!loading &&
          !errMsg &&
          categories.map((cat, index) => {
            const normalizedLabel = cat.name.replace(/[-\s]/g, "");
            const imgSrc = imageMappings[normalizedLabel] || "/media/default.png";
            const imgStyle =
              imageStyles[normalizedLabel] || { width: "100px", height: "100px", objectFit: "contain" };

            return (
              <div
                key={index}
                className="category-card"
                style={{ cursor: "pointer" }}
                role="listitem"
                tabIndex={0}
                onClick={() => handleCategorySelect(cat.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCategorySelect(cat.name);
                  }
                }}
              >
                <div className="card-top-bg" />
                <p className="cat-title" title={cat.name}>
                  {cat.name}
                </p>

                <img
                  src={imgSrc}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    ...imgStyle,
                    position: "relative",
                    bottom: "20%",
                  }}
                />
                <img className="hover-icon" src="/media/greenarrow.png" alt="" aria-hidden="true" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BrowserSlider;
