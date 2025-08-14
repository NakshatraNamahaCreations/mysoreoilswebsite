import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const DownloadPDF = ({ order, address, orderItems, subtotal, shipping, tax, total }) => {
  const [logoBase64, setLogoBase64] = useState(null);

  const createdDate = order?.createdAt ? new Date(order.createdAt) : new Date();
  const formattedDate = createdDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedTime = createdDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Convert logo to base64 for PDF
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const logoUrl = "/media/MysuruOilsLogo.png"; // Your logo URL
        const response = await fetch(logoUrl, {
          mode: "cors",
          credentials: "same-origin",
        });
        const blob = await response.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => setLogoBase64(reader.result);
      } catch (err) {
        console.error("Failed to load logo:", err);
        setLogoBase64(null);
      }
    };
    loadLogo();
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Set font and colors
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    // Add centered logo at the top
    let yPosition = 10;
    if (logoBase64) {
      try {
        const logoWidth = 40; // Logo width in mm
        const xPosition = (pageWidth - logoWidth) / 2; // Center the logo
        doc.addImage(logoBase64, "PNG", xPosition, yPosition, logoWidth, 20);
        yPosition += 30; // Space after logo
      } catch (err) {
        console.error("Failed to add logo to PDF:", err);
      }
    }

    // Company Details (centered)
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Mysuru Oils", pageWidth / 2, yPosition, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Ground Floor, No 203, Chikkgowdanapaly, Kengeri Hobli, Bengaluru - 560060",
      pageWidth / 2,
      yPosition + 10,
      { align: "center" }
    );
    doc.text("Phone: +91 84948 86090", pageWidth / 2, yPosition + 20, { align: "center" });
    doc.text("GSTIN: 29AAWFT9273G1Z6", pageWidth / 2, yPosition + 30, { align: "center" });
    yPosition += 40;

    // Order Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const shortId = order?._id ? order._id.slice(-8) : "XXXXXX";
    doc.text(`Bill No: S/25-26/${shortId}`, 20, yPosition + 10);
    doc.text(`Date: ${formattedDate}`, pageWidth - 20, yPosition + 10, { align: "right" });
    doc.text("Kiran 8035898294", 20, yPosition + 20);
    doc.text(`Time: ${formattedTime}`, pageWidth - 20, yPosition + 20, { align: "right" });

    // Product Table Header
    yPosition += 40;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Products", 20, yPosition);
    doc.setFontSize(12);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 5, pageWidth - 20, yPosition + 5); // Horizontal line

    // Table Headers
    doc.setFont("helvetica", "bold");
    doc.text("Product", 20, yPosition + 15);
    doc.text("Quantity", 120, yPosition + 15, { align: "center" });
    doc.text("Price", pageWidth - 20, yPosition + 15, { align: "right" });
    doc.line(20, yPosition + 20, pageWidth - 20, yPosition + 20); // Horizontal line under headers

    // Table Data (FIX: use safe field names and compute totals properly)
    yPosition += 30;
    (orderItems || []).forEach((item) => {
      const name = String(item?.name ?? item?.productName ?? item?.title ?? "Product");
      const qty = Number(item?.quantity ?? item?.qty ?? 1) || 1;
      const unit =
        Number(item?.unitPrice ?? item?.discountedPrice ?? item?.price ?? item?.amount ?? 0) || 0;
      const lineTotal = unit * qty;

      doc.setFont("helvetica", "bold");
      doc.text(name, 20, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text("200 ml", 20, yPosition + 5); // Keep your placeholder

      doc.text(String(qty), 120, yPosition, { align: "center" });
      doc.setFont("helvetica", "bold");
      doc.text(`Rs ${lineTotal.toFixed(2)}`, pageWidth - 20, yPosition, { align: "right" });

      yPosition += 25;
    });

    // Invoice Summary
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Summary", 20, yPosition + 10);
    doc.setFontSize(12);
    doc.line(20, yPosition + 15, pageWidth - 20, yPosition + 15); // Horizontal line

    yPosition += 25;
    doc.setFont("helvetica", "normal");
    doc.text("SUB TOTAL", pageWidth - 70, yPosition, { align: "right" });
    doc.text(`Rs ${Number(subtotal || 0).toFixed(2)}`, pageWidth - 20, yPosition, { align: "right" });
    yPosition += 10;

    doc.text("SHIPPING", pageWidth - 70, yPosition, { align: "right" });
    doc.text(`Rs ${Number(shipping || 0).toFixed(2)}`, pageWidth - 20, yPosition, { align: "right" });
    yPosition += 10;

    doc.text("GST (18%)", pageWidth - 70, yPosition, { align: "right" });
    doc.text(`Rs ${Number(tax || 0).toFixed(2)}`, pageWidth - 20, yPosition, { align: "right" });
    yPosition += 10;

    doc.setFont("helvetica", "bold");
    doc.text("AMOUNT PAID", pageWidth - 70, yPosition, { align: "right" });
    doc.text(`Rs ${Number(total || 0).toFixed(2)}`, pageWidth - 20, yPosition, { align: "right" });

    // Save the PDF
    doc.save(`Order_Invoice_${shortId}.pdf`);
  };

  return (
    <Button
      type="button"
      variant="outline-dark"
      onClick={handleDownload}
      style={{ fontSize: "14px", fontWeight: "600" }}
    >
      DOWNLOAD
    </Button>
  );
};

export default DownloadPDF;
