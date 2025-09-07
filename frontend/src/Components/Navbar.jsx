import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";

export default function Navbar({setSearch}) {
  const { user, logout } = useContext(AuthContext);
  const [inpt, setInpt] = useState("");

  function handleLogout() {
    logout();
    toast.success("Logout successfully done!");
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearch(inpt);
    setInpt("");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          🛍️ ShopEase
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {user ? (
              <>
                <li className="nav-item mx-2">
                  <span className="nav-link text-dark fw-semibold">
                    👋 Welcome, <b>{user?.name}</b>
                  </span>
                </li>
                <li className="nav-item mx-3">
                  <form
                    className="d-flex"
                    role="search"
                    onSubmit={handleSearch}
                  >
                    <input
                      type="search"
                      className="form-control me-2"
                      placeholder="Search products..."
                      value={inpt}
                      onChange={(e) => setInpt(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-primary"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </li>

                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark fw-semibold" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark fw-semibold" to="/">
                    Shop
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark fw-semibold" to="/deals">
                    Deals
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-dark fw-semibold"
                    to="/contact"
                  >
                    Contact
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="btn btn-outline-primary rounded-pill px-3"
                    to="/cart"
                  >
                    🛒 Cart
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <button
                    className="btn btn-primary rounded-pill px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2">
                  <Link
                    className="btn btn-outline-primary rounded-pill px-3"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="btn btn-primary rounded-pill px-3"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
