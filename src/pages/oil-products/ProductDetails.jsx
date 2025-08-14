{
  /*import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Navbar_Menu from "../../components/Navbar_Menu"; // Adjust path as needed
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice"; // Adjust path as needed
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OilCategory from "./OilCategory"; // Adjust path as needed
import { FaHeart } from "react-icons/fa"; // Import heart icon for wishlist

const ProductDetails = () => {
  const { productName } = useParams(); // Get product name from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null); // Store the entire variant object
  const [quantity, setQuantity] = useState(1); // Quantity for cart
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);


  // Fetch product details based on productName
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`https://api.themysoreoils.com/api/products/name/${productName}`);
        const productData = res.data;

        // Format product data
        const formattedProduct = {
          id: productData._id,
          name: productData.name,
          images: productData.images.map((img, index) => ({
            src: `https://api.themysoreoils.com${img}`,
            weight: productData.variants[index]?.quantity || "Default",
            unit: productData.variants[index]?.unit || "",
            price: productData.variants[index]?.price || productData.discountPrice || 0,
          })),
          description: productData.description,
          variants: productData.variants || [],
          originalPrice: productData.variants[0]?.price || 0,
          discountedPrice: productData.discountPrice || productData.variants[0]?.price || 0,
          sku: productData.sku || "N/A",
          nutritionalImage: productData.nutritionImage
            ? `https://api.themysoreoils.com${productData.nutritionImage}`
            : "/media/default-nutrition.jpeg",
          usesImage: productData.usesImage
            ? `https://api.themysoreoils.com${productData.usesImage}`
            : "/media/default-uses.jpeg",
          benefitsImage: productData.benefitsImage
            ? `https://api.themysoreoils.com${productData.benefitsImage}`
            : "/media/default-benefits.jpeg",
          colorMayVaryImage: productData.colorMayVaryImage
            ? `https://api.themysoreoils.com${productData.colorMayVaryImage}`
            : "/media/color-may-vary.jpeg",
        };

        setProduct(formattedProduct);
        setMainImage(formattedProduct.images[0]?.src || "");
        setPrice(formattedProduct.variants[0]?.price || formattedProduct.discountedPrice);
        setSelectedVariant(formattedProduct.variants[0] || null);
        const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      try {
        const wishlistRes = await axios.get(`https://api.themysoreoils.com/api/wishlist/user/${user.id}`);
        const wishlist = wishlistRes.data?.wishlist || [];
        const isWishlisted = wishlist.some(item => item.productId === productData._id);
        setIsInWishlist(isWishlisted);
      } catch (wishlistErr) {
        console.error("Error fetching wishlist:", wishlistErr);
      }
    }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);


  

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return alert("Please select a variant");

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        discountedPrice: price,
        originalPrice: product.originalPrice,
        quantity,
        weight: selectedVariant.quantity,
        unit: selectedVariant.unit,
        image: mainImage,
      })
    );

    navigate("/carts");
  };

  const handleAddToWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      alert("Please log in to add to wishlist.");
      navigate("/login");
      return;
    }

    try {
      await axios.post("https://api.themysoreoils.com/api/wishlist/add", {
        userId: user.id,
        productId: product.id,
      });
setIsInWishlist(true);
      alert("Product added to wishlist!");
    } catch (err) {
      if (err.response?.data?.message === "Product already in wishlist") {
        alert("Product is already in your wishlist.");
      } else {
        console.error("Error adding to wishlist:", err);
        alert("Something went wrong. Try again.");
      }
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar_Menu />
      <Container>
        <Row className="g-0">
          <Col md={6}>
            <div
              style={{
                position: "sticky",
                top: "0px",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                height: "100vh",
                alignItems: "center",
                justifyContent: "start",
                gap: "20px",
              }}
              className="backimg"
            >
              {/* Main Image */
}
{
  /*<div style={{ flex: "0 0 auto" }}>
                <Image
                  src={mainImage}
                  fluid
                  style={{
                    maxHeight: "500px",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Thumbnails Below */
}
{
  /*<div className="d-flex flex-wrap justify-content-center gap-5">
                {product.images.map((imgObj, index) => (
                  <Image
                    key={index}
                    src={imgObj.src}
                    thumbnail
                    onClick={() => {
                      setMainImage(imgObj.src);
                      setSelectedVariant(product.variants[index] || product.variants[0]);
                      setPrice(product.variants[index]?.price || product.discountedPrice);
                    }}
                    style={{
                      width: "180px",
                      height: "180px",
                      objectFit: "contain",
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: "#002209",
                      borderRadius: "100%",
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>

          <Col md={6} style={{ padding: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
                {product.name}
              </h2>
             <Button
  variant="none"
  onClick={handleAddToWishlist}
  style={{
    fontSize: "24px",
    color: isInWishlist ? "#FF0000" : "#00614A", // filled if in wishlist
  }}
  title={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
>
  <FaHeart />
</Button>

            </div>
            <h4 style={{ color: "#002209", fontFamily: "montserrat" }}>
              Rs {price} ({selectedVariant ? `${selectedVariant.quantity} ${selectedVariant.unit}` : "Select variant"})
            </h4>

            <div className="mb-4">
              <span
                style={{
                  backgroundColor: "#d4f7dc",
                  color: "green",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: 600,
                }}
              >
                In stock
              </span>
            </div>

            <div>
              <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
                Description:
              </h5>
            </div>

            <div className="mb-2">
              <h4 style={{ fontSize: "15px", fontFamily: "montserrat" }}>
                {product.description}
              </h4>
            </div>

            <div>
              <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
                Quantity
              </h5>
            </div>

            {/* Variant Buttons (Weight and Unit) */
}
{
  /*} <div
              style={{
                display: "flex",
                justifyContent: "left",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {product.variants.map((variant, i) => (
                <Button
                  className="search-button-slider mb-3"
                  key={i}
                  variant="outline"
                  onClick={() => {
                    setSelectedVariant(variant);
                    setPrice(variant.price);
                    setMainImage(
                      product.images.find((img) => img.weight === variant.quantity)?.src ||
                      product.images[0].src
                    );
                  }}
                  style={{
                    border: "2px solid #fff",
                    color: selectedVariant && selectedVariant.quantity === variant.quantity ? "#fff" : "#fff",
                    backgroundColor:
                      selectedVariant && selectedVariant.quantity === variant.quantity
                        ? "#fff"
                        : "transparent",
                    padding: "6px 14px",
                    fontSize: "16px",
                    borderRadius: "25px",
                    fontWeight: "500",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {variant.quantity} {variant.unit}
                </Button>
              ))}
            </div>

            {/* Quantity Controls (Cart Quantity) */
}
{
  /*} <div style={{ display: "flex", gap: "15px", alignItems: "center" }} className="mb-3">
              <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
                Count:
              </h5>
              <div
                className="d-flex align-items-center justify-content-left mb-3"
                style={{ border: "1px solid #00614A", borderRadius: "25px" }}
              >
                <Button
                  variant="none"
                  onClick={handleDecrement}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    margin: "0",
                    fontSize: "20px",
                  }}
                >
                  -
                </Button>
                <span
                  className="px-3"
                  style={{
                    padding: "6px 12px",
                    fontSize: "16px",
                  }}
                >
                  {quantity}
                </span>
                <Button
                  variant="none"
                  onClick={handleIncrement}
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    borderRadius: "0",
                    fontSize: "20px",
                  }}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Nutritional Information, Uses, Benefits */
}
{
  /*} <div className="mb-3 mt-5">
              <h5 style={{ fontFamily: "montserrat", fontWeight: "bold", marginTop: "60px" }}>
                Nutritional Information
              </h5>
              <img
                src={product.nutritionalImage}
                alt="nutritional-information"
                style={{ width: "70%", height: "500px", objectFit: "cover", marginTop: "30px" }}
              />
            </div>
            <div className="mb-3 mt-5">
              <h5 style={{ fontFamily: "montserrat", fontWeight: "bold", marginTop: "60px" }}>
                Uses
              </h5>
              <img
                src={product.usesImage}
                alt="uses"
                style={{ width: "70%", height: "500px", objectFit: "cover", marginTop: "30px" }}
              />
            </div>
            <div className="mb-3 mt-5">
              <h5 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
                Benefits
              </h5>
              <img
                src={product.benefitsImage}
                alt="benefits"
                style={{ width: "70%", height: "500px", objectFit: "cover", marginTop: "20px" }}
              />
            </div>
            <div className="mb-5 mt-5">
              <img
                src={product.colorMayVaryImage}
                alt="color-may-vary"
                style={{ width: "70%", height: "500px", objectFit: "cover" }}
              />
            </div>

            {/* Add to Cart, Buy Now, and Wishlist Buttons */
}
{
  /*} <div
              className="d-flex"
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "#fff",
                padding: "10px 20px",
                zIndex: 10,
                width: "100%",
                gap: "10px",
              }}
            >
              <Button
                onClick={handleAddToCart}
                variant="warning"
                style={{ flex: 1, padding: "15px 20px" }}
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => {
                  if (localStorage.getItem("user")) {
                    handleAddToCart();
                    navigate("/carts");
                  } else {
                    navigate("/login");
                  }
                }}
                variant="warning"
                style={{ flex: 1 }}
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="mb-3" style={{ marginTop: "30%" }}>
          <h5 style={{ fontFamily: "montserrat", fontWeight: "bold", marginLeft: "120px" }}>
            You may also like this
          </h5>
        </div>
        <OilCategory />
      </Container>
    </>
  );
};

export default ProductDetails;*/
}

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navbar_Menu from "../../components/Navbar_Menu";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OilCategory from "./OilCategory";
import { FaHeart } from "react-icons/fa";
import { Table, Badge } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import Footer from "../../components/Footer";
import FooterOne from "../../components/FooterOne";




const ProductDetails = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [price, setPrice] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `https://api.themysoreoils.com/api/products/name/${productName}`
        );
        const productData = res.data;

        const formattedProduct = {
          id: productData._id,
          name: productData.name,
          category: productData.category,  
          images: productData.images.map((img, index) => ({
            src: `https://api.themysoreoils.com${img}`,
            weight: productData.variants[index]?.quantity || "Default",
            unit: productData.variants[index]?.unit || "",
            price:
              productData.variants[index]?.price ||
              productData.discountPrice ||
              0,
          })),
          description: productData.description,
          variants: productData.variants || [],
          originalPrice: productData.variants[0]?.price || 0,
          discountedPrice:
            productData.discountPrice || productData.variants[0]?.price || 0,
          nutritionalImage: productData.nutritionImage
            ? `https://api.themysoreoils.com${productData.nutritionImage}`
            : "/media/default-nutrition.jpeg",
          usesImage: productData.usesImage
            ? `https://api.themysoreoils.com${productData.usesImage}`
            : "/media/default-uses.jpeg",
          benefitsImage: productData.benefitsImage
            ? `https://api.themysoreoils.com${productData.benefitsImage}`
            : "/media/default-benefits.jpeg",
          colorMayVaryImage: productData.colorMayVaryImage
            ? `https://api.themysoreoils.com${productData.colorMayVaryImage}`
            : "/media/color-may-vary.jpeg",
        };

       let combinedThumbnails = formattedProduct.images.map((img) => ({
  ...img,
  type: "variant",
}));

// Add info images only if category is 'Oils'
if (formattedProduct.category?.toLowerCase() === "oils") {
  const infoImages = [
    { src: formattedProduct.nutritionalImage, type: "info" },
    { src: formattedProduct.usesImage, type: "info" },
    { src: formattedProduct.benefitsImage, type: "info" },
    { src: formattedProduct.colorMayVaryImage, type: "info" },
  ];
  combinedThumbnails = [...combinedThumbnails, ...infoImages];
}


        setProduct(formattedProduct);
        setMainImage(formattedProduct.images[0]?.src || "");
        setPrice(
          formattedProduct.variants[0]?.price ||
            formattedProduct.discountedPrice
        );
        setSelectedVariant(formattedProduct.variants[0] || null);
        setThumbnails(combinedThumbnails);

        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
          try {
            const wishlistRes = await axios.get(
              `https://api.themysoreoils.com/api/wishlist/user/${user.id}`
            );
            const wishlist = wishlistRes.data?.wishlist || [];
            const isWishlisted = wishlist.some(
              (item) => item.productId === productData._id
            );
            setIsInWishlist(isWishlisted);
          } catch (wishlistErr) {
            console.error("Error fetching wishlist:", wishlistErr);
          }
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedVariant) return alert("Please select a variant");
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        discountedPrice: price,
        originalPrice: product.originalPrice,
        quantity,
        weight: selectedVariant.quantity,
        unit: selectedVariant.unit,
        image: mainImage,
      })
    );
    navigate("/carts");
  };

  const handleAddToWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      alert("Please log in to add to wishlist.");
      navigate("/login");
      return;
    }
    try {
      await axios.post("https://api.themysoreoils.com/api/wishlist/add", {
        userId: user.id,
        productId: product.id,
      });
      setIsInWishlist(true);
      alert("Product added to wishlist!");
    } catch (err) {
      if (err.response?.data?.message === "Product already in wishlist") {
        alert("Product is already in your wishlist.");
      } else {
        console.error("Error adding to wishlist:", err);
        alert("Something went wrong. Try again.");
      }
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar_Menu />
      <Container>
        <Row className="g-0">
          <Col md={6}>
            <div
              style={{
                position: "sticky",
                top: "0px",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "20px",
                height: "100vh",
                alignItems: "center",
                justifyContent: "start",
                gap: "20px",
              }}
            >
              <div style={{ flex: "0 0 auto" }}>
                <Image
                  src={mainImage}
                  fluid
                  style={{ maxHeight: "500px", objectFit: "cover" }}
                />
              </div>
              <div className="d-flex flex-wrap justify-content-center gap-5">
               {/*} {thumbnails.map((imgObj, index) => (
                  <Image
                    key={index}
                    src={imgObj.src}
                    thumbnail
                    onClick={() => {
                      setMainImage(imgObj.src);
                      if (imgObj.type === "variant") {
                        const variant = product.variants.find(
                          (v) => v.quantity === imgObj.weight
                        );
                        setSelectedVariant(variant || product.variants[0]);
                        setPrice(variant?.price || product.discountedPrice);
                      }
                    }}
                   style={{
      width: "120px",
      height: "120px",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid #00614a",
      
      borderRadius: "10px",
    }}
                  />
                ))}*/}
{thumbnails
  .filter((imgObj) => imgObj.src && imgObj.src !== "" && !imgObj.src.includes("undefined")) // Filter empty or invalid URLs
  .map((imgObj, index) => (
    <Image
      key={index}
      src={imgObj.src}
      thumbnail
      onClick={() => {
        setMainImage(imgObj.src);
        if (imgObj.type === "variant") {
          const variant = product.variants.find(
            (v) => v.quantity === imgObj.weight
          );
          setSelectedVariant(variant || product.variants[0]);
          setPrice(variant?.price || product.discountedPrice);
        }
      }}
      style={{
        width: "120px",
        height: "120px",
        objectFit: "cover",
        cursor: "pointer",
        border: "2px solid #00614a",
        borderRadius: "10px",
      }}
    />
  ))}


              </div>
            </div>
          </Col>
          <Col md={6} style={{ padding: "40px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ fontFamily: "montserrat", fontWeight: "bold" }}>
                {product.name}
              </h2>
              <Button
                variant="none"
                onClick={handleAddToWishlist}
                style={{
                  fontSize: "24px",
                  color: isInWishlist ? "#FF0000" : "#00614A",
                }}
                title={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
              >
                <FaHeart />
              </Button>
            </div>
           
          
              <h4 style={{ color: "#00614A", fontFamily: "Montserrat" }}>
              ₹{price}  (
              {selectedVariant
                ? `${selectedVariant.quantity} ${selectedVariant.unit}`
                : "Select variant"}
              )
              <span className="ms-2 text-danger text-decoration-line-through">₹650</span>
              <span className="ms-2 text-success">20% OFF</span>
            </h4>
            <div className="mb-4">
              <span
                style={{
                  backgroundColor: "#d4f7dc",
                  color: "green",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontWeight: 600,
                }}
              >
                In stock
              </span>
            </div>

            <h6 className="text-muted">SKU: 9876543210</h6>

           
           <div className="mt-4">
  <h5 className="fw-bold" style={{ fontFamily: "poppins" }}>
    Select Quantity
  </h5>
  <div className="d-flex gap-2">
    {product.variants.map((variant, i) => (
      <Button
        key={i}
        variant={
          selectedVariant && selectedVariant.quantity === variant.quantity
            ? "success"
            : "outline-success"
        }
        className="rounded-pill px-3"
        onClick={() => {
          setSelectedVariant(variant);
          setPrice(variant.price);
          setMainImage(
            thumbnails.find((img) => img.weight === variant.quantity)?.src ||
              thumbnails[0].src
          );
        }}
        style={{ fontFamily: "poppins" }}
      >
        {variant.quantity} {variant.unit}
      </Button>
    ))}
  </div>
</div>

               {/*} <div className="mt-4">
              <h5 className="fw-bold" style={{fontFamily:"poppins"}}>Select Quantity</h5>
              <div className="d-flex gap-2">
                {weights.map((weight, i) => (
                  
                  <Button
                    key={i}
                    variant={selectedWeight === weight ? "success" : "outline-success"}
                    className="rounded-pill px-3"
                    onClick={() => setSelectedWeight(weight)}
                    style={{fontFamily:"poppins"}}
                  >
                    {weight}
                  </Button>
                ))}
              </div>
            </div>*/}

              
            <div className="mt-4 d-flex align-items-center gap-3">
              <h6 className="fw-bold mb-0" style={{fontFamily:"poppins"}}>Count:</h6>
              <div className="d-flex align-items-center border rounded-pill px-3">
                <Button variant="link" onClick={handleDecrement} className="text-dark fw-bold">-</Button>
                <span className="px-3">{quantity}</span>
                <Button variant="link" onClick={handleIncrement} className="text-dark fw-bold">+</Button>
              </div>
            </div>
           

              <div className="alert alert-warning mt-4" style={{fontFamily:"poppins"}}>
               Shop ₹2000 more and enjoy <b>*FREE Shipping*</b> on your order.
            </div>
            <div
              className="d-flex"
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "#fff",
                padding: "10px 20px",
                zIndex: 10,
                width: "100%",
                gap: "10px",
              }}
            >
             <Button onClick={handleAddToCart} variant="warning" style={{ flex: 1, 

              }}>
              Add to Cart
            </Button>
           <Button
             onClick={() => {
               if (localStorage.getItem("user")) {
                 handleAddToCart();  // Add to cart before redirecting
                 navigate("/carts");
               } else {
                 navigate("/login");
               }
             }}
             variant="warning"
             style={{ flex: 1 }}
           >
             Buy Now
           </Button>
            </div>

<Table bordered responsive className="mt-4" >
                        <tbody>
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Price + Offer</strong></td>
                            <td style={{fontFamily:"poppins",padding:"15px"}}>₹480.00 <del className="text-muted">₹650.00</del> <span className="text-success">20% Off</span></td>
                          </tr>
                          <tr>
                            <td style={{fontFamily:"poppins",padding:"15px"}}><strong>Highlight</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><Badge bg="dark" className="me-2">ONLINE EXCLUSIVE</Badge> <code style={{color:"#000", fontSize:"16px"}}>COLD-PRESSED</code></td>
                          </tr>
                         
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Popularity Info</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}>
                              <span className="d-block bg-light p-1 rounded">423 people viewed this item in last 7 days</span>
                              <span className="d-block bg-light p-1 rounded mt-1">12 customers purchased in last 72 hrs</span>
                            </td>
                          </tr>
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Size/Quantity Selector</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}>(1L Cold-Pressed)(1L Wood-Pressed)(5L)</td>
                          </tr>
                          
                          
                          <tr>
                            <td style={{fontFamily:"poppins", padding:"15px"}}><strong>Customer Benefits</strong></td>
                            <td style={{fontFamily:"poppins", padding:"15px"}}>
                              <ul className="list-unstyled mb-0">
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2 " />100% Pure</li>
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2" />Wood Cold Pressed</li>
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2" />Lab Tested</li>
                                <li className="mb-2"><FaCheckCircle color="green" className="me-2" />No Chemicals or Preservatives</li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </Table>

          </Col>
        </Row>
      </Container>
      <Container style={{marginTop:"-200px"}}>
        <div className="mb-3" style={{ marginTop: "30%" }}>
          <h5
            style={{
              fontFamily: "montserrat",
              fontWeight: "bold",
              marginLeft: "120px",
            }}
          >
            You may also like this
          </h5>
        </div>
        <OilCategory />
      </Container>

      {/*Footer section */}
      <div className="mt-5">
      <FooterOne/>
      </div>
    </>
  );
};

export default ProductDetails;
