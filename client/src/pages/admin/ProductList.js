import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductList() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  const params = useParams();

  // const getAllYourProducts = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/products/your-products/?tokopenjual=${auth.user.test}`
  //     );
  //     setProducts(data.getAllProductbyPenjual);
  //     console.info(data?.count + "hei");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getAllYourProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/your-products`
      );
      setProducts(data.getAllProductbyPenjual);
      console.info(data?.count + "hei");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProducts = async (pid) => {
    if (window.confirm("are  you sure") === true) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/products/delete-product/${pid}`
        );
      } catch (error) {
        console.log(error);
      }
      toast.success("Sukses Menghapus Product");
    }
    console.info(products._id);
  };

  useEffect(() => {
    getAllYourProducts();
  }, []);

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9 content">
          <h1 className="contenttit">Hello ,{auth?.user?.name}</h1>
          <br></br>
          <h4>Your Products</h4>
          <br></br>
          <div className="row">
            {products?.map((p) => (
              <div className="col d-flex listproduct">
                <>
                  <div
                    // onClick={() =>
                    //   nav(`/dashboard/admin/update-product/${p.slug}`)
                    // }
                    className="card cardAdmin"
                    style={{ width: "13rem", height: "23rem" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                      className="card-img-top"
                      alt="..."
                      height={200}
                      width={200}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.price}</p>
                      <div className="d-flex action-product">
                        <a
                          href=""
                          onClick={() =>
                            nav(`/dashboard/admin/update-product/${p.slug}`)
                          }
                          className="btn btn-warning"
                        >
                          Edit
                        </a>
                        <a
                          href=""
                          className="btn delProduct btn-danger"
                          onClick={() => handleDeleteProducts(p._id)}
                        >
                          Delete
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductList;
