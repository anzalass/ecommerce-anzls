import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function AdminCreatePost() {
  const [auth] = useAuth();
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [price, setprice] = useState("");
  const [quantitiy, setQuantitiy] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  const nav = useNavigate();

  const getCategori = async () => {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_API}/api/v1/category/getall-category`
    // );
    // setCats(res.data);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getall-category`
      );
      if (data?.success) {
        setCats(data?.cats);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Error");
    }
  };

  useEffect(() => {
    getCategori();
    console.log(getCategori());
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("namatoko", auth.user.name);
      productData.append("idpenjual", auth.user.test);
      productData.append("descriptions", descriptions);
      productData.append("price", price);
      productData.append("quantity", quantitiy);
      productData.append("photo", photo);
      productData.append("category", cat);
      productData.append("shipping", shipping);
      const { data } = axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );
      if (data?.success) {
        toast.error("err");
      } else {
        toast.success("Product Sukses Diunggah");
        nav("/dashboard/admin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
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
          <br />
          <h2>Create Post</h2>
          <div className="m-1 w-75">
            <Select
              bordered={false}
              placeholder={"Pilih Category"}
              size={"large"}
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCat(value);
              }}
              required
            >
              {cats?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className="btn btn-outline-secondary">
                {photo ? photo.name : "Upload Photo"}
                <input
                  required
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="mb-3">
              {photo && (
                <div>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="poto product"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                required
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Masukan Nama Produk"
              />
            </div>
            <div className="mb-3">
              <textarea
                required
                name=""
                className="form-control"
                onChange={(e) => setDescriptions(e.target.value)}
                value={descriptions}
                placeholder="Masukan Deskripsi Produk"
                id=""
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="mb-3">
              <input
                required
                type="number"
                className="form-control"
                onChange={(e) => setprice(e.target.value)}
                value={price}
                placeholder="Masukan Harga Produk"
              />
            </div>
            <div className="mb-3">
              <input
                required
                type="number"
                className="form-control"
                onChange={(e) => setQuantitiy(e.target.value)}
                value={quantitiy}
                placeholder="Masukan Stok Produk"
              />
            </div>
            <p>{shipping}</p>
            <Select
              required
              size="medium"
              placeholder="Shipping"
              className="form-select mb-3"
              bordered={false}
              onChange={(e) => setShipping(e)}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
            <div className="mb-3 md-6">
              <button
                onClick={handleCreateProduct}
                className="btn btn-primary col-md-6"
              >
                Create Product
              </button>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminCreatePost;
