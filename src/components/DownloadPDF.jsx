import { jsPDF } from "jspdf";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const DownloadPDF = ({ order, address, orderItems, subtotal, shipping, tax, total }) => {
  const [logoBase64, setLogoBase64] = useState(null);

  const createdDate = new Date(order.createdAt);
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
        reader.onloadend = () => {
          setLogoBase64(reader.result);
        };
      } catch (err) {
        console.error("Failed to load logo:", err);
        setLogoBase64(null);
      }
    };

    loadLogo();
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();

    // Set font and colors
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);

    // Add centered logo at the top
    let yPosition = 10;
    if (logoBase64) {
      try {
        const logoWidth = 40; // Logo width in mm
        const pageWidth = 210; // A4 page width in mm
        const xPosition = (pageWidth - logoWidth) / 2; // Center the logo
        doc.addImage(logoBase64, "PNG", xPosition, yPosition, logoWidth, 20); // Centered logo
        yPosition += 30; // Space after logo
      } catch (err) {
        console.error("Failed to add logo to PDF:", err);
      }
    }

    // Company Details (centered)
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Mysuru Oils", 105, yPosition, { align: "center" }); // Centered company name
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Ground Floor, No 203, Chikkgowdanapaly, Kengeri Hobli, Bengaluru - 560060", 105, yPosition + 10, { align: "center" }); // Centered address
    doc.text("Phone: +91 84948 86090", 105, yPosition + 20, { align: "center" }); 
    doc.text("GSTIN: 29AAWFT9273G1Z6", 105, yPosition + 30, { align: "center" });
    yPosition += 40;

    // Updated Order Details Section with current date and time
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Bill No: S/25-26/${order._id.slice(-8)}`, 20, yPosition + 10);
   doc.text(`Date: ${formattedDate}`, 150, yPosition + 10, { align: "right" });
    doc.text("Kiran 8035898294", 20, yPosition + 20);
  doc.text(`Time: ${formattedTime}`, 150, yPosition + 20, { align: "right" });

    // Product Table Header
    yPosition += 40;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Products", 20, yPosition);
    doc.setFontSize(12);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition + 5, 190, yPosition + 5); // Horizontal line

    // Table Headers
    doc.setFont("helvetica", "bold");
    doc.text("Product", 20, yPosition + 15);
    doc.text("Quantity", 120, yPosition + 15, { align: "center" });
    doc.text("Price", 170, yPosition + 15, { align: "right" });
    doc.line(20, yPosition + 20, 190, yPosition + 20); // Horizontal line under headers

    // Table Data
    yPosition += 30;
    orderItems.forEach((item) => {
      const itemPrice = parseFloat(item.discountedPrice) || 0;
      const itemQuantity = parseInt(item.quantity) || 1;
      const totalItemPrice = itemPrice * itemQuantity;

      // Product details (no image)
      doc.setFont("helvetica", "bold");
      doc.text(item.name, 20, yPosition);
      doc.setFont("helvetica", "normal");
      // doc.text(`Rs ${itemPrice.toFixed(2)}`, 20, yPosition + 5);
      // doc.text(`Rs ${(itemPrice * 2).toFixed(2)}`, 20, yPosition + 10, {
      //   textColor: [150, 150, 150], // Gray color for original price
      //   decoration: "lineThrough",
      // });
      doc.text("200 ml", 20, yPosition + 5); // Placeholder for weight

      // Quantity and Price
      doc.text(itemQuantity.toString(), 120, yPosition, { align: "center" });
      doc.setFont("helvetica", "bold");
      doc.text(`Rs ${totalItemPrice.toFixed(2)}`, 170, yPosition, { align: "right" });

      yPosition += 25; // Adjusted spacing
    });

    // Invoice Summary
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Summary", 20, yPosition + 10);
    doc.setFontSize(12);
    doc.line(20, yPosition + 15, 190, yPosition + 15); // Horizontal line

    yPosition += 25;
    doc.setFont("helvetica", "normal");
    doc.text("SUB TOTAL", 120, yPosition, { align: "right" });
    doc.text(`Rs ${subtotal.toFixed(2)}`, 170, yPosition, { align: "right" });
    yPosition += 10;

    doc.text("SHIPPING", 120, yPosition, { align: "right" });
    doc.text(`Rs ${shipping.toFixed(2)}`, 170, yPosition, { align: "right" });
    yPosition += 10;

    doc.text("GST (18%)", 120, yPosition, { align: "right" });
    doc.text(`Rs ${tax.toFixed(2)}`, 170, yPosition, { align: "right" });
    yPosition += 10;

    doc.setFont("helvetica", "bold");
    doc.text("AMOUNT PAID", 120, yPosition, { align: "right" });
    doc.text(`Rs ${total.toFixed(2)}`, 170, yPosition, { align: "right" });

    // Save the PDF
    doc.save(`Order_Invoice_${order._id.slice(-8)}.pdf`);
  };

  return (
    <Button
      variant="outline-dark"
      onClick={handleDownload}
      style={{ fontSize: "14px", fontWeight: "600" }}
    >
      DOWNLOAD
    </Button>
  );
};

export default DownloadPDF;