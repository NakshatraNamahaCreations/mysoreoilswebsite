import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav style={{ padding: "10px 20px" }}>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "8px",
          flexWrap: "wrap",
          fontSize: "14px",
        }}
      >
        {items.map((item, index) => (
          <li key={index} style={{ display: "flex", alignItems: "center" }}>
            {index > 0 && <span style={{ margin: "0 5px" }}>/</span>}
            {index === items.length - 1 ? (
              <span style={{ fontWeight: "bold", color: "#00614A" }}>
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                style={{ textDecoration: "none", color: "#00614A", fontWeight: 600 }}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
