import axios from "axios";
import React from "react";
import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./ProductDetail.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

function ProductDetail() {
  const [productDetail, setProductDetail] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart([]);

  const params = useParams();
  const nav = useNavigate();

  //   smilliar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  // getProduct
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${params.slug}`
      );
      setProductDetail(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {}
  };

  // initial product detail
  useEffect(() => {
    if (params?.slug) getSingleProduct();
    console.info(params + "hahahhahaa");
  }, [params?.slug]);

  return (
    <Layout>
      <div className="row container main-detail">
        <div className="col-md-6">
          <br></br> <br></br>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${productDetail._id}`}
            alt={productDetail.name}
            height={500}
            width={450}
          />
        </div>
        <div className="col-md-6">
          <div className="detail-product">
            <h3>{productDetail.name}</h3>
            <h2>Rp.{productDetail.price}</h2>
            <p>{productDetail?.category?.name}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCart([...cart, productDetail]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, productDetail])
                );
                toast.success("Add to Cart");
              }}
            >
              Add to Cart
            </button>
            <br />
            <br></br>
            <p>{productDetail.descriptions}</p>
          </div>
        </div>
      </div>
      <br></br> <br></br> <br></br>
      <div className="row related-product">
        <h1>Smilliar</h1>
        <div className="d-flex flex-wrap ">
          {relatedProducts.length < 1 ? <p>Not Found</p> : null}
          {relatedProducts?.map((p) => (
            <div className="col-md-2">
              <div
                className=" col-md-2 card"
                style={{ width: "182px", height: "22rem" }}
              >
                <img
                  onClick={() => nav(`/product/${p.slug}`)}
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                  alt={p.name}
                  height={200}
                  width={180}
                />
                <div className="card-title">
                  <p>{p.name}</p>
                </div>
                <div className="card-price">Rp.{p.price}</div>
                <div>
                  <button className="btn btn-danger btnWish">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-primary btnCart"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-cart-check"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </Layout>
  );
}

export default ProductDetail;
