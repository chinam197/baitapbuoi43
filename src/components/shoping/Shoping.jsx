import React from "react";
import "./style.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppConText } from "../../App";
import { client } from "../../configs/client";
import Product from "../product/Product";
let carts = JSON.parse(localStorage.getItem("my_cart")) || [];
export const updateCarts = (value = []) => {
  carts = value;
};
const Shoping = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const limit = 8;
    const handleGetproduct = async () => {
      const { response, data } = await client.get(`/products?limit=${limit}`);
      let { listProduct, totalPage } = data.data;

      setProduct(listProduct);
    };
    handleGetproduct();
  }, []);
  const { handleAlert, handleLogin } = useContext(AppConText);
  const addCart = async (
    _id,
    name,
    category,
    brand,
    price,
    image,
    quantity
  ) => {
    let id_ = _id,
      name_ = name,
      price_ = price,
      quantity_ = 1,
      total = quantity_ * price_;
    const api = sessionStorage.getItem("apiKey");
    let my_cart = localStorage.getItem("my_cart");
    if (my_cart) {
      my_cart = JSON.parse(my_cart);
    }
    if (!api) {
      return;
    }
    let apiKey = JSON.parse(api);
    client.setToken(apiKey);
    const { response, data } = await client.post("/orders", [
      {
        productId: _id,
        quantity: 1,
      },
    ]);
    if (response.ok) {
      handleAlert("Xin chào !", "Bạn đã thêm vào giỏ hàng thành công", true);

      let product = { id_, name_, price_, quantity_, total };

      let existingProductIndex = carts.findIndex((item) => item.id_ === _id);

      if (existingProductIndex !== -1) {
        // If the product already exists in the cart, update quantity
        carts[existingProductIndex].quantity_++;
        carts[existingProductIndex].total =
          carts[existingProductIndex].quantity_ *
          carts[existingProductIndex].price_;
      } else {
        // If the product is not in the cart, add it
        carts.push(product);
      }

      localStorage.setItem("my_cart", JSON.stringify(carts));
      setTimeout(() => {
        handleAlert("Xin chào !", "Bạn đã thêm vào giỏ thành công", false);
      }, 2000);
      return;
    }

    if (response.status === 401) {
      sessionStorage.removeItem("apiKey");

      handleAlert(
        "Xin chào !",
        "Phiên bản đã hết hạn vui lòng đăng nhập lại",
        true
      );

      setTimeout(() => {
        handleLogin(false);
        handleAlert(
          "Xin chào !",
          "Phiên bản đã hết hạn vui lòng đăng nhập lại",
          false
        );
      }, 3000);
      return;
    }
  };

  return (
    <div id="__next">
      <main className="__className_6a793a flex items-center justify-center p-8">
        <div className="container bg-slate-700 p-4 flex flex-col justify-center items-center">
          <h1 className="font-bold text-white">Welcome to Shop!</h1>
          <div className="product-list grid grid-cols-4 gap-4">
            {Array.from(product).map(
              ({ _id, name, category, brand, price, image, quantity }) => {
                return (
                  <div
                    className="box p-4 shadow-lg bg-white rounded-lg relative"
                    key={_id}
                  >
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <h2 className="text-xl font-normal mt-2">{name}</h2>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-500 font-bold">
                        ${price}
                      </span>
                      <button
                        className="bg-green-500 hover:bg-green-700 select-none text-white  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                        onClick={(e) => {
                          e.preventDefault();
                          addCart(
                            _id,
                            name,
                            category,
                            brand,
                            price,
                            image,
                            quantity
                          );
                        }}
                      >
                        Add to cart!
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
          <Product />
        </div>
      </main>
      <div className="Toastify"></div>
    </div>
  );
};

export default Shoping;
