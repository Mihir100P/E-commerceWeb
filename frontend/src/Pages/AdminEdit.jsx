import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate ,useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useEffect } from 'react';


export default function AdminEdit() {
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    async function getItem(){
      try {
      const token = localStorage.getItem("adminToken");
      let url = `/api/admin/items/${id}`;

      const result = await axios.get(url, { withCredentials: true ,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (result?.data?.success) {   
        reset(result.data.item); 
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  getItem();
  },[id,reset]);

  const onSubmit = async (data) => {
  setLoading(true);
  setError("");

  try {
    const token = localStorage.getItem("adminToken");

    const result = await axios.put(
      `/api/admin/items/${id}`,
      {
        name: data.name,
        price: data.price,
        category: data.category,
        image: data.img,
        company:data.company,
        maxQuantity: data.maxQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (result.data.success) {
      toast.success("Item successfully updated!");
      navigate("/admin/home");
    } else {
      toast.error("Item not updated");
      setError("Item not updated");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.msg || "Something went wrong");
    setError(err.response?.data?.msg || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
    <div className='my-5 p-5'>
       <h1 className="text-center mb-4 text-primary">Edit your product details</h1>
      {error && (
            <div className="alert alert-danger text-center py-2 my-3">{error}</div>
          )}

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3">
              <label className="form-label fw-semibold">Item name</label>
              <input
                type="text"
                className={`form-control rounded-3 ${
                  errors.name ? "is-invalid" : ""
                }`}
                placeholder="name"
                {...register("name", {
                  required: "name is required",
                })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

            <div className="my-3">
              <label className="form-label fw-semibold">Price</label>
              <input
                type="number"
                className={`form-control rounded-3 ${
                  errors.price ? "is-invalid" : ""
                }`}
                placeholder="Enter your price"
                {...register("price", {
                  required: "price is required",
                })}
              />
              {errors.price && (
                <div className="invalid-feedback">{errors.price.message}</div>
              )}
            </div>

            <div className="my-3">
              <label className="form-label fw-semibold">Category</label>
              <input
                type="text"
                className={`form-control rounded-3 ${
                  errors.category ? "is-invalid" : ""
                }`}
                placeholder="Enter category"
                {...register("category", {
                  required: "category is required",
                })}
              />
              {errors.category && (
                <div className="invalid-feedback">{errors.category.message}</div>
              )}
            </div>

             <div className="my-3">
              <label className="form-label fw-semibold">Image link</label>
              <input
                type="text"
                className={`form-control rounded-3 ${
                  errors.img ? "is-invalid" : ""
                }`}
                placeholder="Enter link"
                {...register("image", {
                  required: "image is required",
                })}
              />
              {errors.img && (
                <div className="invalid-feedback">{errors.img.message}</div>
              )}
            </div>

             <div className="my-3">
              <label className="form-label fw-semibold">Company name</label>
              <input
                type="text"
                className={`form-control rounded-3 ${
                  errors.company ? "is-invalid" : ""
                }`}
                placeholder="Enter link"
                {...register("company", {
                  required: "company is required",
                })}
              />
              {errors.company && (
                <div className="invalid-feedback">{errors.company.message}</div>
              )}
            </div>

            <div className="my-3">
              <label className="form-label fw-semibold">Max Quantity</label>
              <input
                type="number"
                className={`form-control rounded-3 ${
                  errors.maxQuantity ? "is-invalid" : ""
                }`}
                placeholder="Enter maxQuantity"
                {...register("maxQuantity", {
                  required: "maxQuantity is required",
                })}
              />
              {errors.maxQuantity && (
                <div className="invalid-feedback">{errors.maxQuantity.message}</div>
              )}
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                disabled={Loading}
                className="btn btn-primary rounded-3 py-2 fw-semibold px-5"
                style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }}
              >
                {Loading ? (
                  <>
                    <Spinner animation="border" size="sm" />
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
    </div>
    </>
  );
}
