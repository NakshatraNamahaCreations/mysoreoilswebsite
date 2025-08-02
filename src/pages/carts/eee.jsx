<div
style={{
  backgroundColor: "#FBF9F4",
  fontFamily: "kapraneue, sans-serif",
  position: "relative",
}}
className="login-background"
>
<Container>
  <div style={{ padding: "30px", marginTop: "3%" }}>
    <div>
      <h1
        style={{
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          fontSize: "64px",
          letterSpacing: "2px",
        }}
      >
        Your Wishlist
      </h1>
      {wishlist.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            letterSpacing: "1px",
            color: "black",
          }}
        >
          No items in wishlist
        </p>
      ) : (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px",
            padding: "10px",
            margin: "3% 0",
          }}
        >
          {wishlist.map((item) => (
            <div
              className="product-card"
              key={item.id}
              style={{
                border: "2px solid black",
                boxShadow: "1px 1px 6px black",
                borderTopRightRadius: "20px",
                borderBottomRightRadius: "20px",
                width: "100%",
                maxWidth: "800px",
                display: "flex",
                margin: "16px auto",
                overflow: "hidden",
              }}
            >

              <div
                className="product-info"
                style={{
                  padding: "15px 20px",
                  color: "black",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h4
                  style={{
                    fontSize: "44px",
                    fontWeight: "700",
                    marginBottom: "8px",
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </h4>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "5px",
                    marginBottom: "10px",
                  }}
                >
                  {[
                    visiblestar,
                    visiblestar,
                    visiblestar,
                    visiblestar,
                    hiddenstar,
                  ].map((star, i) => (
                    <img
                      key={i}
                      src={star}
                      alt="star"
                      style={{ width: "16px", height: "16px" }}
                    />
                  ))}
                </div>

                <div
                  className="product-price"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <p
                    style={{
                      opacity: 0.5,
                      textDecoration: "line-through",
                      fontSize: "26px",
                      marginRight: "8px",
                      letterSpacing: "1px",
                    }}
                  >
                    Rs {item.originalPrice}
                  </p>
                  <p
                    style={{
                      fontSize: "32px",
                      margin: 0,
                      letterSpacing: "1px",
                    }}
                  >
                    Rs {item.discountedPrice}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <Button
                    onClick={() => navigate(`/product-page`)}
                    variant="none"
                    className="view-button"
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      backgroundImage: "url('/media/AddCart.png')",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      border: "none",
                      padding: "10px 14px",
                      fontSize: "22px",
                      letterSpacing: "1px",
                      flex: 1,
                    }}
                  >
                    VIEW PRODUCT
                  </Button>

                  <Button
                    onClick={() =>
                      dispatch(removeFromWishlist(item.id))
                    }
                    variant="danger"
                    style={{
                      padding: "10px 14px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</Container>
</div>