import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
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
  GiftingSolutions: "/media/gift-solution.png"
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
  HomeEssentials: { width: "90px", height: "100px", objectFit: "contain" }
};

const BrowserSlider = () => {
  const scrollRef = useRef();
  const navigate = useNavigate();  // <-- Initialize useNavigate
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://api.themysoreoils.com/api/categories");
        const activeCategories = res.data.filter(cat => cat.status === "Active");
        setCategories(activeCategories);
      } catch (err) {
        console.error("Error fetching categories", err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") current.scrollLeft -= 200;
    else current.scrollLeft += 200;
  };

const handleCategorySelect = (name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  navigate(`/categories?category=${slug}`);
};


  if (loading) return <div>Loading Categories...</div>;
  if (error) return <div>{error}</div>;

  


  return (
    <div className="browse-wrapper d-flex  justify-content-center flex-column">
      <div className="browse-header" style={{ marginTop: "30px" }}>
        <h2 style={{
          textAlign: "left",
          fontSize: "30px",
          letterSpacing: ".5px",
          fontWeight: "800",
          marginBottom: "2%",
        }}>Browse by Category</h2>
        <div className="arrow-buttons">
          <button onClick={() => scroll("left")} style={{ backgroundColor: "#fff" }}>‹</button>
          <button onClick={() => scroll("right")} style={{ backgroundColor: "#fff" }}>›</button>
        </div>
      </div>

      <div className="category-slider" ref={scrollRef}>
        {categories.map((cat, index) => {
          const normalizedLabel = cat.name.replace(/[-\s]/g, '');
          const imgSrc = imageMappings[normalizedLabel] || "/media/default.png";
          const imgStyle = imageStyles[normalizedLabel] || { width: "100px", height: "100px", objectFit: "contain" };

          return (
            <div
              key={index}
              className="category-card"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategorySelect(cat.name)}  
            >
              <div className="card-top-bg"></div>
              <p>{cat.name}</p>
              <img
                src={imgSrc}
                alt={cat.name}
                style={{
                  ...imgStyle,
                  position: "relative",
                  bottom: "20%",
                }}
              />
              <img className="hover-icon" src="/media/greenarrow.png" alt="icon" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowserSlider;