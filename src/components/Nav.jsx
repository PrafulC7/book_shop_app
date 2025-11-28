import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartCounter from "./cartCounter";

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
    <div className="text-light bg-dark py-4">
    <nav className="container">
      <div className="d-flex justify-content-between">
      <div className="logo">
        <Link to="/" className="nav-link"><h4>Book Shop</h4></Link>
</div>
<div>
<input type="text" placeholder="Search books" value={search} onChange={handleSearch}/>
      </div>
<div className="d-flex gap-4">
    <div style={{ fontSize: '26px' }}>
<Link to="userProfile" className="nav-link"><i className="bi bi-person-circle"></i></Link>
</div>
    <div style={{ fontSize: '26px' }}>
<Link to="wishList" className="nav-link"><i className="bi bi-heart"></i></Link>
</div>
<div style={{ fontSize: '26px' }}>
<Link to="cart" className="nav-link d-flex gap-2"><i className="bi bi-cart4"></i>
<h5><CartCounter/></h5></Link>
</div>
      </div>
      </div>
      {/* <div className="links">
        <Link to="/" className="nav-link">
          All Books
        </Link>
        <Link to="/addBooks" className="nav-link">
         Add Books
        </Link>
        </div> */}
    </nav>
    </div>
  );
}