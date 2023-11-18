import React from "react";
import { useState, useEffect } from "react";
import { client } from "../../configs/client";
import { useContext } from "react";
import { AppConText } from "../../App";
const Product = () => {
  const [cart, setCart] = useState([]);
  const { handleAlert, handleLogin } = useContext(AppConText);
  useEffect(() => {
    const api = sessionStorage.getItem("apiKey");
    let apiKey;
    if (api) {
      apiKey = JSON.parse(api);
    }
    const handleGetCart = async () => {
      client.setToken(apiKey);
      const { response, data } = await client.get("/users/profile");
      const { name } = data.data.emailId;

      if (response.ok) {
        handleAlert("Xin chào", name, true);
        setTimeout(() => {
          handleAlert("Xin chào", name, false);
        }, 2000);
        return;
      }

      if (response.status === 401) {
        handleAlert(
          "Xin chào",
          "phiên bản đã hết hạn vui lòng đăng nhập lại",
          true
        );
        setTimeout(() => {
          handleAlert(
            "Xin chào",
            "phiên bản đã hết hạn vui lòng đăng nhập lại",
            false
          );
          sessionStorage.removeItem("apiKey");
          handleLogin(false);
        }, 2000);
        return;
      }
    };
    handleGetCart();
  }, []);
};
export default Product;
