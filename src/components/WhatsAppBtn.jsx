"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppBtn.css";

export default function WhatsAppButton() {
  const [hideBtn, setHideBtn] = useState(false);

  useEffect(() => {
    const banner = document.getElementById("banner-section");
    if (!banner) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideBtn(entry.isIntersecting);
      },
      { threshold: 0.6 }
    );

    observer.observe(banner);

    return () => observer.disconnect();
  }, []);

  return (
    <a
      href="https://wa.me/6362902455"
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-float ${hideBtn ? "hide" : ""}`}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} color="#fff" />
    </a>
  );
}
