import React  from "react";
import { Link } from "react-router-dom";

export default function AdminCard({ id, name, price, category, image, company, maxQuantity, handleDelete}) {


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
        <p className="card-text text-muted small mb-1">{company}</p>
        <p className="card-text text-muted small mb-1">Category: {category}</p>
        <p className="card-text text-muted small mb-1">Max Quantity: {maxQuantity}</p>
        <p className="card-text fw-bold text-success fs-5 mb-3">
          ₹{price.toFixed(2)}
        </p>
        <div className="d-flex gap-3">
        <Link className="btn btn-primary text-white fw-semibold w-50" style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }} to={`/admin/edit/${id}`}>Update</Link>
              <button className="btn btn-primary w-50" style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }} onClick={() => handleDelete(id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
