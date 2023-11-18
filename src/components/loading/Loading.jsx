import React from "react";
import "./styleloading.css";
const Loading = () => {
  return (
    <div className="loading-background">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
