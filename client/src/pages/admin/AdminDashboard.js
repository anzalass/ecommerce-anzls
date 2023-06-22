import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./admindash.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function AdminDashboard() {
  const [auth, setAuth] = useAuth();
  const nav = useNavigate();
  const [countyp, setCountyp] = useState("");

  const countProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/your-products/?tokopenjual=${auth.user.test}`
      );
      setCountyp(data?.count);
    } catch (error) {
      console.info(error);
    }
  };

  useEffect(() => {
    countProduct();
  }, []);

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9 content">
          <h1 className="contenttit">Hello ,{auth?.user?.name}</h1>
          <div className="row gx-5">
            <div className="card col">
              <h3>Total Product</h3>
              <h2>{countyp}</h2>
            </div>
            <div className="card col">
              <h3>Total Pendapatan</h3>
              <h2>234</h2>
            </div>
            <div className="card col">
              <h3>Total User</h3>
              <h2>234</h2>
            </div>
          </div>
          <div className="card">
            <h2>Detail Admin</h2>
            <h4>{auth?.user.name}</h4>
            <h4>{auth?.user.email}</h4>
            <h4>{auth?.user.contact}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
