// src/pages/OAuthCallback.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash; // #access_token=...
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");

    if (token) {
      localStorage.setItem("access_token", token);
      navigate("/"); // ارجع للصفحة الرئيسية
    } else {
      alert("Login failed!");
      navigate("/");
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default OAuthCallback;
