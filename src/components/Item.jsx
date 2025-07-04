import { useEffect } from "react";
import "./Item.css";

function Item({ isOpen, onClose, product, onBuyNow, onAddToCart }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked for:", product.name);
    if (onBuyNow) {
      onBuyNow();
    }
    onClose();
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", product.name);
    if (onAddToCart) {
      onAddToCart();
    }
    onClose();
  };

  return (
    <div className="item-modal-overlay" onClick={handleOverlayClick}>
      <div className="item-modal">
        <button className="item-close-btn" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="item-content">
          <div className="item-left">
            <div className="item-display-box">{product.name}</div>
          </div>

          <div className="item-right">
            <div className="item-details">
              <h2 className="item-name">{product.name}</h2>
              <div className="item-price-section">
                {product.onSale ? (
                  <>
                    <p className="item-original-price">
                      ${product.originalPrice}
                    </p>
                    <p className="item-sale-price">{product.price}</p>
                    <span className="item-savings">
                      Save $
                      {(
                        parseFloat(product.originalPrice.replace("$", "")) -
                        parseFloat(product.price.replace("$", ""))
                      ).toFixed(2)}
                      !
                    </span>
                  </>
                ) : (
                  <p className="item-price">{product.price}</p>
                )}
              </div>

              <div className="item-specs">
                <h3 className="specs-title">Specifications</h3>
                <div className="specs-list">
                  {product.category === "keyboard" && product.specs && (
                    <>
                      <div className="spec-item">
                        <span className="spec-label">Switch Type:</span>
                        <span className="spec-value">
                          {product.specs.switchType}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Layout:</span>
                        <span className="spec-value">
                          {product.specs.layout}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Connectivity:</span>
                        <span className="spec-value">
                          {product.specs.connectivity}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Backlighting:</span>
                        <span className="spec-value">
                          {product.specs.backlighting}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Frame Material:</span>
                        <span className="spec-value">
                          {product.specs.frameMaterial}
                        </span>
                      </div>
                    </>
                  )}

                  {product.category === "switch" && product.specs && (
                    <>
                      <div className="spec-item">
                        <span className="spec-label">Type:</span>
                        <span className="spec-value">{product.specs.type}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Brand:</span>
                        <span className="spec-value">
                          {product.specs.brand}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Actuation Force:</span>
                        <span className="spec-value">
                          {product.specs.actuationForce}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Travel Distance:</span>
                        <span className="spec-value">
                          {product.specs.travelDistance}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Package:</span>
                        <span className="spec-value">
                          {product.specs.package}
                        </span>
                      </div>
                    </>
                  )}

                  {product.category === "accessory" && product.specs && (
                    <>
                      <div className="spec-item">
                        <span className="spec-label">Material:</span>
                        <span className="spec-value">
                          {product.specs.material}
                        </span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Compatibility:</span>
                        <span className="spec-value">
                          {product.specs.compatibility}
                        </span>
                      </div>
                      {product.specs.profile && (
                        <div className="spec-item">
                          <span className="spec-label">Profile:</span>
                          <span className="spec-value">
                            {product.specs.profile}
                          </span>
                        </div>
                      )}
                      {product.specs.keys && (
                        <div className="spec-item">
                          <span className="spec-label">Keys:</span>
                          <span className="spec-value">
                            {product.specs.keys}
                          </span>
                        </div>
                      )}
                      {product.specs.length && (
                        <div className="spec-item">
                          <span className="spec-label">Length:</span>
                          <span className="spec-value">
                            {product.specs.length}
                          </span>
                        </div>
                      )}
                      {product.specs.surface && (
                        <div className="spec-item">
                          <span className="spec-label">Surface:</span>
                          <span className="spec-value">
                            {product.specs.surface}
                          </span>
                        </div>
                      )}
                      {product.specs.design && (
                        <div className="spec-item">
                          <span className="spec-label">Design:</span>
                          <span className="spec-value">
                            {product.specs.design}
                          </span>
                        </div>
                      )}
                      {product.specs.quantity && (
                        <div className="spec-item">
                          <span className="spec-label">Quantity:</span>
                          <span className="spec-value">
                            {product.specs.quantity}
                          </span>
                        </div>
                      )}
                      {product.specs.protection && (
                        <div className="spec-item">
                          <span className="spec-label">Protection:</span>
                          <span className="spec-value">
                            {product.specs.protection}
                          </span>
                        </div>
                      )}
                      <div className="spec-item">
                        <span className="spec-label">Color:</span>
                        <span className="spec-value">
                          {product.specs.color}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="button-container">
                <button className="buy-now-btn" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
