import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Browse from "./components/Browse";
import About from "./components/About";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import HelpPanel from "./components/HelpPanel";
import logo from "./assets/khai-keys-logo.png";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [keyboardOutline, setKeyboardOutline] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutSource, setCheckoutSource] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleEnterShop = () => {
    setCurrentView("browse");
    console.log("Navigating to shop...");
  };

  const handleNavigate = (view) => {
    if (currentView === "checkout") {
      setCheckoutItems([]);
      setCheckoutSource(null);
    }

    if (view === "toggleHelp") {
      setIsHelpOpen(!isHelpOpen);
    } else {
      setCurrentView(view);
    }
  };

  const handleCloseHelp = () => {
    setIsHelpOpen(false);
  };

  const handleBrowseMore = () => {
    setCheckoutItems([]);
    setCheckoutSource(null);
    setCurrentView("browse");
  };

  const handleCheckout = () => {
    setCurrentView("checkout");
  };

  const handleBackToCart = () => {
    setCurrentView("cart");
  };

  const handleBuyNow = (product) => {
    setCheckoutItems([{ ...product, quantity: 1 }]);
    setCheckoutSource("direct");
    setCurrentView("checkout");
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }

      showNotification(`${product.name} added to cart!`);
      return newItems;
    });
  };

  const handleCartCheckout = () => {
    setCheckoutItems([...cartItems]);
    setCheckoutSource("cart");
    setCurrentView("checkout");
  };

  const handleOrderPlaced = () => {
    if (checkoutSource === "cart") {
      setCartItems([]);
    }
    showNotification("Order placed successfully!");
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="app">
      {notification && <div className="notification">{notification}</div>}

      {currentView === "home" && (
        <div className="home-screen">
          <img src={logo} alt="KhaiKeys Logo" className="top-logo" />
          <div
            className={`keyboard-outline-container${
              keyboardOutline ? " keyboard-outline-active" : ""
            }`}
          >
            {/* USB Cable - only on hover */}
            {keyboardOutline && (
              <div className="keyboard-cable">
                <div className="cable-wire" />
                <div className="cable-connector" />
              </div>
            )}
            <h1 className="logo-text">KhaiKeys</h1>
            <button
              className="enter-shop-btn"
              onClick={handleEnterShop}
              onMouseEnter={() => setKeyboardOutline(true)}
              onMouseLeave={() => setKeyboardOutline(false)}
            >
              Enter Shop
            </button>
          </div>
        </div>
      )}

      {currentView === "browse" && (
        <div className="browse-screen">
          <Navbar onNavigate={handleNavigate} cartItemsCount={cartItemsCount} />
          <Browse onBuyNow={handleBuyNow} onAddToCart={handleAddToCart} />
        </div>
      )}

      {currentView === "about" && (
        <div className="about-screen">
          <Navbar onNavigate={handleNavigate} cartItemsCount={cartItemsCount} />
          <About />
        </div>
      )}

      {currentView === "cart" && (
        <div className="cart-screen">
          <Navbar onNavigate={handleNavigate} cartItemsCount={cartItemsCount} />
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            onBrowseMore={handleBrowseMore}
            onCheckout={handleCartCheckout}
          />
        </div>
      )}

      {currentView === "checkout" && (
        <div className="checkout-screen">
          <Navbar onNavigate={handleNavigate} cartItemsCount={cartItemsCount} />
          <Checkout
            checkoutItems={checkoutItems}
            checkoutSource={checkoutSource}
            onBackToCart={handleBackToCart}
            onBackToBrowse={handleBrowseMore}
            onOrderPlaced={handleOrderPlaced}
          />
        </div>
      )}

      <HelpPanel isOpen={isHelpOpen} onClose={handleCloseHelp} />
    </div>
  );
}

export default App;
