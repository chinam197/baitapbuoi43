import React from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import FormLogin from "./components/login/FormLogin";
import Shoping from "./components/shoping/Shoping";
import Loading from "./components/loading/Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "./components/alert/Alert";
import Return from "./components/return/Return";
import Cart from "./components/cart/Cart";
// import Product from "./components/product/Product";
export const AppConText = createContext();

const App = () => {
  const [global, setGlobal] = useState({
    login: false,
    spinner: false,
    alert: {
      title: "",
      content: "",
      show: false,
    },
  });
  const { login, spinner } = global;
  const handleLogin = (status) => {
    setGlobal({ ...global, login: status });
  };
  const handleSpinner = (status) => {
    setGlobal({ ...global, spinner: status });
  };

  const handleAlert = (title, content, showAlert) => {
    setGlobal((prevState) => ({
      ...prevState,
      alert: {
        ...prevState.alert,
        title: title,
        content: content,
        show: showAlert,
      },
    }));
  };
  const { title, content, show } = global.alert;
  return (
    <AppConText.Provider
      value={{
        handleLogin,
        handleSpinner,
        handleAlert,
        title,
        content,
        show,
      }}
    >
      {login ? (
        <Shoping />
      ) : (
        <div>
          <FormLogin />
        </div>
      )}
      {spinner && <Loading />}
      <Alert />
      <Return />
      <Cart />
    </AppConText.Provider>
  );
};

export default App;
