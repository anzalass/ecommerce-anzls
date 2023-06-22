import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import moment from "moment";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

function Orders() {
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  // get Order Admin
  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/orders-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-md-9 content">
          <h1 className="contenttit">Hello ,{auth?.user?.name}</h1>
          <h4>Order List</h4>
          <div className="container">
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col"></td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td>Date</td>
                        <td scope="col">Orders</td>
                        <td scope="col">Qty</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{i + 1}</th>
                        <th>
                          <Select
                            bordered={false}
                            onChange={(value) =>
                              handleChangeStatus(o._id, value)
                            }
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </th>
                        <th>{o.buyer?.name}</th>
                        <th>{moment(o?.createdAt).fromNow()}</th>
                        <th>{o?.payment.Success ? "Sukses" : "Failed"}</th>
                        <th>{o.products.length}</th>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products.map((p, i) => (
                      <div className="row m-2 card flex-row">
                        <div className="col-md-4  ">
                          <img
                            className=""
                            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                            alt={p.name}
                            height={"150px"}
                            width={"150px"}
                          />
                        </div>
                        <div className="col-md-8 mt-2">
                          <h4>{p.name}</h4>
                          {/* <p>{p.descriptions.substring(0, 30)}</p> */}
                          <h4>Rp.{p.price}.00</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
