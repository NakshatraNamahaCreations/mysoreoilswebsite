import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const PRODUCTS_URL = "https://api.themysoreoils.com/api/products"; // list endpoint
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

let __PRODUCT_INDEX_MEMO = null;

async function loadProductIndex() {
  if (__PRODUCT_INDEX_MEMO) return __PRODUCT_INDEX_MEMO;

  try {
    const raw = localStorage.getItem("productIndexCache_v2");
    if (raw) {
      const { at, items } = JSON.parse(raw);
      if (Array.isArray(items) && Date.now() - at < CACHE_TTL_MS) {
        __PRODUCT_INDEX_MEMO = items;
        return items;
      }
    }
  } catch {}

  const res = await axios.get(PRODUCTS_URL);
  const list = Array.isArray(res.data) ? res.data : (res.data?.items || []);

  const index = list.map((p) => {
    const displayName = String(p.productName || p.name || p.title || "").trim();
    const nameNoSpaces = displayName.replace(/\s+/g, "");
    const originalPrice = p.variants?.[0]?.price || 0;
    const discountedPrice = p.discountPrice ?? originalPrice;

    return {
      id: p._id,
      name: displayName,
      imageUrl: p.images?.[0]
        ? `https://api.themysoreoils.com${p.images[0]}`
        : "/media/placeholder.png",
      category: p.category || "",
      link: `/oil-products/${nameNoSpaces}`,
      originalPrice,
      discountedPrice,
    };
  });

  __PRODUCT_INDEX_MEMO = index;
  try {
    localStorage.setItem("productIndexCache_v2", JSON.stringify({ at: Date.now(), items: index }));
  } catch {}
  return index;
}

function matches(p, q) {
  const s = q.toLowerCase().trim();
  return (
    String(p.name || "").toLowerCase().includes(s) ||
    String(p.category || "").toLowerCase().includes(s)
  );
}

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").trim();

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (!q) return;
    let mounted = true;

    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const idx = await loadProductIndex();
        const found = idx.filter((p) => matches(p, q));
        if (mounted) setResults(found);
      } catch (e) {
        if (mounted) setErr("Unable to load products.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [q]);

  if (!q) return <div className="container py-4">Enter a term to search.</div>;

  return (
    <div className="container py-4">
      <h4 className="mb-3">Search results for “{q}”</h4>
      {loading && <div>Loading…</div>}
      {err && <div className="text-danger">{err}</div>}
      {!loading && !err && results.length === 0 && <div>No products found. Try a different keyword.</div>}

      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "30px",
          marginTop: "3%",
        }}
      >
        {results.map((item) => (
          <Link key={item.id} to={item.link} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="product-card">
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "100%", height: "240px", objectFit: "contain" }}
              />
              <h4 style={{ fontSize: "16px", fontWeight: "600", color:"black" }}>{item.name}</h4>

              <div
                className="product-price"
                style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}
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
                  Rs {item.originalPrice}
                </p>
                <p style={{ fontSize: "18px", fontWeight: "700", margin: 0, whiteSpace: "nowrap" }}>
                  Rs {item.discountedPrice}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
