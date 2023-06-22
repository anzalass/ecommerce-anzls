import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "./Layout/Layout";

function Spinner({ path = "login" }) {
  const [count, setCount] = useState(3);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((preValue) => --preValue);
    }, 1000);
    count === 0 &&
      nav(`/${path}`, {
        state: loc.pathname,
      });
    return () => clearInterval(interval);
  }, [count, nav, loc, path]);

  return (
    <>
      <div>
        <div
          class="d-flex flex-column text-center justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <h2 className="text-center">
            Something Went Wrong, Redirecting in {count}
          </h2>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Spinner;
