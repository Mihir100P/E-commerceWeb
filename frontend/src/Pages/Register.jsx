import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Spinner } from "react-bootstrap";
import { BsGoogle, BsFacebook, BsTwitterX } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await axios.post("http://localhost:8080/api/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.data.success) {
        localStorage.setItem("token", result.data.token);
        navigate("/login");
        toast.success("Registration done.Login now");
      } else {
        setError("Signup failed, please try again");
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
          <h2 className="fw-bold text-center mb-2">Create Account</h2>
          <p className="text-muted text-center mb-4">
            Join us and start your shopping journey
          </p>

          {error && (
            <div className="alert alert-danger text-center py-2 mb-3">{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                className={`form-control rounded-3 ${
                  errors.name ? "is-invalid" : ""
                }`}
                placeholder="John Doe"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name.message}</div>
              )}
            </div>

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
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter and one number",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className={`form-control rounded-3 ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Re-enter your password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">
                  {errors.confirmPassword.message}
                </div>
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
                    <Spinner animation="border" size="sm" /> Creating account...
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

          <p className="text-muted text-center small">
            By continuing you confirm that you agree with our{" "}
            <a href="#" className="text-decoration-none">
              Terms & Conditions
            </a>
          </p>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to="/login" className="fw-semibold text-decoration-none">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
