import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { toast } from "react-toastify";

export default function Navbar({ setSearch }) {
  const { user, admin, logout, AdminLogout } = useContext(AuthContext);
  const [inpt, setInpt] = useState("");

  function handleLogout() {
    if (user) {
      logout();
      toast.success("User logged out successfully!");
    } else if (admin) {
      AdminLogout();
      toast.success("Admin logged out successfully!");
    }
    closeNavbar();
  }

  function handleSearch(e) {
    e.preventDefault();
    setSearch(inpt);
    setInpt("");
    closeNavbar();
  }

  function closeNavbar() {
    const navbar = document.getElementById("navbarContent");
    if (navbar?.classList.contains("show")) {
      const bsCollapse = new window.bootstrap.Collapse(navbar);
      bsCollapse.hide();
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 sticky-top">
      <div className="container-fluid">

        {admin?<Link className="navbar-brand fw-bold text-primary fs-4" to="/admin/home">
          🛍️ ShopEase
        </Link>
        :
        <Link className="navbar-brand fw-bold text-primary fs-4" to="/">
          🛍️ ShopEase
        </Link>
        }      

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
                  <form className="d-flex" onSubmit={handleSearch}>
                    <input
                      type="search"
                      className="form-control me-2"
                      placeholder="Search products..."
                      value={inpt}
                      onChange={(e) => setInpt(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" type="submit">
                      Search
                    </button>
                  </form>
                </li>

                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark fw-semibold" to="/" onClick={closeNavbar}>
                    Shop
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark fw-semibold" to="/orders" onClick={closeNavbar}>
                    Deals
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark fw-semibold" to="/contact" onClick={closeNavbar}>
                    Contact
                  </Link>
                </li>
                <li className="nav-item mx-2 my-2">
                  <Link
                    className="btn btn-outline-primary rounded-pill px-3"
                    to="/cart"
                    onClick={closeNavbar}
                  >
                    🛒 Cart
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <button
                    className="btn btn-danger rounded-pill px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : admin ? (
              <>
                <li className="nav-item mx-2">
                  <span className="nav-link text-dark fw-semibold">
                    Admin: <b>{admin?.name}</b>
                  </span>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-dark fw-semibold"
                    to="/admin/home"
                    onClick={closeNavbar}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-dark fw-semibold"
                    to="/admin/orders"
                    onClick={closeNavbar}
                  >
                    Manage Orders
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link text-dark fw-semibold"
                    to="/admin/new"
                    onClick={closeNavbar}
                  >
                    Sell Item
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <button
                    className="btn btn-danger rounded-pill px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mx-2 my-2">
                  <Link
                    className="btn btn-outline-primary rounded-pill px-3"
                    to="/register"
                    onClick={closeNavbar}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item mx-2 my-2">
                  <Link
                    className="btn btn-primary rounded-pill px-3"
                    to="/login"
                    onClick={closeNavbar}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item mx-2 my-2">
                  <Link
                    className="btn btn-dark rounded-pill px-3"
                    to="/admin/login"
                    onClick={closeNavbar}
                  >
                    Seller
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
