import React from "react";
import "../pages/admin/admindash.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const nav = useNavigate();
  return (
    <div className="">
      <div className="sidebar">
        <br />
        <h3 onClick={() => nav("/dashboard")} className="sidebartitle">
          Dashboard
        </h3>
        <div>
          <ul className="dash-list">
            <li onClick={() => nav("/dashboard/admin/create-category")}>
              Create Category
            </li>
            <li onClick={() => nav("/dashboard/admin/create-post")}>
              Create Post
            </li>
            <li onClick={() => nav("/dashboard/admin/user-list")}>Users</li>
            <li onClick={() => nav("/dashboard/admin/product-list")}>
              Product List
            </li>
            <li onClick={() => nav("/dashboard/admin/orders")}>Orders</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
