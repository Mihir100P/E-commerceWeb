import { useEffect, useState } from "react";
import Card from "../Components/Card";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home({search}) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");
useEffect(() => {
  async function getItems() {
    try {
      let url = "/api/items";
      
      if (search && search.trim() !== "") {
        url = `/api/items/search?q=${encodeURIComponent(search)}`;
      }

      const result = await axios.get(url, { withCredentials: true,headers:{Authorization:`Bearer ${token}`} });

      if (result?.data?.success) {
        setItems(result.data.items);    
        setFilteredItems(result.data.items);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  getItems();
}, [search,token]);



    function handleFilter(filters) {
    let filtered = [...items];

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((item) =>
        filters.category.includes(item.category)
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(
        (item) => item.price >= min && item.price <= max
      );
    }

    setFilteredItems(filtered);
  }

  return (
    <div className="container-fluid my-4">
      <h1 className="text-center p-4 fw-bold text-primary">
        Welcome to ShopEase
      </h1>
      <div className="d-flex gap-3 mb-3 justify-content-end">
      <Link className="text-white fw-semibold btn btn-primary mb-3" to="/orders" style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }}>Recent Orders</Link>
      <Link
                    className="text-white fw-semibold btn btn-primary mb-3"
                    to="/cart"
                    style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }}
                  >
                    View Cart
                  </Link>
        </div>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h5 className="fw-bold mb-3 text-secondary">Filter Products</h5>
              <Sidebar onFilter={handleFilter} />
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <h4 className="mb-3 text-secondary">Browse Our Collection</h4>

          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Fetching products...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="row g-4">
              {filteredItems.map((item) => (
                <div key={item._id} className="col-sm-6 col-md-4">
                  <Card
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    company={item.company}
                    image={item.image}
                    maxQuantity={item.maxQuantity}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No items match your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}
