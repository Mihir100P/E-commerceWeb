import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";

export default function Card({ id, name, price, category, image , maxQuantity, company}) {
  const { user } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to add items to cart!");
      return;
    }

    const token = localStorage.getItem("userToken");

    try {
      const res = await axios.post(
        `/api/cart/add/${id}`,
        { quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please login first.");
      } else {
        toast.error("Something went wrong while adding item");
      }
    }
  }

  return (
    <div
      className="card h-100 shadow-sm border-0 hover-card"
      style={{
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <img
        src={image}
        className="card-img-top"
        alt={name}
        style={{
          height: "220px",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-semibold">{name}</h5>
        <h6 className="card-text small mb-1">{company}</h6>
        <p className="card-text text-muted small mb-1">{category}</p>
        <p className="card-text text-muted small mb-1">Available Quantity: {maxQuantity}</p>
        <p className="card-text fw-bold text-success fs-5 mb-3">
          ₹{price.toFixed(2)}
        </p>
        {maxQuantity<=0?
        <button
          className="btn btn-danger mt-auto rounded-pill"
        >
          Out of Stock
        </button>:
        <button
          onClick={handleSubmit}
          className="btn btn-primary mt-auto rounded-pill"
          style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }}
        >
          🛒 Add to Cart
        </button>
        }
      </div>
    </div>
  );
}
