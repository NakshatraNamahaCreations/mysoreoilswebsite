import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Table, Badge } from "react-bootstrap";
import Navbar_Menu from "../../components/Navbar_Menu";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OilCategory from "./OilCategory";
import { FaHeart, FaCheckCircle } from "react-icons/fa";
import FooterOne from "../../components/FooterOne";

/* =========================
   Helpers (image selection)
   ========================= */
const getVariantThumbSrc = (variant, thumbnails, formattedProduct) => {
  if (!variant) return "";

  // 1) Prefer exact match on variant thumbnails by weight+unit
  const byWeight = thumbnails.find(
    (t) =>
      t?.type === "variant" &&
      t?.weight === variant.quantity &&
      (t?.unit ?? "") === (variant.unit ?? "")
  )?.src;
  if (byWeight) return byWeight;

  // 2) Fallback: index alignment with variants[] and images[]
  const vIdx = Math.max(
    0,
    (formattedProduct?.variants || []).findIndex(
      (v) => String(v?._id) === String(variant?._id)
    )
  );
  const aligned = formattedProduct?.images?.[vIdx]?.src;
  if (aligned) return aligned;

  return "";
};

const getFirstVariantThumbSrc = (thumbnails, formattedProduct) => {
  // Prefer first "variant" type thumbnail
  const firstVariant = thumbnails.find((t) => t?.type === "variant")?.src;
  if (firstVariant) return firstVariant;

  // Fallback to first product image (gallery)
  const firstImage =
    Array.isArray(formattedProduct?.images) && formattedProduct.images.length > 0
      ? formattedProduct.images[0]?.src
      : "";

  return firstImage || "";
};

const ProductDetails = () => {
  const { productName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantQty, setVariantQty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const calcForVariant = (variant, productLevelMRP) => {
    const vPrice = Number(variant?.price) || 0;
    const vDisc = Number(variant?.discountPrice) || 0;
    const pMrp = Number(productLevelMRP) || 0;

    if (vDisc > 0 && vDisc < vPrice) return { sale: vDisc, mrp: vPrice };
    if (vDisc > vPrice) return { sale: vPrice, mrp: vDisc };
    if (pMrp > vPrice) return { sale: vPrice, mrp: pMrp };
    return { sale: vPrice, mrp: vPrice };
  };

  useEffect(() => {
    const humanize = (s) =>
      String(s || "")
        .trim()
        // convert BlackSesameOil -> Black Sesame Oil
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // hyphens/underscores -> spaces
        .replace(/[-_]+/g, " ")
        // collapse spaces
        .replace(/\s+/g, " ")
        .trim();

    const nameCandidatesFromParam = (raw) => {
      const decoded = decodeURIComponent(String(raw || "").replace(/\+/g, " ")).trim();
      const camelToSpace = humanize(decoded);
      const hyphenToSpace = decoded.replace(/[-_]+/g, " ").trim();

      // create a unique, ordered list of candidates
      const set = new Set(
        [decoded, camelToSpace, hyphenToSpace]
          .filter(Boolean)
          // also try title case versions
          .flatMap((n) => {
            const titled = n
              .toLowerCase()
              .replace(/\b\w/g, (m) => m.toUpperCase()); // Title Case
            return [n, titled];
          })
      );
      return Array.from(set);
    };

    const fetchProduct = async () => {
      const rawParam = String(productName ?? "");
      const candidates = nameCandidatesFromParam(rawParam);

      setLoading(true);
      setError(null);

      // helper to transform product to your UI schema
      const hydrateProduct = (productData) => {
        const enrichedVariants = (productData.variants || []).map((v) => {
          const { sale, mrp } = calcForVariant(v, productData.discountPrice);
          return { ...v, _sale: sale, _mrp: mrp };
        });

        // Build formatted product for UI
        const formattedProduct = {
          id: productData._id,
          name: productData.name,
          category: productData.category,
          images: (productData.images || []).map((img, index) => {
            const v = enrichedVariants[index];
            return {
              src: `https://api.themysoreoils.com${img}`,
              weight: v?.quantity || "Default",
              unit: v?.unit || "",
              price: v?._sale ?? v?.price ?? productData.discountPrice ?? 0,
            };
          }),
          description: productData.description,
          variants: enrichedVariants,

          // IMPORTANT:
          // we now set these to null instead of a default placeholder.
          // That way, if the backend didn't provide e.g. usesImage,
          // we won't generate an empty thumbnail box.
          nutritionalImage: productData.nutritionImage
            ? `https://api.themysoreoils.com${productData.nutritionImage}`
            : null,
          usesImage: productData.usesImage
            ? `https://api.themysoreoils.com${productData.usesImage}`
            : null,
          benefitsImage: productData.benefitsImage
            ? `https://api.themysoreoils.com${productData.benefitsImage}`
            : null,
          descriptionImage: productData.descriptionImage
            ? `https://api.themysoreoils.com${productData.descriptionImage}`
            : null,
        };

        // Start thumbnails with the variant images
        let combinedThumbnails = formattedProduct.images.map((img) => ({
          ...img,
          type: "variant",
        }));

        // If category is oils, append ONLY valid info images
        if ((formattedProduct.category || "").toLowerCase() === "oils") {
          const rawInfoImages = [
            { src: formattedProduct.nutritionalImage, type: "info" },
            { src: formattedProduct.usesImage, type: "info" },
            { src: formattedProduct.benefitsImage, type: "info" },
            { src: formattedProduct.descriptionImage, type: "info" },
          ];

          // Filter out missing / invalid / undefined / null / "" images
          const cleanedInfoImages = rawInfoImages.filter(
            (img) =>
              img.src &&
              img.src !== "" &&
              !img.src.toLowerCase().includes("undefined") &&
              !img.src.toLowerCase().includes("null")
          );

          combinedThumbnails = [...combinedThumbnails, ...cleanedInfoImages];
        }

        const firstVariant = enrichedVariants[0] || null;

        setProduct(formattedProduct);
        setThumbnails(combinedThumbnails);
        setSelectedVariant(firstVariant);
        setMainImage(formattedProduct.images[0]?.src || "");
        setPrice(firstVariant?._sale || 0);
        setMrp(firstVariant?._mrp || firstVariant?._sale || 0);

        if (firstVariant?._id) {
          setVariantQty((prev) => ({
            ...prev,
            [firstVariant._id]: prev[firstVariant._id] || 1,
          }));
        }
      };

      try {
        let productData = null;
        let lastErr = null;

        // Try multiple name candidates on the same endpoint
        for (const candidate of candidates) {
          try {
            const url = `https://api.themysoreoils.com/api/products/name/${encodeURIComponent(
              candidate
            )}`;
            const res = await axios.get(url, {
              timeout: 12000,
              // allow 4xx through (so we can try next); 5xx will throw and be caught
              validateStatus: (s) => s >= 200 && s < 500,
            });

            // expect either an object with _id or {product:{...}}
            const maybe =
              (res.data && res.data.product) ||
              (res.data && res.data._id ? res.data : null);

            if (res.status === 200 && maybe && maybe._id) {
              productData = maybe;
              break;
            }

            // Not found this way; try next candidate
            lastErr = `Status ${res.status} for name "${candidate}"`;
          } catch (e) {
            // 5xx / network / CORS; keep the message and continue to next candidate
            lastErr = e?.message || String(e);
          }
        }

        // Final fallback: fetch all and match locally
        if (!productData) {
          try {
            const allRes = await axios.get(
              "https://api.themysoreoils.com/api/products",
              { timeout: 12000 }
            );
            const all = Array.isArray(allRes.data) ? allRes.data : [];

            // build a matcher over normalized names
            const norm = (s) =>
              humanize(String(s || "").toLowerCase())
                .replace(/\s+/g, " ")
                .trim();

            const wantedSet = new Set(candidates.map((c) => norm(c)));
            productData =
              all.find((p) => wantedSet.has(norm(p.name))) ||
              all.find((p) => norm(p.name).includes(norm(rawParam))) ||
              null;

            if (!productData) {
              throw new Error(
                `Could not match any product by name. Tried ${candidates.join(", ")}`
              );
            }
          } catch (e) {
            throw new Error(
              `Product not found for “${rawParam}”. Last error: ${lastErr || "N/A"}`
            );
          }
        }

        // hydrate into your UI
        hydrateProduct(productData);

        // wishlist lookup
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.id) {
          try {
            const wishlistRes = await axios.get(
              `https://api.themysoreoils.com/api/wishlist/user/${user.id}`
            );
            const wishlist = wishlistRes.data?.wishlist || [];
            setIsInWishlist(wishlist.some((item) => item.productId === productData._id));
          } catch (wishlistErr) {
            console.error("Error fetching wishlist:", wishlistErr);
          }
        }
      } catch (err) {
        console.error("Fetch product failed:", err);
        setError(
          typeof err?.message === "string"
            ? err.message
            : "Failed to fetch product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productName]);

  const currentQty = selectedVariant ? variantQty[selectedVariant._id] || 1 : 1;

  const handleIncrement = () => {
    if (!selectedVariant) return;
    setVariantQty((prev) => ({
      ...prev,
      [selectedVariant._id]: (prev[selectedVariant._id] || 1) + 1,
    }));
  };

  const handleDecrement = () => {
    if (!selectedVariant) return;
    setVariantQty((prev) => {
      const cur = prev[selectedVariant._id] || 1;
      return { ...prev, [selectedVariant._id]: Math.max(1, cur - 1) };
    });
  };

  // 🚀 Add to Cart: always add VARIANT image; never add info/description image.
  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Please select a variant");
      return;
    }

    const qty = Math.max(1, Number(currentQty || 1));

    // Choose image for cart: selected variant's image → first variant image fallback
    const imageToUse =
      getVariantThumbSrc(selectedVariant, thumbnails, product) ||
      getFirstVariantThumbSrc(thumbnails, product);

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        category: product.category,
        variantId: selectedVariant._id,
        discountedPrice: Number(price) || 0,
        originalPrice: Number(mrp) || Number(price) || 0,
        quantity: qty,
        weight: selectedVariant.quantity,
        unit: selectedVariant.unit,
        image: imageToUse,
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

  const unitSale = Number(price) || 0;
  const unitMrp = Number(mrp) || unitSale;
  const totalSale = unitSale * currentQty;
  const totalMrp = unitMrp * currentQty;
  const discountPct =
    unitMrp > unitSale ? Math.round(((unitMrp - unitSale) / unitMrp) * 100) : 0;

  return (
    <>
      <Navbar_Menu />
      <Container>
        <Row className="g-0">
          {/* Left: Images */}
          <Col md={6}>
            <div
              className="pd-leftSticky"
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
              {/* Main image preview (with wishlist on mobile) */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={mainImage}
                  fluid
                  className="pd-mainImage"
                  style={{ maxHeight: "500px", objectFit: "cover", borderRadius: "10px" }}
                />

                {/* Wishlist icon (only visible on mobile) */}
                <Button
                  variant="none"
                  onClick={handleAddToWishlist}
                  className="d-md-none"
                  title={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "#fff",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    fontSize: "22px",
                    color: isInWishlist ? "#FF0000" : "#00614A",
                    zIndex: 10,
                  }}
                >
                  <FaHeart />
                </Button>
              </div>

              {/* Thumbnails (variant first, then info) */}
              <div
                className="pd-thumbStrip-wrapper position-relative"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Left arrow */}
                <Button
                  variant="light"
                  className="thumb-arrow-left position-absolute start-0 top-50 translate-middle-y"
                  style={{
                    zIndex: 2,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                  onClick={() => {
                    const el = document.querySelector(".pd-thumbStrip");
                    if (el) el.scrollBy({ left: -150, behavior: "smooth" });
                  }}
                >
                  ❮
                </Button>

                {/* Thumbnail slider */}
                <div
                  className="d-flex flex-row gap-3 pd-thumbStrip"
                  style={{
                    overflowX: "auto",
                    scrollBehavior: "smooth",
                    padding: "10px 50px", // space for arrows
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {thumbnails
                    .filter(
                      (imgObj) =>
                        imgObj.src &&
                        imgObj.src !== "" &&
                        !imgObj.src.toLowerCase().includes("undefined") &&
                        !imgObj.src.toLowerCase().includes("null")
                    )
                    .map((imgObj, index) => (
                      <Image
                        key={index}
                        src={imgObj.src}
                        thumbnail
                        onClick={() => {
                          setMainImage(imgObj.src);

                          // If it's a variant thumb, sync price/variant selection
                          if (imgObj.type === "variant") {
                            const variant =
                              product.variants.find(
                                (v) =>
                                  v.quantity === imgObj.weight &&
                                  (v.unit ?? "") === (imgObj.unit ?? "")
                              ) || product.variants[0];

                            const sale = variant?._sale || variant?.price || 0;
                            const vMrp = variant?._mrp || sale;

                            setSelectedVariant(variant);
                            setPrice(sale);
                            setMrp(vMrp);

                            if (variant?._id) {
                              setVariantQty((prev) => ({
                                ...prev,
                                [variant._id]: prev[variant._id] || 1,
                              }));
                            }
                          }
                        }}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          cursor: "pointer",
                          border: "2px solid #00614a",
                          borderRadius: "10px",
                          flex: "0 0 auto",
                        }}
                      />
                    ))}
                </div>

                {/* Right arrow */}
                <Button
                  variant="light"
                  className="thumb-arrow-right position-absolute end-0 top-50 translate-middle-y"
                  style={{
                    zIndex: 2,
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                  onClick={() => {
                    const el = document.querySelector(".pd-thumbStrip");
                    if (el) el.scrollBy({ left: 150, behavior: "smooth" });
                  }}
                >
                  ❯
                </Button>
              </div>
            </div>
          </Col>

          {/* Right: Details */}
          <Col md={6} className="pd-rightPane" style={{ padding: "40px" }}>
            {/* PRODUCT TITLE + WISHLIST + IN STOCK */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1 1 auto",
                }}
              >
                <h2
                  className="product-title"
                  style={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    marginBottom: 0,
                  }}
                >
                  {product.name}
                </h2>

                {/* Desktop wishlist (keep if you want both) */}
                <Button
                  variant="none"
                  onClick={handleAddToWishlist}
                  className="d-none d-md-inline-flex"
                  style={{
                    fontSize: "24px",
                    color: isInWishlist ? "#FF0000" : "#00614A",
                  }}
                  title={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
                >
                  <FaHeart />
                </Button>
              </div>

              {/* In stock tag */}
              <div className="mt-2 mt-md-0 badge">
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
            </div>

            {/* PRICE SECTION */}
            <h4
              className="product-price mt-3"
              style={{
                color: "#00614A",
                fontFamily: "Montserrat",
              }}
            >
              ₹{totalSale.toFixed(2)}{" "}
              (
              {selectedVariant
                ? `${selectedVariant.quantity} ${selectedVariant.unit}`
                : "Select variant"}
              )
              {totalMrp > totalSale && (
                <>
                  <span className="ms-2 text-danger text-decoration-line-through">
                    ₹{totalMrp.toFixed(2)}
                  </span>
                  <span className="ms-2 text-success">{discountPct}% OFF</span>
                </>
              )}
            </h4>

            <h6 className="text-muted mt-4" style={{ fontFamily: "poppins" }}>
              SKU: 9876543210
            </h6>

            {/* Variant selector buttons */}
            <div className="mt-4">
              <h5 style={{ fontFamily: "montserrat", fontSize: "18px", fontWeight: "600" }}>
                Select Quantity
              </h5>
              <div className="d-flex gap-2 flex-wrap pd-variantBtns">
                {(product.variants || []).map((variant, i) => (
                  <Button
                    key={variant._id || i}
                    variant={
                      selectedVariant && selectedVariant._id === variant._id
                        ? "success"
                        : "outline-success"
                    }
                    className="rounded-pill px-3"
                    onClick={() => {
                      setSelectedVariant(variant);
                      setPrice(variant._sale || variant.price || 0);
                      setMrp(variant._mrp || variant._sale || 0);

                      // Switch preview to this variant's image if available
                      const vImg =
                        getVariantThumbSrc(variant, thumbnails, product) ||
                        getFirstVariantThumbSrc(thumbnails, product);
                      setMainImage(vImg);

                      if (variant?._id) {
                        setVariantQty((prev) => ({
                          ...prev,
                          [variant._id]: prev[variant._id] || 1,
                        }));
                      }
                    }}
                    style={{ fontFamily: "poppins" }}
                  >
                    {variant.quantity} {variant.unit}
                  </Button>
                ))}
              </div>
            </div>

            {/* Qty controls */}
            <div
              key={product.id}
              className="d-flex align-items-center gap-3 mb-3 mt-4"
            >
              <h6 className="fw-bold mb-0" style={{ fontFamily: "poppins" }}>
                Count:
              </h6>
              <div className="d-flex align-items-center border rounded-pill px-3 pd-qtyCtrl">
                <Button
                  variant="link"
                  onClick={handleDecrement}
                  className="text-dark fw-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </Button>
                <span className="px-3">{currentQty}</span>
                <Button
                  variant="link"
                  onClick={handleIncrement}
                  className="text-dark fw-bold"
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Sticky CTAs */}
            <div
              className="d-flex pd-stickyCtas"
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
                type="button"
                onClick={handleAddToCart}
                variant="warning"
                style={{ flex: 1 }}
              >
                Add to Cart
              </Button>
              <Button
                type="button"
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

            {/* Info table (desktop only) */}
            <div className="d-none d-md-block">
              <Table bordered responsive className="mt-4 pd-infoTable">
                <tbody>
                  <tr>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <strong>Price + Offer</strong>
                    </td>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      ₹{totalSale.toFixed(2)}{" "}
                      {totalMrp > totalSale && (
                        <>
                          <del className="text-muted ms-1">₹{totalMrp.toFixed(2)}</del>{" "}
                          <span className="text-success">{discountPct}% Off</span>
                        </>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <strong>Highlight</strong>
                    </td>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <Badge bg="dark" className="me-2">ONLINE EXCLUSIVE</Badge>{" "}
                      <code style={{ color: "#000", fontSize: "16px" }}>COLD-PRESSED</code>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <strong>Popularity Info</strong>
                    </td>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <span className="d-block bg-light p-1 rounded">
                        423 people viewed this item in last 7 days
                      </span>
                      <span className="d-block bg-light p-1 rounded mt-1">
                        12 customers purchased in last 72 hrs
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <strong>Size/Quantity Selector</strong>
                    </td>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      {(product.variants || [])
                        .map((v) => `(${v.quantity} ${v.unit})`)
                        .join("")}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <strong>Customer Benefits</strong>
                    </td>
                    <td style={{ fontFamily: "poppins", padding: "15px" }}>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2"><FaCheckCircle color="green" className="me-2" />100% Pure</li>
                        <li className="mb-2"><FaCheckCircle color="green" className="me-2" />Wood Cold Pressed</li>
                        <li className="mb-2"><FaCheckCircle color="green" className="me-2" />Lab Tested</li>
                        <li className="mb-2"><FaCheckCircle color="green" className="me-2" />No Chemicals or Preservatives</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>

            {/* Mobile View - Combined Description Paragraph */}
            <div className="d-block d-md-none mt-5 mb-3">
              <h3 style={{ fontFamily: "montserrat", fontSize: "20px", color: "#000", fontWeight: "600" }}>
                Description
              </h3>
              <p
                style={{
                  fontFamily: "poppins",
                  lineHeight: "1.7",
                  fontSize: "15px",
                  color: "#000",
                  textAlign: "justify",
                }}
              >
                It is an online exclusive product, made using{" "}
                <code style={{ color: "#000", fontSize: 15 }}>cold-pressed</code> extraction
                methods to ensure maximum purity and nutrient retention.
                Over the past week, 423 people have viewed this item and 12 customers have made
                a purchase within the last 72 hours, showing its growing popularity among buyers.
                The product is available in various size and quantity options such as{" "}
                {(product.variants || []).map((v, i) => (
                  <span key={i}>
                    {v.quantity} {v.unit}
                    {i !== product.variants.length - 1 ? ", " : "."}
                  </span>
                ))}{" "}
                Customers choose this product for its exceptional quality — it’s 100% pure,
                wood cold-pressed, and lab tested to ensure safety and freshness.
                It contains no chemicals or preservatives, making it a healthy and natural
                choice for everyday use.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* You may also like */}
      <Container className="pd-alsoLikeWrap" style={{ marginTop: "-200px" }}>
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

      <div className="mt-5">
        <FooterOne />
      </div>
    </>
  );
};

export default ProductDetails;
