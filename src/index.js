import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

//index에 있는 App을 root에 렌더링
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
