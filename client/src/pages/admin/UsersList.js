import React from "react";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/auth";

function UsersList() {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9 content">
          <h1 className="contenttit">Hello ,{auth?.user?.name}</h1>
        </div>
      </div>
    </Layout>
  );
}

export default UsersList;
