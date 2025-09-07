import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { BsGoogle, BsFacebook, BsTwitterX } from "react-icons/bs";
import axios from "axios";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await axios.post("/api/user/login", {
        email: data.email,
        password: data.password,
      });

      if (result.data.success) {
        login(result.data.token, result.data.user);
        toast.success("Login successfully done!");
        navigate("/");
      } else {
        setError("Wrong credentials or not registered");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4" style={{ width: "28rem" }}>
        <div className="card-body p-5">
          <h2 className="fw-bold text-center mb-2">Welcome Back</h2>
          <p className="text-muted text-center mb-4">Sign in to continue to your account</p>

          {error && (
            <div className="alert alert-danger text-center py-2 mb-3">{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className={`form-control rounded-3 ${
                  errors.email ? "is-invalid" : ""
                }`}
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className={`form-control rounded-3 ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>

            <div className="d-grid mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary rounded-3 py-2 fw-semibold"
                style={{
                  background: "linear-gradient(90deg, #4e73df, #224abe)",
                  border: "none",
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Logging in...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted small">OR</span>
            <hr className="flex-grow-1" />
          </div>

          <div className="d-flex justify-content-center gap-4 mb-3">
            <button className="btn btn-outline-light border shadow-sm rounded-circle p-3">
              <BsGoogle size={20} color="red" />
            </button>
            <button className="btn btn-outline-light border shadow-sm rounded-circle p-3">
              <BsFacebook size={20} color="#1877F2" />
            </button>
            <button className="btn btn-outline-light border shadow-sm rounded-circle p-3">
              <BsTwitterX size={20} color="black" />
            </button>
          </div>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <Link to="/register" className="fw-semibold text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
