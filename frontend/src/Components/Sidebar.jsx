import { useState } from "react";

export default function Sidebar({ onFilter }) {
  const [category, setCategory] = useState([]);
  const [priceRange, setPriceRange] = useState(null);

  function handleCategoryChange(e) {
    const value = e.target.value;
    let updated = [...category];

    if (e.target.checked) {
      updated.push(value);
    } else {
      updated = updated.filter((c) => c !== value);
    }

    setCategory(updated);
    onFilter({ category: updated, priceRange });
  }

  function handlePriceChange(e) {
    const value = e.target.value;
    let range = null;

    if (value === "low") range = [0, 100];
    if (value === "mid") range = [100, 500];
    if (value === "high") range = [500, 1000];

    setPriceRange(range);
    onFilter({ category, priceRange: range });
  }

  return (
    <div>
      <h6 className="fw-bold text-dark">Category</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Electronics"
          onChange={handleCategoryChange}
        />
        <label className="form-check-label">Electronics</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Clothing"
          onChange={handleCategoryChange}
        />
        <label className="form-check-label">Clothing</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Footwear"
          onChange={handleCategoryChange}
        />
        <label className="form-check-label">Footwear</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Accessories"
          onChange={handleCategoryChange}
        />
        <label className="form-check-label">Accessories</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Fitness"
          onChange={handleCategoryChange}
        />
        <label className="form-check-label">Fitness</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value="Home & Kitchen"
          onChange={handleCategoryChange}
        />
        <label className="form-check-label">Home & Kitchen</label>
      </div>

      <hr />

      <h6 className="fw-bold text-dark">Price</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="price"
          value="low"
          onChange={handlePriceChange}
        />
        <label className="form-check-label">Under $100</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="price"
          value="mid"
          onChange={handlePriceChange}
        />
        <label className="form-check-label">$100 - $500</label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="price"
          value="high"
          onChange={handlePriceChange}
        />
        <label className="form-check-label">$500 - $1000</label>
      </div>
    </div>
  );
}
