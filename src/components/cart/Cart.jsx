import React, { useState, useEffect } from "react";
import "./style.css";
import { updateCarts } from "../shoping/Shoping";
import { AppConText } from "../../App";
import { useContext } from "react";
const Cart = () => {
  const [isCartVisible, setCartVisibility] = useState(false);
  const [myCart, setCart] = useState([]);
  const { handleAlert } = useContext(AppConText);
  let ordersTotal = 0;
  const storedCart = localStorage.getItem("my_cart");
  useEffect(() => {
    console.log("hello");
    const handleGetCart = () => {
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    };
    handleGetCart();

    return () => {
      setCart([]);
    };
  }, [storedCart, isCartVisible]);

  return (
    <div>
      {!isCartVisible ? (
        <div
          className="_cart"
          onClick={() => {
            setCartVisibility(true);
          }}
        >
          <i className="fa-solid fa-bag-shopping"></i>
        </div>
      ) : (
        <div className="cart_">
          {myCart.length > 0 ? (
            <div className="cart_section">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                    <div className="cart_container">
                      <div className="cart_title">
                        Shopping Cart<small> (1 item in your cart) </small>
                      </div>
                      <div className="cart_items">
                        <ul className="cart_list">
                          {myCart.map(
                            ({ id_, name_, price_, quantity_, total }) => {
                              ordersTotal += total;
                              return (
                                <li className="cart_item clearfix" key={id_}>
                                  <div className="cart_item_image">
                                    <img
                                      src="https://i.imgur.com/qqBRWD5.jpg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                    <div className="cart_item_name cart_info_col">
                                      <div className="cart_item_title">
                                        Name
                                      </div>
                                      <div className="cart_item_text">
                                        {name_}
                                      </div>
                                    </div>
                                    <div className="cart_item_color cart_info_col">
                                      <div className="cart_item_title">
                                        Color
                                      </div>
                                      <div className="cart_item_text">
                                        <span
                                          style={{ backgroundColor: "#999999" }}
                                        />
                                        Silver
                                      </div>
                                    </div>
                                    <div className="cart_item_quantity cart_info_col">
                                      <div className="cart_item_title">
                                        Quantity
                                      </div>
                                      <div className="cart_item_text">
                                        {quantity_}
                                      </div>
                                    </div>
                                    <div className="cart_item_price cart_info_col">
                                      <div className="cart_item_title">
                                        Price
                                      </div>
                                      <div className="cart_item_text">
                                        ${price_}
                                      </div>
                                    </div>
                                    <div className="cart_item_total cart_info_col">
                                      <div className="cart_item_title">
                                        Total
                                      </div>
                                      <div className="cart_item_text">
                                        ${total}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                      <div className="order_total">
                        <div className="order_total_content text-md-right">
                          <div className="order_total_title">Order Total:</div>
                          <div className="order_total_amount">
                            ${ordersTotal}
                          </div>
                        </div>
                      </div>
                      <div className="cart_buttons">
                        <button
                          type="button"
                          className="button cart_button_clear"
                          onClick={(e) => {
                            e.preventDefault();
                            setCartVisibility(false);
                          }}
                        >
                          Continue Shopping
                        </button>
                        <button
                          type="button"
                          className="button cart_button_checkout"
                          onClick={(e) => {
                            e.preventDefault();
                            localStorage.removeItem("my_cart");
                            setCartVisibility(false);
                            setCart([]);
                            updateCarts();
                            handleAlert(
                              "Xin chào bạn thật nhiều tiền",
                              "Đã thanh tóan phát một",
                              true
                            );

                            setTimeout(() => {
                              handleAlert(
                                "Xin chào bạn thật nhiều tiền",
                                "Đã thanh tóan phát một",
                                false
                              );
                            }, 3000);
                          }}
                        >
                          PAYMENT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="exit-cart">Không có sản phẩm</h1>
              <button
                type="button"
                className="button cart_button_clear"
                onClick={(e) => {
                  e.preventDefault();
                  setCartVisibility(false);
                }}
              >
                Quay Lại
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
