import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Outlet } from "react-router-dom";

export default function PrivateLogin() {
  const [yes, setYes] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/login-auth`
      );
      if (res.data.ok) {
        setYes(true);
      } else {
        setYes(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return yes ? <Spinner path="" /> : <Outlet />;
}
