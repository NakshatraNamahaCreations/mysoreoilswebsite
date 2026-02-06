import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


function BasicExample({ onCategorySelect, currentCategory }) {
  const [activeKey, setActiveKey] = useState(null);
   const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const navigate = useNavigate();
      const categoryRefs = useRef({});



 {/*} const accordionItems = [
    { key: "1", title: "Oils", img: "/media/olive.png", link: "/categories", body: "Cooking Oils<br/>Essential oils" },
    { key:"2", title:"Millets", img:"/media/millet-crop.png", link:"/MilletCategories"},
    { key: "6", title: "Spice Powders", img: "/media/chilly-powder.png", link: "" },
    { key: "5", title: "Cosmetics", img: "/media/cosmetic.png", link: "/CosmeticsCategory" },
    { key: "2", title: "Clay Utensils", img: "/media/clay-utensils.png", link: "/Clay-Utensils" },
    { key: "3", title: "Snacks", img: "media/chakli.png", link: "" },
    { key: "4", title: "Ice Cream", img: "/media/cream-ice.png", link: "/IceCreamCategories" },
    
    
    { key: "7", title: "Fruits", img: "/media/fresh-fruits.png", link: "", body: "Sweet<br/>Sour<br/>Salt" },
    { key: "8", title: "Vegetables", img: "/media/veggy.png", link: "", body: "Poha<br/>Rava" },
    {key: "9", title:"Dry Fruits", img:"/media/cashew-nut.png", link:""},
    {key: "10", title:"Home Essentials", img:"/media/home-essentials.png", link:"/home-essentials"},
    { key: "11", title: "Gifting Solutions", img: "/media/gift-solution.png", link: "/Gifting-Solutions" },
    
  ];*/}

  const imageMappings = {
    Oils: "/media/oil-bottle-1.png" ,
    Millets: "/media/millet-bag-1.png",
    SpicePowders:"/media/chilly-powder.png",
    Cosmetics: "/media/cosmetics-set-1.png",
    Utensils: "/media/clay-pot-1.png",
    Snacks: "/media/snacks-plate-1.png",
    IceCream: "/media/icecream-scoop-1.png",
    Fruits: "/media/fruits-1.png",
    Vegetables: "/media/vegetables-1.png",
    DryFruits :"/media/dry-fruits-1.png",
    HomeEssentials:"/media/essentials-1.png",
    GiftingSolutions: "/media/giftbox-1.png"
  }

  
//  const bodyContent = {
   // Oils: "Cooking Oils<br/>Essential oils",
   
//  };

  const imageStyles = {
    "Millets":{width:"120px", height:"80px", objectFit:"cover", right:"15%"},
  "SpicePowders": { width: "100px", height: "80px", objectFit: "contain ", right:"15%"},
  "Cosmetics": { width: "65px", height: "80px", objectFit: "contain" },
  "Oils": { width: "70px", height: "100px", objectFit: "contain" },
  "Utensils": { width: "100px", height: "100px", objectFit: "contain", right:"4%" },
  "Snacks":{width:"100px", height:"70px", objectFit:"cover", right:"10%"},
  "Ice Cream":{width:"60px", height:"60px", objectFit:"cover"},
  "Fruits":{width:"70px", height:"60px", objectFit:"contain"},
  "Vegetables":{width:"70px", height:"60px", objectFit:"contain"},
  "GiftingSolutions":{width:"70px", height:"60px", objectFit:"contain"},
  "DryFruits":{width:"100px", height:"100px", objectFit:"cover", right:"10%"},
  "HomeEssentials":{width:"70px", height:"100px", objectFit:"contain"}
  
};

  

 useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://api.themysoreoils.com/api/categories");
        const activeCategories = res.data.filter((cat) => cat.status === "Active");
        setCategories(activeCategories);

        // Set activeKey based on currentCategory
        if (currentCategory) {
          const selectedCategory = activeCategories.find(
            (cat) => cat.name.toLowerCase() === currentCategory.toLowerCase()
          );
          if (selectedCategory) {
            setActiveKey(selectedCategory._id);
          }
        }
      } catch (err) {
        console.error("Error fetching categories", err);
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [currentCategory]);

  const handleCategorySelect = (name) => {
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  navigate(`/shop?category=${slug}`);
};

useEffect(() => {
  if (!currentCategory || categories.length === 0) return;

  // mobile only
  if (window.innerWidth <= 768) {
    const activeEl = categoryRefs.current[currentCategory.toLowerCase()];
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }
}, [currentCategory, categories]);



  return (
    <>
    <div
  style={{
    paddingRight: "10px",
    overflowY: "visible",
  }}
  className="accordian-slider-wrapper"
>
      {/* <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        {loading ? (
          <Accordion.Item eventKey="loading">
            <Accordion.Header>Loading...</Accordion.Header>
          </Accordion.Item>
        ) : error ? (
          <Accordion.Item eventKey="error">
            <Accordion.Header>{error}</Accordion.Header>
          </Accordion.Item>
        ) : categories.length === 0 ? (
          <Accordion.Item eventKey="empty">
            <Accordion.Header>No categories found</Accordion.Header>
          </Accordion.Item>
        ) : (
          categories.map((item) => {
  const normalizedTitle = item.name.replace(/[/-\s]/g, ''); 
 
  const image = imageMappings[normalizedTitle] || "/media/default.png";
  const style = imageStyles[normalizedTitle] || { width: "70px", height: "60px", objectFit: "contain" };

  return (
    <Accordion.Item eventKey={item._id} key={item._id}>
      <Accordion.Header
        style={{
          backgroundColor: activeKey === item._id ? "#e6ffed" : "#ffffff",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={() => handleCategorySelect(item.name)}  
      >
        <div
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            width: "100%",
          }}
        >
          <img
            src={image}
            alt={item.name}
            style={{
              ...style,
              position: "relative",
              bottom: "20%",
            }}
          />
          <span style={{ fontWeight: "600" }}>{item.name}</span>
        </div>
      </Accordion.Header>

     {/*} {bodyContent[item.name] && (
        <Accordion.Body
          style={{
            fontFamily: "montserrat",
            fontSize: "14px",
            marginTop: "-20px",
            backgroundColor: "#e6ffed",
          }}
          dangerouslySetInnerHTML={{ __html: bodyContent[item.name] }}
        />
      )}*/}
    {/* </Accordion.Item>
            );
          })
        )}
      </Accordion> */}
      <div className="category-round-wrapper">
  <div className="category-round-scroll">
    {categories.map((item) => {
      const normalizedTitle = item.name.replace(/[/-\s]/g, "");
      const image =
        imageMappings[normalizedTitle] || "/media/default.png";

      const isActive =
        currentCategory &&
        item.name.toLowerCase() === currentCategory.toLowerCase();

      return (
       <div
  key={item._id}
  ref={(el) =>
    (categoryRefs.current[item.name.toLowerCase()] = el)
  }
  className={`category-round-item ${isActive ? "active" : ""}`}
  onClick={() => handleCategorySelect(item.name)}
>

          <div className="category-round-img">
            <img src={image} alt={item.name} />
          </div>
          <span>{item.name}</span>
        </div>
      );
    })}
  </div>
</div>

    </div>
    </>
  );
}

export default BasicExample;
