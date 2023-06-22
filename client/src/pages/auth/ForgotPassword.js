import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import regisimg from "../../images/a6.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const nav = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );
      if (res && res.data.succes) {
        toast.success("Sucsessfully Reset Password");
        nav("/login");
      } else {
        toast.error("Username or Password Incorrect");
      }
    } catch (error) {
      console.log(error);
      toast.error("Username or Password Incorrect");
    }
  };

  return (
    <Layout title={"Forgot Password "}>
      <div className="register">
        <form className="formregis" onSubmit={handleForgotPassword}>
          <div className="inputGroup">
            <h4 className="hl">Forgot Password</h4>
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
                type="text"
                autoFocus={true}
                placeholder="Secret Answer"
                className="inputTag"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="inputDiv">
              <input
                type="password"
                placeholder="Password"
                className="inputTagP"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="btnDiv">
              <button className="btnregis">Reset Password</button>
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

export default ForgotPassword;
