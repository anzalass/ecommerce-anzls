import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import regisimg from "../../images/a6.jpg";
import { useReducer } from "react";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAdress] = useState("");

  const nav = useNavigate();

  const handleRegis = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data.succes) {
        nav("/login");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {}
  };

  return (
    <Layout title={"Register | Ecommerce App"}>
      <div className="register">
        <form className="formregisR" onSubmit={handleRegis}>
          <div className="inputGroup">
            <h4 className="rcy">Register Your Account</h4>
            <div className="inputDiv">
              <input
                type="text"
                autoFocus={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Username"
                className="inputTag"
                required
              />
            </div>
            <div className="inputDiv">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                className="inputTagP"
                required
              />
            </div>
            <div className="inputDiv">
              <input
                type="password"
                placeholder="Password"
                className="inputTagP"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="inputDiv">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="phone"
                className="inputTagP"
                required
              />
            </div>
            <div className="inputDiv">
              <textarea
                value={address}
                onChange={(e) => setAdress(e.target.value)}
                className="inputTagArea"
                required
                placeholder="Alamat Lenkap"
              >
                tes
              </textarea>
            </div>
            <div className="inputDiv">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="The Thing What You Like Most ?"
                className="inputTagP"
                required
              />
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
      </div>
    </Layout>
  );
}

export default Register;
