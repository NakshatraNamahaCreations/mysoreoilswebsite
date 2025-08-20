import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";

// ---------- helpers ----------
const API_BASE = "https://api.themysoreoils.com";

const buildImageUrl = (path) => {
  if (!path) return "/media/default.jpg";
  if (path.startsWith("http")) return path;
  // allow local media images used in your fallback list
  if (path.startsWith("/media")) return path;
  return `${API_BASE}${path}`;
};

const normalizeProduct = (p) => {
  const id = p._id || p.id || p.productId || String(Math.random());
  const name = p.name || p.title || "Product";
  const imagesArr = Array.isArray(p.images)
    ? p.images
    : p.image
    ? [p.image]
    : [];
  const imageUrl = buildImageUrl(imagesArr[0] || p.image);
  const originalPrice =
    p.originalPrice ?? p.price ?? p.variants?.[0]?.price ?? 0;
  const discountedPrice =
    p.discountPrice ?? p.discountedPrice ?? originalPrice;
  const link = p.link || p.Link || `/product-page/${id}`;
  return { id, name, imageUrl, originalPrice, discountedPrice, link };
};

export default function OilCategory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ---- local fallback list (note: Link vs link is OK; we normalize) ----
  const productType = [
    {
      id: 4,
      name: "Coconut Oil",
      image: "/media/oil-coconut.jpeg",
      originalPrice: 110,
      discountedPrice: 90,
      Link: "/oil-products/CoconutOil",
    },
    {
      id: 5,
      name: "Groundnut Oil",
      image: "/media/oil-groundnut.jpeg",
      originalPrice: 125,
      discountedPrice: 100,
      Link: "/oil-products/GroundnutOil",
    },
    {
      id: 11,
      name: "White Sesame Oil",
      image: "/media/oil-white-sesame.jpeg",
      originalPrice: 350,
      discountedPrice: 300,
      Link: "/oil-products/WhiteSesameOil",
    },
    {
      id: 6,
      name: "Sunflower Oil",
      image: "/media/safflower-one.png",
      originalPrice: 380,
      discountedPrice: 380,
      Link: "/oil-products/SunflowerOil",
    },
    {
      id: 10,
      name: "Safflower Oil",
      image: "/media/sunflower-one.png",
      originalPrice: 480,
      discountedPrice: 480,
      Link: "/oil-products/SafflowerOil",
    },
  ];

  useEffect(() => {
    // 1) set fallback immediately (normalized)
    setProducts(productType.map(normalizeProduct));

    // 2) fetch from API and replace if success
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        // response can be array or { products: [...] }
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.products || [];

        const oils = data.filter(
          (p) => (p.category || p.categoryName || "").toLowerCase() === "oils"
        );

        setProducts(oils.map(normalizeProduct));
      } catch (err) {
        console.error("Error fetching products:", err);
        // keep fallback already set
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      {/* Optional search input (hooked to searchTerm) */}
      {/* <div className="container mt-3" style={{ maxWidth: 720 }}>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          placeholder="Search oils..."
        />
      </div> */}

      <div className="container mt-4">
        <Slider {...sliderSettings}>
          {filteredProducts.map((item) => (
            <div key={item.id} style={{ padding: "0 10px" }}>
              <Link
                to={item.link}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-card" style={{ margin: "10px" }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "contain",
                    }}
                  />
                  <h4
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      margin: "10px 0",
                      textAlign: "center",
                    }}
                  >
                    {item.name}
                  </h4>

                  <div
                    className="product-price"
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      justifyContent: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <p
                      style={{
                        opacity: 0.5,
                        textDecoration: "line-through",
                        fontSize: "16px",
                        margin: 0,
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Rs {item.originalPrice}
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        margin: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      Rs {item.discountedPrice}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 24 }}>
            No products found.
          </p>
        )}
      </div>
    </>
  );
}
