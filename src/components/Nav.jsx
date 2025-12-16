import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartCounter from "./CartCounter";
import WishlistCounter from "./WishlistCounter";
import bookLogo from "../assets/bookLogo.png"
export default function Nav() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      navigate(`/books?search=${value}`);
    }
  };
  return (
   <div className="bg-dark text-light py-2">
  <nav className="navbar navbar-expand-lg navbar-dark container">
    
    {/* Logo */}
    <Link to="/" className="navbar-brand">
      <img src={bookLogo} alt="Logo" style={{ width: "40px" }} />
    </Link>

    {/* Mobile Toggle Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible Content */}
    <div className="collapse navbar-collapse" id="navbarContent">

      {/* Search */}
      <form className="mx-lg-auto my-2 my-lg-0 w-100 w-lg-50">
        <input
          className="form-control"
          type="search"
          placeholder="Search books"
          value={search}
          onChange={handleSearch}
        />
      </form>

      {/* Icons */}
      <div className="d-flex align-items-center gap-4 mt-3 mx-2 mt-lg-0">
        
        <Link to="userProfile" className="nav-link fs-4">
          <i className="bi bi-person-circle"></i>
        </Link>

        <Link to="wishlist" className="nav-link d-flex align-items-center gap-1 fs-4">
          <i className="bi bi-heart"></i>
          <h5><WishlistCounter /></h5>
          {/* <span className="fs-6"><WishlistCounter /></span> */}
        </Link>

        <Link to="cart" className="nav-link d-flex align-items-center gap-1 fs-4">
          <i className="bi bi-cart4"></i>
          <h5><CartCounter/></h5>
          {/* <span className="fs-6"><CartCounter /></span> */}
        </Link>

      </div>
    </div>
  </nav>
</div>

  );
}
