import React, { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, OverlayTrigger, Tooltip, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

/**
 * PaymentFailed Page
 * - Reads optional URL params: orderId, txnId, amount, method, reason
 * - Shows a friendly empty-state with actions to retry, switch method, view orders, contact support
 * - Copy-to-clipboard for txnId
 *
 * Example route:
 *   /payment-failed?orderId=MO-12345&txnId=TXN998877&amount=1299&method=UPI&reason=Bank%20declined
 */
export default function PaymentFailed() {
  const navigate = useNavigate();

  // ---- Brand palette (matches your app) ----
  const BRAND = {
    dark: "#00614a",         // deep green you use
    mid: "#00614A",          // secondary green
    accent: "#D3B353",       // gold accent
    light: "#F8FAF9",
    danger: "#D72638",
  };

  // ---- Utilities ----
  const fmtINR = (v) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
      Number.isFinite(+v) ? +v : 0
    );

  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const orderId = params.get("orderId") || "";
  const txnId = params.get("txnId") || "";
  const amount = params.get("amount") || "";
  const method = params.get("method") || "";
  const reason = params.get("reason") || "";

useEffect(() => {
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const redirectTimeout = setTimeout(() => {
      navigate("/carts");
    }, 7000);

    return () => {
      clearTimeout(fadeInTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // fallback: do nothing
    }
  };

  const handleRetry = () => {
    // Adjust target as per your checkout flow:
    // If you use a dedicated payment page, send orderId forward
    if (orderId) navigate(`/checkout/payment?orderId=${encodeURIComponent(orderId)}&retry=1`);
    else navigate("/checkout");
  };

  const handleChangeMethod = () => {
    navigate("/checkout?changeMethod=1");
  };

  const handleViewOrders = () => {
    navigate("/orders");
  };

  const supportNumber = "+91 98765 43210";        // TODO: replace with your real number
  const supportEmail = "support@themysoreoils.com"; // TODO: replace with your real email

  // ---- One-time CSS injection (scoped by .pf-* classes) ----
  useEffect(() => {
    const id = "pf-failed-styles";
    if (document.getElementById(id)) return;
    const css = `
      .pf-hero {
        background: radial-gradient(1200px 500px at 10% -10%, rgba(211,179,83,0.25) 0%, rgba(211,179,83,0) 60%),
                    radial-gradient(900px 400px at 90% -20%, rgba(0,97,74,0.25) 0%, rgba(0,97,74,0) 60%),
                    ${BRAND.dark};
        color: white;
        border-radius: 18px;
        padding: 28px 24px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      }
      .pf-icon {
        width: 100px; height: 62px;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(215,38,56,0.1), rgba(215,38,56,0.25));
        border: 2px solid white;
        display: grid; place-items: center;
        box-shadow: 0 8px 20px rgba(215,38,56,0.25), inset 0 0 0 6px rgba(215,38,56,0.1);
      }
      .pf-card {
        background: white;
        border: 1px solid rgba(0,0,0,0.06);
        border-radius: 16px;
        box-shadow: 0 10px 24px rgba(0,0,0,0.08);
      }
      .pf-badge {
        background: rgba(215,38,56,0.12);
        color: #B71C1C;
        border: 1px solid rgba(215,38,56,0.35);
      }
      .pf-actions .btn {
        min-width: 160px;
        border-radius: 999px;
        font-weight: 700;
      }
      .pf-btn-primary {
        background: ${BRAND.mid};
        border-color: ${BRAND.mid};
      }
      .pf-btn-primary:hover {
        background: #015540;
        border-color: #015540;
      }
      .pf-btn-outline {
        color: ${BRAND.mid};
        border-color: ${BRAND.mid};
      }
      .pf-btn-outline:hover {
        color: white;
        background: ${BRAND.mid};
        border-color: ${BRAND.mid};
      }
      .pf-meta dt {
        font-size: 12px; opacity: 0.7; margin-bottom: 4px;
      }
      .pf-meta dd {
        font-weight: 700; margin-bottom: 12px;
      }
      .pf-link {
        color: ${BRAND.accent};
        text-decoration: none;
      }
      .pf-link:hover { text-decoration: underline; }
      .pf-reasons li {
        margin-bottom: 8px;
      }
    `;
    const style = document.createElement("style");
    style.id = id;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
  }, [BRAND.dark, BRAND.mid, BRAND.accent]);

  return (
    <Container style={{ maxWidth: 1100, marginTop: 124, marginBottom: 40 }}>
      {/* Hero */}
      <div className="pf-hero">
        <Row className="align-items-center g-4 d-flex justify-content-center">
          <Col md={7}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div className="pf-icon" aria-hidden="true">
                {/* Cross mark icon */}
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M7 7l10 10M17 7L7 17" stroke="#D72638" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h1 style={{ margin: 0, fontWeight: 800, letterSpacing: "0.5px", fontFamily:"poppins" }}>Payment Failed</h1>
                <p style={{ margin: "6px 0 0", opacity: 0.9 , fontFamily:"poppins"}}>
                  Unfortunately, we couldn’t complete your transaction. Don’t worry — your order is safe until payment is confirmed.
                </p>
              </div>
            </div>
          </Col>
         
        </Row>
      </div>

    {/*}  <Row className="g-4 mt-3">
        {/* Summary card */}
       {/*} <Col md={7}>
          <Card className="pf-card">
            <Card.Body>
              <Row>
                <Col md={7}>
                  <h5 style={{ fontWeight: 800, color: "#1B1B1B" }}>Transaction Summary</h5>
                  <dl className="pf-meta" style={{ marginTop: 14 }}>
                    <dt>Order ID</dt>
                    <dd>{orderId || "—"}</dd>

                    <dt>Transaction ID</dt>
                    <dd style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span>{txnId || "—"}</span>
                      {!!txnId && (
                        <OverlayTrigger placement="top" overlay={<Tooltip>{copied ? "Copied!" : "Copy"}</Tooltip>}>
                          <Button
                            size="sm"
                            variant="outline-secondary"
                            style={{ borderRadius: 999, padding: "2px 10px" }}
                            onClick={() => handleCopy(txnId)}
                          >
                            {copied ? "Copied" : "Copy"}
                          </Button>
                        </OverlayTrigger>
                      )}
                    </dd>

                    <dt>Payment Method</dt>
                    <dd>{method || "—"}</dd>

                    <dt>Amount</dt>
                    <dd>{amount ? fmtINR(amount) : "—"}</dd>

                    <dt>Attempted On</dt>
                    <dd>{new Date().toLocaleString()}</dd>
                  </dl>
                </Col>
                <Col md={5}>
                  <Alert variant="light" style={{ border: "1px dashed rgba(0,0,0,0.1)" }} aria-live="polite">
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>What next?</div>
                    <ul className="pf-reasons" style={{ paddingLeft: 18, marginBottom: 0 }}>
                      <li>Check UPI app or card OTP and try again.</li>
                      <li>Use an alternate payment method.</li>
                      <li>If amount was debited, it will auto-refund in 5–7 days.</li>
                    </ul>
                  </Alert>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Actions & Help */}
       {/*} <Col md={5}>
          <Card className="pf-card" style={{ height: "100%" }}>
            <Card.Body>
              <h5 style={{ fontWeight: 800, color: "#1B1B1B" }}>Quick Actions</h5>
              <div className="pf-actions" style={{ display: "grid", gap: 10, marginTop: 12 }}>
                <Button className="pf-btn-primary" onClick={handleRetry}>
                  Retry Payment
                </Button>
                <Button variant="outline-success" className="pf-btn-outline" onClick={handleChangeMethod}>
                  Change Payment Method
                </Button>
                <Button variant="outline-dark" className="pf-btn-outline" onClick={handleViewOrders}>
                  View My Orders
                </Button>
              </div>

              <hr style={{ margin: "18px 0", opacity: 0.15 }} />

              <div>
                <h6 style={{ fontWeight: 800, marginBottom: 6 }}>Need help?</h6>
                <p style={{ margin: 0 }}>
                  Call us at{" "}
                  <a className="pf-link" href={`tel:${supportNumber.replace(/\s+/g, "")}`}>
                    {supportNumber}
                  </a>{" "}
                  or email{" "}
                  <a className="pf-link" href={`mailto:${supportEmail}`}>
                    {supportEmail}
                  </a>
                  .
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>*/}

      {/* Helpful FYI */}
      <Row className="mt-3">
        <Col>
          <Alert variant="secondary" style={{ background: BRAND.light, borderColor: "rgba(0,0,0,0.06)" }}>
            <strong>Note:</strong> If the amount was debited by your bank but the order still shows unpaid, it will be
            automatically reversed to your source account within a few working days. You can safely retry now.
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}





