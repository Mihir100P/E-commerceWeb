import { useEffect, useState } from "react";
import AdminCard from "../Components/AdminCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHome() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function getItems() {
    try {
      const token = localStorage.getItem("adminToken");
      let url = "/api/admin/items";

      const result = await axios.get(url, { withCredentials: true ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.data?.success) {
        setItems(result.data.items);    
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  getItems();
}, []);

const handleDelete = async (id)=>{
     try {
      const token = localStorage.getItem("adminToken");
      let url = `/api/admin/items/${id}`;

      const result = await axios.delete(url, { withCredentials: true ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.data?.success) {
        toast.success("Item deleted!");  
        setItems((prev) => prev.filter(item => item._id !== id));
      }
    } catch (error) {
      console.error("Error while deleting items:", error);
      toast.error(error.response?.data?.msg || "Failed to delete item");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-fluid my-4">
      <h1 className="text-center p-4 fw-bold text-primary">
        Welcome to ShopEase
      </h1>
        <div className="d-flex gap-3 mb-3 justify-content-end">
            <Link className="text-white btn btn-primary fw-semibold" to="/admin/new" style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }} >Sell new item</Link>
            <Link className="text-white fw-semibold btn btn-primary" to="/admin/orders" style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }} >Manage orders</Link>
        </div>
      <div>
          <h4 className="mb-3 text-center">Your Items</h4>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Fetching products...</p>
            </div>
          ) : items.length > 0 ? (
            <div className="row g-4">
              {items.map((item) => (
                <div key={item._id} className="col-sm-6 col-md-4">
                  <AdminCard
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    image={item.image}
                    company={item.company}
                    maxQuantity={item.maxQuantity}
                    handleDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No items found</p>
          )}
      </div>
      </div>
  );
}
