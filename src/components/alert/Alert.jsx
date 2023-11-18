import React, { useContext } from "react";
import "./alert01.css";
import { AppConText } from "../../App";

const Alert = () => {
  const { title, content, show, handleAlert } = useContext(AppConText);

  return (
    <div
      className={show ? "wrapper-alert" : "wrapper-alert-hiden"}
      onClick={() => {
        handleAlert(title, content, false);
      }}
    >
      <div
        className="alert alert-warning alert-dismissible fade show"
        role="alert"
      >
        <strong>{title}</strong>
        <hr />
        {content}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
};

export default Alert;
