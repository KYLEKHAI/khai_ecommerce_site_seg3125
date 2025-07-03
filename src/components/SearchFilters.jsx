import "./SearchFilters.css";

function SearchFilters({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  totalResults,
}) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      priceRange: "",
      switchType: "",
      size: "",
      connectivity: "",
      backlighting: "",
      category: "",
    });
  };

  return (
    <div className="search-filters-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search keyboards, switches, accessories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button" aria-label="Search">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label className="filter-label">Price Range</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange("priceRange", e.target.value)}
            className="filter-select"
          >
            <option value="">All Prices</option>
            <option value="under-100">Under $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200-300">$200 - $300</option>
            <option value="over-300">Over $300</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Switch Type</label>
          <select
            value={filters.switchType}
            onChange={(e) => handleFilterChange("switchType", e.target.value)}
            className="filter-select"
          >
            <option value="">All Switches</option>
            <option value="linear">Linear</option>
            <option value="tactile">Tactile</option>
            <option value="clicky">Clicky</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Keyboard Size</label>
          <select
            value={filters.size}
            onChange={(e) => handleFilterChange("size", e.target.value)}
            className="filter-select"
          >
            <option value="">All Sizes</option>
            <option value="full-size">Full Size (104 keys)</option>
            <option value="tkl">TKL (87 keys)</option>
            <option value="65-percent">65% (68 keys)</option>
            <option value="60-percent">60% (61 keys)</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Connectivity</label>
          <select
            value={filters.connectivity}
            onChange={(e) => handleFilterChange("connectivity", e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="wired">Wired</option>
            <option value="wireless">Wireless</option>
            <option value="bluetooth">Bluetooth</option>
            <option value="dual-mode">Dual Mode</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Backlighting</label>
          <select
            value={filters.backlighting}
            onChange={(e) => handleFilterChange("backlighting", e.target.value)}
            className="filter-select"
          >
            <option value="">All Lighting</option>
            <option value="none">No Backlighting</option>
            <option value="single-color">Single Color</option>
            <option value="rgb">RGB</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="keyboards">Keyboards</option>
            <option value="switches">Switches</option>
            <option value="keycaps">Keycaps</option>
            <option value="cables">Cables</option>
            <option value="accessories">Other Accessories</option>
          </select>
        </div>

        <div className="filter-group clear-filter-group">
          <label className="filter-label">&nbsp;</label>
          <button onClick={clearFilters} className="clear-filters-btn">
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="filter-actions">
        <div className="results-count">
          Showing {totalResults} product{totalResults !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
