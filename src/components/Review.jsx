import { useState, useEffect } from "react";
import "./Review.css";

function Review({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    overallRating: 0,
    productQuality: 0,
    websiteExperience: 0,
    textReview: "",
    wouldRecommend: "",
  });

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

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (name, rating) => {
    setFormData((prev) => ({
      ...prev,
      [name]: rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Review submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you for your feedback! Your review helps us improve.");
    onClose();
  };

  const renderStars = (name, currentRating) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${currentRating >= star ? "filled" : ""}`}
            onClick={() => handleRatingChange(name, star)}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="review-modal-overlay" onClick={handleOverlayClick}>
      <div className="review-modal">
        <div className="review-content">
          <div className="review-header">
            <h2 className="review-title">
              Help us craft your next perfect build
            </h2>
            <p className="review-subtitle">
              Your feedback shapes our community
            </p>
          </div>

          <form onSubmit={handleSubmit} className="review-form">
            <div className="review-section">
              <h3 className="section-title">Overall Experience</h3>
              <div className="rating-group">
                <label className="rating-label">
                  How would you rate your overall experience?
                </label>
                {renderStars("overallRating", formData.overallRating)}
              </div>
            </div>

            <div className="review-section">
              <h3 className="section-title">Specific Feedback</h3>

              <div className="rating-group">
                <label className="rating-label">Product Quality</label>
                {renderStars("productQuality", formData.productQuality)}
              </div>

              <div className="rating-group">
                <label className="rating-label">Website Experience</label>
                {renderStars("websiteExperience", formData.websiteExperience)}
              </div>
            </div>

            <div className="review-section">
              <h3 className="section-title">Tell us more</h3>
              <div className="form-group">
                <label className="form-label">
                  Share your thoughts (optional)
                </label>
                <textarea
                  name="textReview"
                  value={formData.textReview}
                  onChange={handleInputChange}
                  placeholder="What did you love? What could we improve? Any suggestions for future products?"
                  rows="4"
                  className="review-textarea"
                />
              </div>
            </div>

            <div className="review-section">
              <h3 className="section-title">Recommendation</h3>
              <div className="form-group">
                <label className="form-label">
                  Would you recommend KhaiKeys to others?
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="yes"
                      checked={formData.wouldRecommend === "yes"}
                      onChange={handleInputChange}
                    />
                    <span className="radio-text">Yes, definitely!</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="maybe"
                      checked={formData.wouldRecommend === "maybe"}
                      onChange={handleInputChange}
                    />
                    <span className="radio-text">Maybe</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="wouldRecommend"
                      value="no"
                      checked={formData.wouldRecommend === "no"}
                      onChange={handleInputChange}
                    />
                    <span className="radio-text">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="review-actions">
              <button type="button" className="skip-btn" onClick={onClose}>
                Skip Review
              </button>
              <button type="submit" className="submit-btn">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;
