import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/auth";
import axios from "axios";
import Slider from "../components/Slider";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [categorys, setCategorys] = useState([]);
  const [products, setProducts] = useState([]);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const nav = useNavigate();

  const getAllCategori = async () => {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_API}/api/v1/category/getall-category`
    // );
    // setCats(res.data);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getall-category`
      );
      if (data.success) {
        setCategorys(data.cats);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Error");
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategori();
    getTotal();
    console.log(products);
  }, []);

  const handleFilter = (value, id) => {
    let all = [...check];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  };

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.product);
      // console.info(data.pages + "tes");
      // console.log(page * 2);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // loadmore
  const loadMore = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setProducts([...products, ...data?.product]);
      // console.log(...data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!check.length || !radio.length) getAllProducts();
  }, [check.length, radio.length]);

  // filter products
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/products-filter`,
        { check, radio }
      );
      console.info(data?.tes2);
      setProducts(data?.products);
    } catch (error) {}
  };

  useEffect(() => {
    if (check.length || radio.length) filterProducts();
  }, [check, radio]);

  return (
    <Layout title={"Eccommerce App"} className={"layout"}>
      <Slider />
      {/* {JSON.stringify(check, null, 4)}
      {JSON.stringify(radio, null, 4)} */}
      <div className=" row mt-3 justify-content-center">
        <div className="col-md-2">
          <h6 className="text-center">Filter By Category</h6>
          {categorys?.map((c) => (
            <div className="d-flex filterCategory">
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {" "}
                {c.name}
              </Checkbox>
            </div>
          ))}

          <h6 className="text-center">Filter By Price</h6>
          <div className="d-flex filterCategory">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <br />
          <br />
          <div>
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div className="col-md-9 justify-content-center">
          <h1 className="text-center">All Produtcts</h1>
          <div className="d-flex flex-wrap justify-content-center homepage">
            <div className="d-flex flex-wrap row product-homepage ">
              {products?.map((p) => (
                <div className="col cart-homepage">
                  <div
                    className=" col-md-2 card"
                    style={{ width: "182px", height: "22rem" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                      alt={p.name}
                      height={200}
                      width={180}
                      onClick={() => nav(`/product/${p.slug}`)}
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
                          toast.success("Add to Cart");
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
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className="btn btn-warning"
              >
                {loading ? "Loading" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
