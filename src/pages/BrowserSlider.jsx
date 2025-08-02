
import  { useRef } from "react";
import { Link } from "react-router-dom";



const categories = [
  { label: "Oils", img:"/media/olive.png",Link:"/categories" },
  {label:"Millets", img:"/media/millet-crop.png", Link:"/MilletCategories"},
   { label: "Spice Powder",img:"/media/chilly-powder.png", Link:'/' },
   { label: "Cosmetics",img:"/media/cosmetic.png" , Link:'/CosmeticsCategory' },
  { label: "Clay Utensils",img:"/media/clay-utensils.png", Link:"/Clay-Utensils" },
  { label: "Snacks",img:"/media/chakli.png" },
  { label: "Ice Cream" , img:"/media/cream-ice.png", Link:"/IceCreamCategories"},
  
 
  { label: "Fruits",img:"/media/fresh-fruits.png" },
   { label: "Vegetables",img:"/media/veggy.png" },
   {label:"Dry Fruits", img:"/media/cashew-nut.png"},
   {label:"Home Essentials", img:"/media/home-essentials.png", Link:"/home-essentials"},
   { label: "Gift Solutions",img:"/media/gift-solution.png" , Link:"/Gifting-Solutions" },
    
];
const imageStyles = {
  "Millets": {width: "180px", height: "100px", objectFit:"cover"},
  "Spice Powder": { width: "120px", height: "100px", objectFit: "cover " },
  "Cosmetics": { width: "100px", height: "100px", objectFit: "cover" },
  "Oils": { width: "100px", height: "100px", objectFit: "contain" },
  "Clay Utensils": { width: "150px", height: "100px", objectFit: "cover", top: "10%" },
  "Snacks":{width:"150px", height:"100px", objectFit:"cover"},
  "Ice Cream":{width:"90px", height:"100px", objectFit:"contain"},
  "Fruits":{width:"100px", height:"100px", objectFit:"contain"},
  "Dry Fruits":{width:"180px", height:"100px", objectFit:"Cover"},
  "Vegetables":{width:"150px", height:"100px", objectFit:"contain"},
  "Gift Solutions":{width:"80px", height:"100px", objectFit:"cover"},
  "Home Essentials":{width:"90px", height:"100px", objectFit:"contain"}
};



const BrowserSlider = () => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") current.scrollLeft -= 200;
    else current.scrollLeft += 200;
  };

  return (
    <div className="browse-wrapper">
      <div className="browse-header" style={{marginTop:"30px"}}>
        <h2 style={{
                  textAlign: "left",
                  fontSize: "30px",
                  letterSpacing: ".5px",
                  fontWeight: "800",
                  marginBottom: "2%",
                }}>Browse by Category</h2>
        <div className="arrow-buttons">
          <button onClick={() => scroll("left")} style={{backgroundColor:"#fff"}}>‹</button>
          <button onClick={() => scroll("right")} style={{backgroundColor:"#fff"}}>›</button>
        </div>
      </div>

      <div className="category-slider" ref={scrollRef}>
        {categories.map((cat, index) => (
          <Link
            to={cat.Link}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
          <div className="category-card" key={index}>
            <div className="card-top-bg"></div>
            <p>{cat.label}</p>
       <img
  src={cat.img}
  alt={cat.label}
  style={{
    ...imageStyles[cat.label],
    position: "relative",
    bottom: "20%",
  }}
/>



            
             <img className="hover-icon" src="/media/greenarrow.png" alt="icon" />
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowserSlider;
