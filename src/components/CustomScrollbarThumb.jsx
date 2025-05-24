import React from "react";
import leaf from "../assets/icons/Scroll_bar.svg";

const CustomScrollbarThumb = ({ scrollPosition }) => (
  <div
    style={{
      position: "fixed",
      right: "0",
      top: `${scrollPosition}%`,
      transform: "translateY(-50%)",
      width: "24px",
      height: "24px",
      zIndex: 50,
      pointerEvents: "none",
    }}
  >
    <img
      src={leaf}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  </div>
);

export default CustomScrollbarThumb;
