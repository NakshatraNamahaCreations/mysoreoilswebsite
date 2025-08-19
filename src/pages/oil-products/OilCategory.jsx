import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";




export default function OilCategory() {
   
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  
  
       

  const productType = [
    
    {
      id: "11",
      name: "White Sesame Oil",
      images: ["/media/oil-white-sesame.jpeg"],
      Link:"/oil-products/WhiteSesameOil"
    },
    {
      id: "6",
      name: "Sunflower Oil",
      images: ["/media/safflower-one.png"],
      Link:"/oil-products/SunflowerOil"
    },
    {
      id: "4",
      name: "Coconut Oil",
      images: ["/media/oil-coconut.jpeg"],
      Link:"/oil-products/CoconutOil"
    },
    {
      id: "5",
      name: "Groundnut Oil",
      images: ["/media/oil-groundnut.jpeg"],
      Link:"/oil-products/GroundnutOil"
    },
    {
      id:"10",
      name: "Safflower Oil",
      images: ["/media/sunflower-one.png"],
      Link:"/oil-products/SafflowerOil"
    }
   
  ];


  useEffect(() => {
    setProducts(productType); // fallback product list

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8011/api/products");
        const oilProducts = res.data.filter(
          (product) => product.category?.toLowerCase() === "oils"
        );
        setProducts(oilProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  
  return (
    <>
    
     
    <div className="container mt-4">
      <Slider {...sliderSettings}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ padding: "0 10px" }}>
            <Link
              to={item.Link ? item.Link : `/product-page/${item.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              
              <div
                className="product-card"
                style={{margin:"10px"}}
              >
                <img
                  src={
                    item.images[0].startsWith("/media")
                      ? item.images[0]
                      : `http://localhost:8011${item.images[0]}`
                  }
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
                      fontWeight: "700",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Rs {item.originalPrice || 500}
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      margin: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Rs {item.discountedPrice || 450}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
    </>
  );
}
