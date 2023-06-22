import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
import Layout from "../../components/Layout/Layout";
import regisimg from "../../images/a6.jpg";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const nav = useNavigate();
  const loc = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.succes) {
        toast.success("Sucsessfully Login");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        nav(loc.state || "/");
      } else {
        toast.error("Username or Password Incorrect");
      }
    } catch (error) {
      console.log(error);
      toast.error("Username or Password Incorrect");
    }
  };

  return (
    <Layout title={"Login | Ecommerce App"}>
      <div className="register">
        <form className="formregis" onSubmit={handleLogin}>
          <div className="inputGroup">
            <h4 className="hl">Login</h4>
            <div className="inputDiv">
              <input
                type="text"
                autoFocus={true}
                placeholder="Username"
                className="inputTag"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="btnDiv">
              <button className="btnregis">Login</button>
            </div>
            <div className="aha">
              <p>
                {" "}
                Dont Have Account ?<Link to={"/register"}> Login </Link>
              </p>
              <p>
                <Link to={"/forgot-password"}>Forgot Password</Link>
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

export default Login;
