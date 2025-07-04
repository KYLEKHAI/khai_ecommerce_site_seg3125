import { useState } from "react";
import "./Checkout.css";
import Review from "./Review";

function Checkout({
  checkoutItems,
  checkoutSource,
  onBackToCart,
  onBackToBrowse,
  onOrderPlaced,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    country: "Canada",

    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    billingCity: "",
    billingProvince: "",
    billingPostalCode: "",
    billingCountry: "Canada",
    sameAsShipping: true,

    orderNumber: "",
  });

  const subtotal = checkoutItems.reduce((total, item) => {
    const price = item.priceNumber || parseFloat(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);
  const shipping = 15.99;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      if (currentStep === 3) {
        const orderNumber = `KK-${Date.now().toString().slice(-6)}`;
        setFormData((prev) => ({ ...prev, orderNumber }));

        if (onOrderPlaced) {
          onOrderPlaced();
        }
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBackToCart = () => {
    if (onBackToCart) {
      onBackToCart();
    }
  };

  const handleBackToBrowse = () => {
    if (onBackToBrowse) {
      onBackToBrowse();
    }
  };

  const handleOpenReview = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReview = () => {
    setIsReviewModalOpen(false);
  };

  const stepTitles = [
    "Personal Information",
    "Payment Details",
    "Review Order",
    "Order Confirmed",
  ];

  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-content">
          <h1 className="checkout-title">Checkout</h1>
          <div className="empty-checkout">
            <p className="empty-message">No items to checkout</p>
            <button className="browse-more-btn" onClick={handleBackToBrowse}>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <h1 className="checkout-title">Checkout</h1>

        <div className="step-indicator">
          {stepTitles.map((title, index) => (
            <div
              key={index}
              className={`step ${currentStep > index + 1 ? "completed" : ""} ${
                currentStep === index + 1 ? "active" : ""
              }`}
            >
              <div className="step-number">{index + 1}</div>
              <span className="step-title">{title}</span>
            </div>
          ))}
        </div>

        <div className="checkout-form">
          {currentStep === 1 && (
            <div className="form-section">
              <h2 className="section-title">Personal Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Province</label>
                  <select
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Province</option>
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                    <option value="YT">Yukon</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="A1A 1A1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-section">
              <h2 className="section-title">Payment Details</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleInputChange}
                    />
                    Billing address same as shipping address
                  </label>
                </div>

                {!formData.sameAsShipping && (
                  <>
                    <div className="form-group full-width">
                      <label>Billing Address</label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required={!formData.sameAsShipping}
                      />
                    </div>
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        required={!formData.sameAsShipping}
                      />
                    </div>
                    <div className="form-group">
                      <label>Province</label>
                      <select
                        name="billingProvince"
                        value={formData.billingProvince}
                        onChange={handleInputChange}
                        required={!formData.sameAsShipping}
                      >
                        <option value="">Select Province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="YT">Yukon</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input
                        type="text"
                        name="billingPostalCode"
                        value={formData.billingPostalCode}
                        onChange={handleInputChange}
                        placeholder="A1A 1A1"
                        required={!formData.sameAsShipping}
                      />
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="billingCountry"
                        value={formData.billingCountry}
                        onChange={handleInputChange}
                        required={!formData.sameAsShipping}
                      >
                        <option value="Canada">Canada</option>
                        <option value="United States">United States</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-section">
              <h2 className="section-title">Review Your Order</h2>

              <div className="review-section">
                <div className="review-items">
                  <h3>Order Items</h3>
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="review-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">
                        Qty: {item.quantity}
                      </span>
                      <span className="item-price">
                        $
                        {(
                          (item.priceNumber ||
                            parseFloat(item.price.replace("$", ""))) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="review-summary">
                  <div className="summary-line">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="summary-line">
                    <span>Tax (HST 13%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="summary-line total-line">
                    <span>Total:</span>
                    <span>${total.toFixed(2)} CAD</span>
                  </div>
                </div>

                <div className="review-details">
                  <div className="detail-section">
                    <h4>Shipping Address</h4>
                    <p>
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    <p>
                      {formData.city}, {formData.province} {formData.postalCode}
                    </p>
                    <p>{formData.country}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Contact Information</h4>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="form-section">
              <div className="confirmation-content">
                <div className="confirmation-icon">✓</div>
                <h2 className="confirmation-title">Order Confirmed!</h2>
                <p className="confirmation-message">
                  Thank you for your purchase! Your order has been successfully
                  placed.
                </p>

                <div className="order-details">
                  <h3>Order Details</h3>
                  <p>
                    <strong>Order Number:</strong> {formData.orderNumber}
                  </p>
                  <p>
                    <strong>Total:</strong> ${total.toFixed(2)} CAD
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>

                  <div className="ordered-items">
                    <h4>Items Ordered:</h4>
                    {checkoutItems.map((item) => (
                      <div key={item.id} className="ordered-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-details">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="confirmation-message">
                  <p>
                    A confirmation email has been sent to{" "}
                    <strong>{formData.email}</strong> with your order details
                    and tracking information.
                  </p>
                  <p>Your order will be processed within 1-2 business days.</p>
                </div>

                <div className="confirmation-actions">
                  <button className="review-btn" onClick={handleOpenReview}>
                    Leave a Review
                  </button>
                  <button
                    className="browse-more-btn"
                    onClick={handleBackToBrowse}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep < 4 && (
            <div className="form-navigation">
              <div className="nav-left">
                {currentStep === 1 && checkoutSource === "cart" && (
                  <button className="back-btn" onClick={handleBackToCart}>
                    ← Back to Cart
                  </button>
                )}
                {currentStep === 1 && checkoutSource === "direct" && (
                  <button className="back-btn" onClick={handleBackToBrowse}>
                    ← Back to Products
                  </button>
                )}
                {currentStep > 1 && (
                  <button className="back-btn" onClick={handlePrevStep}>
                    ← Previous
                  </button>
                )}
              </div>

              <div className="nav-right">
                <button className="next-btn" onClick={handleNextStep}>
                  {currentStep === 3 ? "Place Order" : "Continue →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Review isOpen={isReviewModalOpen} onClose={handleCloseReview} />
    </div>
  );
}

export default Checkout;
