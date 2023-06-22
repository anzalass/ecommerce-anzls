import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/auth";
import SidebarUser from "../../components/SidebarUser";
import "./dashuser.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import regisimg from "../../images/a6.jpg";
import { useEffect } from "react";

function EditUser() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAdress] = useState("");
  const [editProfile, setEditProfile] = useState(false);

  const handleRegis = async (e) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      // if (res.data.succes) {
      //   nav("/login");
      //   toast.success(res.data.message);
      // } else {
      //   toast.error(res.data.message);
      // }
      if (data?.error) {
        toast.error(data?.error);
      } else {
        let Ls = localStorage.getItem("auth");
        Ls = JSON.parse(Ls);
        Ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(Ls));
        toast.success("sukses");
        setEditProfile(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAdress(address);
  }, []);

  console.log(editProfile);
  return (
    <Layout>
      <div className="row dash-user">
        <div className="col-md-3">
          <SidebarUser />
        </div>
        <div className="col-md-9 content">
          <h1 className="contenttit">Hello ,{auth?.user?.name}</h1>
          <div>
            <h3 className="contenttit">Edit Your Profile </h3>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Desc</th>
                    <th scope="col">Profile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nama</td>
                    <td>{auth?.user?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{auth?.user?.email}</td>
                  </tr>
                  <tr>
                    <td>Alamat</td>
                    <td>{auth?.user?.address}</td>
                  </tr>
                  <tr>
                    <td>Password</td>
                    <td>{auth?.user?.password}</td>
                  </tr>
                </tbody>
                <br />
                <button
                  className="btn btn-warning"
                  onClick={() => setEditProfile(true)}
                >
                  Edit Profile
                </button>
              </table>
            </div>
          </div>
          {editProfile ? (
            <form className="formregisR" onSubmit={handleRegis}>
              <div className="inputGroup">
                <h4 className="rcy">Edit Your Profile</h4>
                <div className="inputDiv">
                  <input
                    type="text"
                    autoFocus={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Username"
                    className="inputTag"
                  />
                </div>
                <div className="inputDiv">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email"
                    className="inputTagP"
                    disabled
                  />
                </div>
                <div className="inputDiv">
                  <input
                    type="password"
                    placeholder="Password"
                    className="inputTagP"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="inputDiv">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="phone"
                    className="inputTagP"
                  />
                </div>
                <div className="inputDiv">
                  <textarea
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    className="inputTagArea"
                    placeholder="Alamat Lenkap"
                  >
                    tes
                  </textarea>
                </div>
                <div className="btnDiv">
                  <button className="btnregis">Register</button>
                </div>
                <div className="aha">
                  <p>
                    Already Have Account ?<Link to={"/login"}> Login </Link>
                  </p>
                </div>
              </div>
              <div className="divImg">
                <img src={regisimg} alt="" className="imgRegis" />
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}

export default EditUser;
