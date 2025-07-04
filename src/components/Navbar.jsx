import "./Navbar.css";
import logo from "../assets/khai-keys-logo.png";

function Navbar({ onNavigate, cartItemsCount = 0 }) {
  const handleLogoClick = () => {
    onNavigate("browse");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-container" onClick={handleLogoClick}>
          <h1 className="navbar-logo">KhaiKeys</h1>
          <img src={logo} alt="KhaiKeys" className="navbar-logo-img" />
        </div>
      </div>

      <div className="navbar-center">
        <span className="navbar-tagline">
          <span className="typewriter">"Type With Purpose"</span>
        </span>
      </div>

      <div className="navbar-right">
        <button
          className="navbar-link products-button"
          onClick={() => onNavigate("browse")}
          aria-label="Products"
        >
          Products
        </button>
        <button
          className="navbar-link about-button"
          onClick={() => onNavigate("about")}
          aria-label="About"
        >
          About
        </button>
        <button
          className="navbar-link learn-button"
          onClick={() => onNavigate("learn")}
          aria-label="Learn"
        >
          Learn
        </button>
        <button
          className="navbar-link help-button"
          onClick={() => onNavigate("toggleHelp")}
          aria-label="Help"
        >
          Help
        </button>
        <button
          className="cart-button"
          onClick={() => onNavigate("cart")}
          aria-label="Shopping cart"
        >
          <div className="cart-icon-container">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="m1 1 4 4 11 1.5 1 7-13 0"></path>
            </svg>
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
