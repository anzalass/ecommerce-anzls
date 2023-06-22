import React from "react";
import "../pages/admin/admindash.css";
import { useNavigate } from "react-router-dom";

function SidebarUser() {
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
            <li onClick={() => nav("/dashboard/user/edit-profile")}>
              Edit Profile
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SidebarUser;
