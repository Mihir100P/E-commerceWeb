import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    async function getOrders() {
      try {
        const result = await axios.get("/api/order/admin", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.data.success) {
          setOrders(result.data.orders);
        }
      } catch (err) {
        toast.error("Failed to fetch orders");
        console.error(err);
      }
    }
    getOrders();
  }, [token]);

  async function updateStatus(e, id) {
    e.preventDefault();
    const newStatus = e.target.status.value;

    try {
      const result = await axios.post(
        `/api/order/admin/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.success) {
        toast.success(result.data.msg);
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      toast.error("Status update failed");
      console.error(err);
    }
  }

  return (
    <div className="cart-container p-4">
      <h3 className="cart-title mb-4 text-primary">All Orders</h3>
      {orders.length === 0 ? (
        <p className="empty-cart">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-3 mb-2 rounded offset-2 my-4" style={{maxWidth:"800px"}}>
             <div className="row">
              <div className="col cart-img me-3">
                <img
                  src={order.image}
                  alt={order.image || "Item image"}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                  className="rounded"
                />
              </div>
            <div className="col">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>Quantity:</strong> {order.quantity}</p>
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>

            <form onSubmit={(e) => updateStatus(e, order._id)}>
              <label className="me-2 fw-bold">Update Status:</label>
              <select
                name="status"
                defaultValue={order.status}
                className="form-select w-auto d-inline-block me-2"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipping">Shipping</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <Button type="submit" variant="primary" style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }} size="sm">
                Update
              </Button>
            </form>
            </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
