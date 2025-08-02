import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { object } from "yup";
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";


function BasicExample() {
  const [activeKey, setActiveKey] = useState(null);

  const accordionItems = [
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
    
  ];

  const imageStyles = {
    "Millets":{width:"120px", height:"80px", objectFit:"cover", right:"30%"},
  "Spice Powders": { width: "100px", height: "80px", objectFit: "contain ", right:"15%"},
  "Cosmetics": { width: "65px", height: "80px", objectFit: "contain" },
  "Oils": { width: "70px", height: "100px", objectFit: "contain" },
  "Clay Utensils": { width: "100px", height: "100px", objectFit: "contain", right:"15%" },
  "Snacks":{width:"100px", height:"70px", objectFit:"cover", right:"25%"},
  "Ice Cream":{width:"60px", height:"60px", objectFit:"cover"},
  "Fruits":{width:"70px", height:"60px", objectFit:"contain"},
  "Vegetables":{width:"70px", height:"60px", objectFit:"contain"},
  "Gifting Solutions":{width:"70px", height:"60px", objectFit:"contain"},
  "Dry Fruits":{width:"100px", height:"100px", objectFit:"cover", right:"15%"},
  "Home Essentials":{width:"70px", height:"100px", objectFit:"contain"}
  
};
  return (
    <>
    <div className="accordion-slider-wrapper">
    <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
      {accordionItems.map((item) => (
        <Accordion.Item eventKey={item.key} key={item.key}>
          <Accordion.Header
            style={{
              backgroundColor: activeKey === item.key ? "#e6ffed" : "#ffffff",
              padding: "10px",
              display: "flex",
              alignItems: "left",
              justifyContent: "flex-start",
            }}
          >
            <Link
              to={item.link}
              style={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                gap: "10px",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
    ...imageStyles[item.title],
    position: "relative",
    bottom: "20%",
  }}
              />
              <span>{item.title}</span>
            </Link>
          </Accordion.Header>

          {item.body && (
            <Accordion.Body
              style={{
                fontFamily: "montserrat",
                fontSize: "14px",
                marginTop: "-20px",
                backgroundColor: "#e6ffed",
              }}
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          )}
        </Accordion.Item>
      ))}
    </Accordion>
    </div>
    </>
  );
}

export default BasicExample;
