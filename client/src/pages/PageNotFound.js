import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
function PageNotFound() {
  return (
    <Layout title={"404 | Not Fount"}>
      <div className="pnf">
        <h1 className="pnfTitle">404</h1>
        <h2 className="pnfhead">Opss ! Page Not Found</h2>
        <Link to={"/"} className={"pnfBtn"}>
          Go Back
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFound;
