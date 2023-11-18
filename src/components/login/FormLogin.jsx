import React, { useContext } from "react";
import "./form.css";
import { AppConText } from "../../App";
import { client } from "../../configs/client";
import { useState, useEffect } from "react";

const FormLogin = () => {
  const { handleLogin, handleSpinner, handleAlert } = useContext(AppConText);
  const [form, setEmail] = useState({
    email: "",
  });
  const apiKey = sessionStorage.getItem("apiKey");
  useEffect(() => {
    if (apiKey) {
      handleLogin(true);
    }
  }, []);
  const handLogin = async (email) => {
    const { response, data } = await client.get(`/api-key?email=${email}`);
    console.log(data);
    if (response.ok) {
      handleSpinner(false);
      handleLogin(true);
      handleAlert("Xin chào !", "Bạn đã đăng nhập thành công", true);
      sessionStorage.setItem("email", JSON.stringify(email));
      sessionStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
      setEmail({ email: "" });
      setTimeout(() => {
        handleAlert("Xin chào !", "Bạn đã đăng nhập thành công", false);
      }, 2000);
      return;
    }

    handleSpinner(false);
    handleAlert("Xin chào !", "Bạn đã đăng nhập thất bại", true);
    setTimeout(() => {
      handleAlert("Xin chào !", "Bạn đã đăng nhập thành công", false);
    }, 2000);
    return;
  };
  const handleSubmit = (e) => {
    handleSpinner(true);
    e.preventDefault();
    const { email } = form;
    handLogin(email);
  };

  const handleChange = (e) => {
    setEmail({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper-email" hidden={apiKey}>
      <form action="" className="submit-email" onSubmit={handleSubmit}>
        <label htmlFor="email">nhập email của bạn</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          id="email"
          autoFocus
          name="email"
          onChange={handleChange}
          value={form.email}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default FormLogin;
