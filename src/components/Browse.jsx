import { useState } from "react";
import "./Browse.css";
import SearchFilters from "./SearchFilters";
import Item from "./Item";

function Browse({ onBuyNow, onAddToCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceRange: "",
    switchType: "",
    size: "",
    connectivity: "",
    backlighting: "",
    category: "",
  });

  const keyboards = [
    {
      id: 1,
      name: "Mechanical Keyboard #1",
      price: "$74.99",
      category: "keyboard",
      switchType: "linear",
      size: "full-size",
      connectivity: ["wired"],
      backlighting: "none",
      specs: {
        switchType: "Cherry MX Red (Linear)",
        layout: "Full Size (104 keys)",
        connectivity: "USB-C Wired",
        backlighting: "No Backlighting",
        frameMaterial: "Plastic",
      },
    },
    {
      id: 2,
      name: "Mechanical Keyboard #2",
      price: "$99.99",
      category: "keyboard",
      switchType: "tactile",
      size: "tkl",
      connectivity: ["wired"],
      backlighting: "single-color",
      specs: {
        switchType: "Cherry MX Brown (Tactile)",
        layout: "TKL (87 keys)",
        connectivity: "USB-C Wired",
        backlighting: "White LED",
        frameMaterial: "Aluminum",
      },
    },
    {
      id: 3,
      name: "Mechanical Keyboard #3",
      price: "$119.99",
      originalPrice: "$149.99",
      onSale: true,
      category: "keyboard",
      switchType: "clicky",
      size: "65-percent",
      connectivity: ["wireless", "bluetooth"],
      backlighting: "rgb",
      specs: {
        switchType: "Cherry MX Blue (Clicky)",
        layout: "65% (68 keys)",
        connectivity: "2.4GHz Wireless & Bluetooth",
        backlighting: "RGB",
        frameMaterial: "Aluminum",
      },
    },
    {
      id: 4,
      name: "Mechanical Keyboard #4",
      price: "$119.99",
      originalPrice: "$149.99",
      onSale: true,
      category: "keyboard",
      switchType: "linear",
      size: "60-percent",
      connectivity: ["bluetooth"],
      backlighting: "single-color",
      specs: {
        switchType: "Gateron Red (Linear)",
        layout: "60% (61 keys)",
        connectivity: "Bluetooth 5.0",
        backlighting: "Blue LED",
        frameMaterial: "Plastic",
      },
    },
    {
      id: 5,
      name: "Mechanical Keyboard #5",
      price: "$299.99",
      category: "keyboard",
      switchType: "tactile",
      size: "tkl",
      connectivity: ["dual-mode"],
      backlighting: "rgb",
      specs: {
        switchType: "Holy Panda (Tactile)",
        layout: "TKL (87 keys)",
        connectivity: "USB-C & 2.4GHz Wireless",
        backlighting: "RGB with Per-Key",
        frameMaterial: "CNC Aluminum",
      },
    },
    {
      id: 6,
      name: "Mechanical Keyboard #6",
      price: "$299.99",
      category: "keyboard",
      switchType: "linear",
      size: "full-size",
      connectivity: ["wired"],
      backlighting: "rgb",
      specs: {
        switchType: "Cherry MX Speed Silver (Linear)",
        layout: "Full Size (104 keys)",
        connectivity: "USB-C Wired",
        backlighting: "RGB with Software Control",
        frameMaterial: "Aluminum with Steel Plate",
      },
    },
    {
      id: 7,
      name: "Mechanical Keyboard #7",
      price: "$349.99",
      category: "keyboard",
      switchType: "clicky",
      size: "tkl",
      connectivity: ["dual-mode"],
      backlighting: "single-color",
      specs: {
        switchType: "Kailh Box Jade (Clicky)",
        layout: "TKL (87 keys)",
        connectivity: "USB-C & Bluetooth 5.0",
        backlighting: "White LED",
        frameMaterial: "Premium Aluminum",
      },
    },
    {
      id: 8,
      name: "Mechanical Keyboard #8",
      price: "$399.99",
      category: "keyboard",
      switchType: "tactile",
      size: "65-percent",
      connectivity: ["wireless"],
      backlighting: "rgb",
      specs: {
        switchType: "Zealios V2 (Tactile)",
        layout: "65% (68 keys)",
        connectivity: "2.4GHz Wireless",
        backlighting: "South-Facing RGB",
        frameMaterial: "Gasket Mount Aluminum",
      },
    },
    {
      id: 9,
      name: "Mechanical Keyboard #9",
      price: "$449.99",
      category: "keyboard",
      switchType: "linear",
      size: "60-percent",
      connectivity: ["dual-mode"],
      backlighting: "none",
      specs: {
        switchType: "Gateron Oil King (Linear)",
        layout: "60% (61 keys)",
        connectivity: "USB-C & Bluetooth 5.0",
        backlighting: "No Backlighting",
        frameMaterial: "E-White Aluminum",
      },
    },
  ];

  const switches = [
    {
      id: 10,
      name: "Switch #1",
      price: "$24.99",
      category: "switch",
      switchType: "linear",
      specs: {
        type: "Linear",
        actuationForce: "45g",
        travelDistance: "4.0mm",
        package: "110 switches",
        brand: "Gateron Red",
      },
    },
    {
      id: 11,
      name: "Switch #2",
      price: "$29.99",
      category: "switch",
      switchType: "tactile",
      specs: {
        type: "Tactile",
        actuationForce: "55g",
        travelDistance: "4.0mm",
        package: "110 switches",
        brand: "Cherry MX Brown",
      },
    },
    {
      id: 12,
      name: "Switch #3",
      price: "$49.99",
      category: "switch",
      switchType: "clicky",
      specs: {
        type: "Clicky",
        actuationForce: "50g",
        travelDistance: "4.0mm",
        package: "110 switches",
        brand: "Cherry MX Blue",
      },
    },
  ];

  const accessories = [
    {
      id: 13,
      name: "Premium Keycaps Set",
      price: "$5.99",
      category: "accessory",
      subCategory: "keycaps",
      specs: {
        material: "PBT Double-Shot",
        compatibility: "Cherry MX Style",
        profile: "OEM",
        keys: "104 Key Set",
      },
    },
    {
      id: 14,
      name: "USB-C Cable",
      price: "$12.99",
      category: "accessory",
      subCategory: "cables",
      specs: {
        material: "Braided Nylon",
        compatibility: "USB-C Keyboards",
        length: "6 feet",
        color: "Black",
      },
    },
    {
      id: 15,
      name: "Wrist Rest Pad",
      price: "$24.99",
      category: "accessory",
      subCategory: "accessories",
      specs: {
        material: "Memory Foam",
        compatibility: "Full Size Keyboards",
        surface: "Soft Fabric",
        color: "Black",
      },
    },
    {
      id: 16,
      name: "Artisan Keycaps",
      price: "$39.99",
      category: "accessory",
      subCategory: "keycaps",
      specs: {
        material: "Resin Cast",
        compatibility: "Cherry MX Style",
        design: "Custom Artisan",
        quantity: "4 Keys",
      },
    },
    {
      id: 17,
      name: "Coiled Cable",
      price: "$55.99",
      category: "accessory",
      subCategory: "cables",
      specs: {
        material: "Aviator Connector",
        compatibility: "USB-C & USB-A",
        length: "5 feet coiled",
        color: "White & Gold",
      },
    },
    {
      id: 18,
      name: "Keyboard Carrying Case",
      price: "$69.99",
      category: "accessory",
      subCategory: "accessories",
      specs: {
        material: "Hard Shell Case",
        compatibility: "TKL & Smaller",
        protection: "Water Resistant",
        color: "Black Carbon Fiber",
      },
    },
  ];

  const allProducts = [...keyboards, ...switches, ...accessories];

  const filteredProducts = allProducts.filter((product) => {
    if (
      searchTerm &&
      !product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (filters.priceRange) {
      const price = parseFloat(product.price.replace("$", ""));
      switch (filters.priceRange) {
        case "under-100":
          if (price >= 100) return false;
          break;
        case "100-200":
          if (price < 100 || price > 200) return false;
          break;
        case "200-300":
          if (price < 200 || price > 300) return false;
          break;
        case "over-300":
          if (price <= 300) return false;
          break;
      }
    }

    if (filters.switchType && product.switchType !== filters.switchType) {
      return false;
    }

    if (
      filters.size &&
      product.category === "keyboard" &&
      product.size !== filters.size
    ) {
      return false;
    }

    if (filters.connectivity && product.category === "keyboard") {
      if (!product.connectivity.includes(filters.connectivity)) {
        return false;
      }
    }

    if (
      filters.backlighting &&
      product.category === "keyboard" &&
      product.backlighting !== filters.backlighting
    ) {
      return false;
    }

    if (filters.category) {
      if (filters.category === "keyboards" && product.category !== "keyboard")
        return false;
      if (filters.category === "switches" && product.category !== "switch")
        return false;
      if (filters.category === "keycaps" && product.subCategory !== "keycaps")
        return false;
      if (filters.category === "cables" && product.subCategory !== "cables")
        return false;
      if (
        filters.category === "accessories" &&
        product.subCategory !== "accessories"
      )
        return false;
    }

    return true;
  });

  const filteredKeyboards = filteredProducts.filter(
    (p) => p.category === "keyboard"
  );
  const filteredSwitches = filteredProducts.filter(
    (p) => p.category === "switch"
  );
  const filteredAccessories = filteredProducts.filter(
    (p) => p.category === "accessory"
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    if (onBuyNow && selectedProduct) {
      const productForCheckout = {
        ...selectedProduct,
        priceNumber: parseFloat(selectedProduct.price.replace("$", "")),
      };
      onBuyNow(productForCheckout);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart && selectedProduct) {
      const productForCart = {
        ...selectedProduct,
        priceNumber: parseFloat(selectedProduct.price.replace("$", "")),
      };
      onAddToCart(productForCart);
    }
  };

  return (
    <div className="browse-container">
      <section className="special-offers-section">
        <h2 className="section-title">Special Offers</h2>
        <div className="offers-grid">
          <div className="offer-card">
            <div className="offer-content">
              <h3 className="offer-title">Free Shipping</h3>
              <p className="offer-description">
                Get free shipping on all orders over $150. No code needed!
                <br />
                <em>Valid from June to December 2025</em>
              </p>
            </div>
          </div>
          <div className="offer-card sale-card">
            <div className="offer-content">
              <h3 className="offer-title">Flagship Sale</h3>
              <p className="offer-description">
                <strong>Mechanical Keyboard #3 & #4</strong>
                <br />
                <span className="sale-price">
                  <span className="original-price">$149.99</span>
                  <span className="current-price">$119.99</span>
                </span>
                <span className="savings">Save $30!</span>
                <br />
                <em>Sale ends August 25th, 2025</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        totalResults={filteredProducts.length}
      />

      {filteredKeyboards.length > 0 && (
        <section className="product-section">
          <h2 className="section-title">Mechanical Keyboards</h2>
          <div className="product-grid">
            {filteredKeyboards.map((keyboard) => (
              <div
                key={keyboard.id}
                className="product-item"
                onClick={() => handleProductClick(keyboard)}
              >
                <div className="product-placeholder">{keyboard.name}</div>
                <div className="product-price">
                  {keyboard.name} -
                  {keyboard.onSale ? (
                    <>
                      <span className="original-price-inline">
                        {" "}
                        {keyboard.originalPrice}
                      </span>
                      <span className="sale-price-inline">
                        {" "}
                        {keyboard.price}
                      </span>
                    </>
                  ) : (
                    <span> {keyboard.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredSwitches.length > 0 && (
        <section className="product-section">
          <h2 className="section-title">Switches</h2>
          <div className="product-grid">
            {filteredSwitches.map((switchItem) => (
              <div
                key={switchItem.id}
                className="product-item"
                onClick={() => handleProductClick(switchItem)}
              >
                <div className="product-placeholder">{switchItem.name}</div>
                <div className="product-price">
                  {switchItem.name} - {switchItem.price}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredAccessories.length > 0 && (
        <section className="product-section">
          <h2 className="section-title">Accessories</h2>
          <div className="product-grid">
            {filteredAccessories.map((accessory) => (
              <div
                key={accessory.id}
                className="product-item"
                onClick={() => handleProductClick(accessory)}
              >
                <div className="product-placeholder">{accessory.name}</div>
                <div className="product-price">
                  {accessory.name} - {accessory.price}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>No products found matching your search criteria.</p>
          <p>Try adjusting your filters or search term.</p>
        </div>
      )}

      <Item
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default Browse;
