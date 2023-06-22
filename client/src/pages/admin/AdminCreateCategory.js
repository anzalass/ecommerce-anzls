import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CategoryForm from "../../components/CategoryForm";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
function AdminCreateCategory() {
  const [auth, setAuth] = useAuth();
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("");
  const [updateName, setUpdateName] = useState("");

  const getCategori = async () => {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_API}/api/v1/category/getall-category`
    // );
    // setCats(res.data);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/getall-category`
      );
      if (data.success) {
        setCats(data.cats);
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

  const handlecreateCategori = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getCategori();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} Sukses di update`);
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        getCategori();
      }
      console.log(e);
    } catch (error) {}
  };

  const handleDelete = async (pId) => {
    if (window.confirm("are you sure") === true) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`,
          { name: updateName }
        );
        toast.success("Sucsess deleted Category");
        getCategori();
      } catch (error) {
        console.log(error);
      }
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
          <br></br>
          <div className="p-3">
            <CategoryForm
              handleSubmit={handlecreateCategori}
              value={name}
              setValue={setName}
            />
          </div>
          <br />
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cats.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td key={c._id}>
                        <button
                          className="btn btn-warning ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdateName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
              <br />
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={setUpdateName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default AdminCreateCategory;
