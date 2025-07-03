import "./HelpPanel.css";

function HelpPanel({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="help-overlay" onClick={onClose}></div>}

      {/* Side Panel */}
      <div className={`help-panel ${isOpen ? "help-panel-open" : ""}`}>
        <div className="help-header">
          <h3 className="help-title">How to Buy</h3>
          <button
            className="help-close"
            onClick={onClose}
            aria-label="Close help"
          >
            ×
          </button>
        </div>

        <div className="help-content">
          <div className="help-intro">
            <p>
              Follow these simple steps to purchase your mechanical keyboard:
            </p>
          </div>

          <div className="help-steps">
            <div className="help-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Add to Cart</h4>
                <p>
                  Browse our products and click on any item you'd like to
                  purchase. Click the "Add to Cart" button to add it to your
                  shopping cart.
                </p>
              </div>
            </div>

            <div className="help-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Enter Personal Information</h4>
                <p>
                  Provide your shipping address, contact information, and any
                  special delivery instructions.
                </p>
              </div>
            </div>

            <div className="help-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Payment</h4>
                <p>
                  Choose your preferred payment method and enter your payment
                  details securely.
                </p>
              </div>
            </div>

            <div className="help-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Confirmation</h4>
                <p>
                  Review your order and receive a confirmation email with your
                  order details and tracking information.
                </p>
              </div>
            </div>
          </div>

          <div className="help-footer">
            <p>Note: All prices displayed in Canadian Dollars (CAD)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelpPanel;
