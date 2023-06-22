import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./layout.css";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import SearchInput from "../SearchInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

function Header() {
  const nav = useNavigate();
  const [searchSet, setSearchSet] = useState(false);
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  const hideSearch = () => {
    setSearchSet(true);
    nav("/register");
  };

  // console.log(searchSet + "tes");
  return (
    <>
      <nav className="fixed-top  navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse m-auto"
            id="navbarTogglerDemo01"
          >
            <Link to={"/"} className="navbar-brand">
              🛒 Ecommerce App
            </Link>
            {searchSet ? null : <SearchInput />}
            <ul className="navbar-nav  mb-2 mb-lg-0 ms-auto   ">
              <li className="nav-item">
                <NavLink to={"/"} className="nav-link">
                  <span className="navname">Home</span>
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink to={"/categori"} className="nav-link ">
                  Kategori
                </NavLink>
              </li> */}
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={"/categories"}
                >
                  Category
                </Link>
                <ul class="dropdown-menu">
                  <li>
                    <Link to={`/categories`} class="dropdown-item" href="#">
                      All Category
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li>
                      <Link
                        to={`/category/${c.slug}`}
                        class="dropdown-item"
                        href="#"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to={"/cart"} className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item" onClick={hideSearch}>
                    <a className="nav-link">Register</a>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => (setSearchSet(true), nav("/login"))}
                  >
                    <a className="nav-link">Login</a>
                  </li>
                </>
              ) : (
                <>
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <button
                        className="btn btn-dark dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth.user.name}
                      </button>
                      <ul className="dropdown-menu dropdown-menu">
                        <li className="nav-item">
                          <NavLink
                            onClick={handleLogout}
                            to={"/login"}
                            className="dropdown-item"
                          >
                            Logout
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to={`/dashboard/${
                              auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                            className="dropdown-item"
                          >
                            Dashboard
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
