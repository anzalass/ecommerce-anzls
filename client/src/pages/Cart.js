import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

function Cart() {
  const [clientToken, setClientToken] = useState("");
  const [instance, setinstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  const nav = useNavigate();

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const deleteProduct = (pid) => {
    try {
      const myCart = [...cart];
      let index = myCart.findIndex((i) => i._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem(cart, JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((i) => {
        total = total + i.price;
      });
      return total.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      console.info("hahahahhah");
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      nav("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">{`Hello! ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? `You have ${cart.length} item in your cart ${
                    auth.token ? "" : "please login to checkout"
                  }`
                : `Your Cart is empty`}
            </h4>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row m-2 card flex-row">
                <div className="col-md-4  ">
                  <img
                    className=""
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    alt={p.name}
                    height={"150px"}
                    width={"150px"}
                    onClick={() => nav(`/product/${p.slug}`)}
                  />
                </div>
                <div className="col-md-8 mt-2">
                  <h4>{p.name}</h4>
                  {/* <p>{p.descriptions.substring(0, 30)}</p> */}
                  <h4>Rp.{p.price}.00</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(p._id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Chechout | Payment</p>
            <hr />
            <h4>Total :{totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Adress</h5>
                  <p>{auth?.user?.address}</p>
                  <button
                    onClick={() => nav("/dashboard/user/edit-profile")}
                    className="btn btn-outline-warning"
                  >
                    Update Adress
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    onClick={() => nav("/dashboard/user/edit-profile")}
                    className="btn btn-warning"
                  >
                    Update Adress
                  </button>
                ) : (
                  <button
                    onClick={() => nav("/login")}
                    className="btn btn-outline-warning"
                  >
                    Please Login
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                " "
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setinstance(instance)}
                  ></DropIn>
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
